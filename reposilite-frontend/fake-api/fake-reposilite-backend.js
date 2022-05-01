/*
 * Copyright (c) 2022 dzikoysk
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require("express")
const expressWs = require("express-ws")
const bodyParser = require('body-parser')
const {
  respond,
  authorized,
  invalidCredentials,
  sendMessage,
  createFileDetails,
  createDirectoryDetails,
} = require("./extensions")

const application = express()
expressWs(application)

let sharedConfiguration = `
{
  "web": {
    "swagger": "false",
    "forwardedIp": "X-Forwarded-For"
  },
  "repositories": {
    "repositories": {
      "releases": {
        "visibility": "PUBLIC",
        "redeployment": "false",
        "preserved": "-1",
        "storageProvider": {
          "type": "fs",
          "quota": "100%",
          "mount": ""
        },
        "proxied": "[]"
      },
      "snapshots": {
        "visibility": "PUBLIC",
        "redeployment": "false",
        "preserved": "-1",
        "storageProvider": {
          "type": "fs",
          "quota": "100%",
          "mount": ""
        },
        "proxied": "[]"
      },
      "private": {
        "visibility": "PRIVATE",
        "redeployment": "false",
        "preserved": "-1",
        "storageProvider": {
          "type": "fs",
          "quota": "100%",
          "mount": ""
        },
        "proxied": "[]"
      }
    }
  },
  "frontend": {
    "frontend": "true",
    "basePath": "/",
    "id": "reposilite-repository",
    "title": "Reposilite Repository",
    "description": "Public Maven repository hosted through the Reposilite",
    "organizationWebsite": "https://reposilite.com",
    "organizationLogo": "https://avatars.githubusercontent.com/u/88636591",
    "icpLicense": ""
  },
  "statistics": {
    "resolvedRequestsInterval": "MONTHLY"
  },
  "authentication": {
    "ldap": {
      "enabled": "false",
      "hostname": "ldap.domain.com",
      "port": "389",
      "baseDn": "dc=company,dc=com",
      "searchUserDn": "cn=reposilite,ou=admins,dc=domain,dc=com",
      "searchUserPassword": "reposilite-admin-secret",
      "userAttribute": "cn",
      "userFilter": "(&(objectClass=person)(ou=Maven Users))",
      "userType": "PERSISTENT"
    }
  }
}
`.trim()

let sharedConfigurationSchema = `
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "default": {},
  "description": "The root schema comprises the entire JSON document.",
  "definitions": {
    "fs-storage-provider": {
      "$id": "#fs-storage-provider",
      "type": "object",
      "required": ["type"],
      "properties": {
        "type": {
          "type": "string",
          "const": "fs"
        },
        "quota": {
          "type": "string",
          "format": "storage-quota",
          "description": "Controls the maximum amount of data stored in this repository. Supported formats: 90%, 500MB, 10GB"
        },
        "mount": {
          "type": "string",
          "format": "uri-reference",
          "description": "The directory to locate the repository data."
        }
      }
    },
    "s3-storage-provider": {
      "$id": "#s3-storage-provider",
      "type": "object",
      "required": ["type", "bucketName"],
      "properties": {
        "type": {
          "type": "string",
          "const": "s3"
        },
        "bucketName": {
          "type": "string"
        },
        "endpoint": {
          "type": "string",
          "format": "uri",
          "description": "Custom AWS endpoint"
        },
        "accessKey": {
          "type": "string",
          "description": "AWS access-key used to authenticate"
        },
        "secretKey": {
          "type": "string",
          "description": "AWS secret-key used to authenticate"
        },
        "region": {
          "type": "string",
          "description": "Custom AWS region"
        }
      }
    },
    "proxied": {
      "$id": "#proxied",
      "properties": {
        "store": {
          "type": "boolean",
          "default": false,
          "title": "Store",
          "description": "Reposilite can store proxied artifacts locally to reduce response time and improve stability."
        },
        "connectTimeout": {
          "type": "integer",
          "default": 3,
          "title": "Connect timeout (in seconds)",
          "description": "How long Reposilite can wait for establishing the connection with a remote host."
        },
        "readTimeout": {
          "type": "integer",
          "default": 15,
          "title": "Read timeout (in seconds)",
          "description": "How long Reposilite can read data from remote proxy."
        },
        "authorization": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "token": {
              "type": "string"
            }
          }
        },
        "allowedGroups": {
          "type": "array",
          "default": [],
          "title": "Allow",
          "description": "Allowed artifact groups. If none are given, all artifacts can be obtained from this proxy.",
          "items": {
            "type": "string",
            "format": "maven-artifact-group"
          }
        },
        "reference": {
          "type": "string",
          "oneOf": [{
            "format": "uri"
          }, {
            "format": "repository-name"
          }]
        }
      }
    },
    "repository": {
      "$id": "#repository",
      "type": "object",
      "title": "Maven repository",
      "default": {
        "visibility": "PUBLIC",
        "redeployment": false,
        "preserved": -1,
        "storageProvider": {
          "type": "fs",
          "quota": "100%"
        },
        "proxied": []
      },
      "examples": [
        {
          "visibility": "PUBLIC",
          "redeployment": false,
          "preserved": -1,
          "storageProvider": {
            "type": "fs",
            "quota": "100%"
          },
          "proxied": []
        }
      ],
      "properties": {
        "visibility": {
          "type": "string",
          "enum": ["PUBLIC", "HIDDEN", "PRIVATE"],
          "title": "Visibility",
          "description": "",
          "default": "PUBLIC"
        },
        "redeployment": {
          "type": "boolean",
          "title": "Redeployment",
          "description": "Does this repository accept redeployment of the same artifact version.",
          "default": false
        },
        "preserved": {
          "type": "integer",
          "minimum": -1,
          "title": "Preserved versions",
          "description": "How many builds of the given snapshot version should be preserved when a new build is deployed. Use -1 to disable this feature.",
          "default": -1
        },
        "storageProvider": {
          "type": "object",
          "title": "Storage type",
          "description": "Used storage type.",
          "default": {
            "type": "fs",
            "quota": "100%"
          },
          "oneOf": [{
            "$ref": "#fs-storage-provider"
          }, {
            "$ref": "#s3-storage-provider"
          }],
          "examples": [
            {
              "type": "fs",
              "quota": "100%"
            },
            {
              "type": "s3",
              "bucketName": "bucket-name",
              "endpoint": "custom.endpoint.com",
              "accessKey": "accessKey",
              "secretKey": "secretKey",
              "region": "region"
            }
          ],
          "required": [
            "type"
          ]
        },
        "proxied": {
          "type": "array",
          "title": "Proxied",
          "description": "List of proxied repositories associated with this repository.",
          "default": [],
          "examples": [
            []
          ],
          "additionalItems": true,
          "items": {
            "$ref": "#proxied"
          }
        }
      }
    }
  },
  "required": [
    "repositories"
  ],
  "title": "SharedConfiguration",
  "type": "object",
  "properties": {
    "frontend": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "title": "Id",
          "description": "Repository id used in Maven repository configuration",
          "default": "reposilite-repository",
          "examples": [
            "reposilite-repository"
          ]
        },
        "title": {
          "type": "string",
          "title": "Title",
          "description": "Repository title.",
          "default": "Reposilite Repository",
          "examples": [
            "Reposilite Repository"
          ]
        },
        "description": {
          "type": "string",
          "title": "Description",
          "description": "Repository description.",
          "default": "Public Maven repository hosted through the Reposilite",
          "examples": [
            "Public Maven repository hosted through the Reposilite"
          ]
        },
        "organizationWebsite": {
          "type": "string",
          "format": "url",
          "title": "Website",
          "description": "Link to organization's website.",
          "default": "https://reposilite.com",
          "examples": [
            "https://reposilite.com"
          ]
        },
        "organizationLogo": {
          "type": "string",
          "format": "url",
          "title": "Logo URL",
          "description": "Link to organization's logo.",
          "default": "https://avatars.githubusercontent.com/u/88636591",
          "examples": [
            "https://avatars.githubusercontent.com/u/88636591"
          ]
        }
      }
    },
    "advanced": {
      "type": "object",
      "properties": {
        "basePath": {
          "type": "string",
          "title": "Custom base path",
          "description": "Custom base path",
          "default": "/"
        },
        "frontend": {
          "type": "boolean",
          "title": "Frontend",
          "description": "Enable default frontend with dashboard",
          "default": false
        },
        "swagger": {
          "type": "boolean",
          "title": "Swagger",
          "description": "Enable Swagger (/swagger-docs) and Swagger UI (/swagger).",
          "default": false
        },
        "forwardedIp": {
          "type": "string",
          "title": "Real IP Header",
          "description": "Any kind of proxy services change real ip.\nThe origin ip should be available in one of the headers.\nNginx: X-Forwarded-For\nCloudflare: CF-Connecting-IP\nPopular: X-Real-IP",
          "default": "X-Forwarded-For"
        },
        "icpLicense": {
          "type": "string",
          "title": "The Internet Content Provider License (also known as Bei'An)",
          "description": "Web services in China require ICP license, a permit issued by the Chinese government to permit China-based websites to operate in China.\nIn order to fulfill the conditions, you should apply for ICP license from your service provider and fill in this parameter.",
          "default": ""
        }
      }
    },
    "ldap": {
      "type": "object",
      "title": "Ldap configuration",
      "description": "Ldap configuration.",
      "properties": {
        "enabled": {
          "type": "boolean",
          "title": "Enabled",
          "description": "LDAP Authenticator is enabled.",
          "default": false
        },
        "hostname": {
          "type": "string",
          "format": "url",
          "title": "Hostname",
          "description": "LDAP server address",
          "default": "ldap.domain.com"
        },
        "port": {
          "type": "integer",
          "minimum": 0,
          "maximum": 65535,
          "title": "Port",
          "description": "LDAP server port",
          "default": 389
        },
        "baseDn": {
          "type": "string",
          "title": "Base DN",
          "description": "Base DN with users",
          "default": "dc=company,dc=com"
        },
        "searchUserDn": {
          "type": "string",
          "title": "Search user DN",
          "description": "User used to perform searches in LDAP server (requires permissions to read all LDAP entries)",
          "default": "cn=reposilite,ou=admins,dc=domain,dc=com"
        },
        "searchUserPassword": {
          "type": "string",
          "title": "Search user password",
          "description": "Search user's password",
          "default": "reposilite-admin-secret"
        },
        "userAttribute": {
          "type": "string",
          "title": "User attribute",
          "description": "Attribute in LDAP that represents unique username used to create access token",
          "default": "cn"
        },
        "userFilter": {
          "type": "string",
          "title": "User filter",
          "description": "LDAP user filter",
          "default": "(&(objectClass=person)(ou=Maven Users))"
        },
        "userType": {
          "type": "string",
          "enum": ["persistent", "temporary"],
          "title": "User type",
          "description": "Should the created through LDAP access token be TEMPORARY or PERSISTENT",
          "default": "persistent"
        }
      }
    },
    "repositories": {
      "type": "object",
      "title": "List of supported Maven repositories",
      "description": "List of supported Maven repositories.",
      "default": {},
      "additionalProperties": {
        "$ref": "#repository"
      }
    },
    "statistics": {
      "type": "object",
      "title": "Statistics",
      "description": "Statistics module configuration.",
      "default": {
        "resolvedRequestsInterval": "monthly"
      },
      "examples": [
        {
          "resolvedRequestsInterval": "daily"
        }
      ],
      "properties": {
        "resolvedRequestsInterval": {
          "type": "string",
          "enum": ["daily", "weekly", "monthly", "yearly"],
          "title": "The resolvedRequestsInterval schema",
          "description": "How often Reposilite should divide recorded requests into separated groups.\nWith higher precision you can get more detailed timestamps, but it'll increase database size.\nIt's not that important for small repos with low traffic, but public instances should not use daily interval.",
          "default": "monthly"
        }
      }
    }
  },
  "additionalProperties": true
}
`.trim()

let uploadedFiles = []

application
  .get("/", (req, res) => res.send("Reposilite stub API"))
  .use((req, res, next) => {
    console.log("Requested fake " + req.method + " " + req.url)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, HEAD, DELETE, OPTIONS"
    )
    next()
  })
  .use(express.text())
  .use(bodyParser.raw({ limit: '10mb', extended: true }))
  .get(
    "/api/maven/details/snapshots",
    respond(createDirectoryDetails("/snapshot", []))
  )
  .get("/api/maven/details/private", (req, res) => {
    authorized(
      req,
      () =>
        res.send(
          createDirectoryDetails("/private", [createDirectoryDetails("1.0.0")])
        ),
      () => invalidCredentials(res)
    )
  })
  .get("/private/maven-metadata.xml", (req, res) => {
    authorized(
      req,
      () =>
        res.send(`
      <metadata>
        <groupId>default</groupId>
        <artifactId>private</artifactId>
        <versioning>
          <release>1.0.0</release>
          <versions>
            <version>1.0.0</version>
          </versions>
        </versioning>
      </metadata>
      `),
      () => invalidCredentials(res)
    )
  })
  .get(
    "/api/maven/details/releases",
    respond(
      createDirectoryDetails("/releases", [createDirectoryDetails("gav")])
    )
  )
  .get(
    "/api/maven/details/releases/gav",
    respond(
      createDirectoryDetails("/releases/gav", [
        createDirectoryDetails("0.1.0"),
        createDirectoryDetails("1.0.0"),
        createFileDetails("maven-metadata.xml", "text/xml", 4096),
      ])
    )
  )
  .get(
    "/api/maven/details/releases/gav/1.0.0",
    respond(
      createDirectoryDetails("/releases/gav/1.0.0", [
        createFileDetails("gav-1.0.0.jar", "application/jar-archive", 1337),
        createFileDetails("gav-1.0.0.jar.md5", "text/plain", 5),
      ])
    )
  )
  .get(
    "/api/maven/details/releases/gav/0.1.0",
    respond(
      createDirectoryDetails("/releases/gav/0.1.0", [
        createFileDetails("gav-0.1.0.jar", "application/jar-archive", 1337),
      ])
    )
  )
  .get("/releases/gav/1.0.0/gav-1.0.0.jar", respond("content"))
  .get("/releases/gav/0.1.0/gav-0.1.0.jar", respond("content"))
  .get(
    "/releases/gav/maven-metadata.xml",
    respond(`
  <metadata>
    <groupId>g.a.v</groupId>
    <artifactId>gav</artifactId>
    <versioning>
      <release>1.0.0</release>
      <versions>
        <version>0.1.0</version>
        <version>1.0.0</version>
      </versions>
    </versioning>
  </metadata>
  `)
  )
  .get("/api/configuration/all", (req, res) => {
    authorized(
      req,
      () =>
        res.send({
          type: "application/cdn",
          content: sharedConfiguration,
        }),
      () => invalidCredentials(res)
    )
  })
  .put("/api/settings/content/configuration.shared.cdn", (req, res) => {
    authorized(
      req,
      () => {
        sharedConfiguration = req.body
        res.send("Success")
      },
      () => invalidCredentials(res)
    )
  })
  .get("/api/auth/me", (req, res) => {
    authorized(
      req,
      () =>
        res.send({
          accessToken: {
            id: 1,
            name: "name",
            createdAt: Date.now(),
            description: "Description",
          },
          permissions: [{ identifier: "access-token:manager" }],
          routes: [
            {
              path: "/",
              permission: {
                identifier: "route:read",
              },
            },
            {
              path: "/",
              permission: {
                identifier: "route:write",
              },
            },
          ],
        }),
      () => invalidCredentials(res)
    )
  })
  .ws("/api/console/sock", (connection) => {
    let authenticated = false

    connection.on("message", (message) => {
      if (message == "Authorization:name:secret") {
        sendMessage(connection, "DEBUG | Authorized")
        authenticated = true
      }

      if (!authenticated || message == "stop") {
        sendMessage(connection, "Connection closed")
        connection.close()
        return
      }

      sendMessage(connection, "INFO | Response: " + message)
    })
  })
  .get("/api/maven/details", (req, res) => {
    const repositories = createDirectoryDetails("/", [
      createDirectoryDetails("releases"),
      createDirectoryDetails("snapshots"),
    ])
    authorized(req, () =>
      repositories.files.push(createDirectoryDetails("private"))
    )
    res.send(repositories)
  })
  .put("*", (req, res) => {
    authorized(
      req,
      () => {
        uploadedFiles.push({
          file: req.url,
          content: req.body
        })
        console.log(`File ${req.url} has been uploaded`)
      },
      () => invalidCredentials(res)
    )
  })
  .get("*", (req, res) =>
    res.status(404).send({
      status: 404,
      message: "Not found",
    })
  )
  .listen(8080)

console.log("Reposilite stub API started on port 80")
