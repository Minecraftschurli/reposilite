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
package com.reposilite

import com.reposilite.settings.api.LOCAL_CONFIGURATION_FILE
import com.reposilite.settings.api.LocalConfiguration
import com.reposilite.settings.api.SHARED_CONFIGURATION_FILE
import com.reposilite.settings.api.SharedConfiguration
import net.dzikoysk.cdn.KCdnFactory
import net.dzikoysk.cdn.source.Source
import picocli.CommandLine

fun main(args: Array<String>) {
    createWithParameters(*args)?.launch()
}

fun createWithParameters(vararg args: String): Reposilite? {
    val parameters = ReposiliteParameters()
    CommandLine(parameters).execute(*args)

    if (parameters.usageHelpRequested || parameters.versionInfoRequested) {
        return null
    }

    if (parameters.configurationRequested != null) {
        when (parameters.configurationRequested) {
            "configuration.cdn" -> KCdnFactory.createStandard().render(LocalConfiguration(), Source.of(parameters.workingDirectory.resolve(LOCAL_CONFIGURATION_FILE)))
            "shared.configuration.json" -> KCdnFactory.createJsonLike().render(SharedConfiguration(), Source.of(parameters.workingDirectory.resolve(SHARED_CONFIGURATION_FILE)))
            else -> println("Unknown configuration: ${parameters.configurationRequested}")
        }
        return null
    }

    return ReposiliteFactory.createReposilite(parameters)
}