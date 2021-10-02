var $e=Object.defineProperty;var re=Object.getOwnPropertySymbols;var Ie=Object.prototype.hasOwnProperty,Te=Object.prototype.propertyIsEnumerable;var le=(o,t,a)=>t in o?$e(o,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[t]=a,ie=(o,t)=>{for(var a in t||(t={}))Ie.call(t,a)&&le(o,a,t[a]);if(re)for(var a of re(t))Te.call(t,a)&&le(o,a,t[a]);return o};import{r as O,a as ce,u as de,w as j,d as Ce,b as Ee,c as m,o as c,e as p,f as g,g as l,t as $,h as C,n as ue,i as pe,M as Le,T as Se,j as f,k,l as Me,m as U,v as W,p as Oe,q,s as _e,x as me,y as A,z as L,A as B,P as qe,B as Ae,C as G,D as ee,F as M,E as P,G as Pe,H as Re,I as Be,J as Ve,K as je,L as De,N as He,O as Ne,Q as ze,R as Ue,S as We,U as Ge}from"./vendor.1ef3bae7.js";const Ke=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))e(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&e(n)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerpolicy&&(i.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?i.credentials="include":s.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}};Ke();const D=O({isDark:!1}),ge="dark-theme";function fe(){return{theme:D,fetchTheme:()=>{D.isDark=localStorage.getItem(ge)==="true"},toggleTheme:()=>{D.isDark=!D.isDark,localStorage.setItem(ge,D.isDark)}}}function V(){const o=!"{{REPOSILITE.BASE_PATH}}".includes("REPOSILITE.BASE_PATH"),t=o?"{{REPOSILITE.BASE_PATH}}":"/",a=o?"{{REPOSILITE.ID}}":"reposilite-repository",e=o?"{{REPOSILITE.TITLE}}":"Reposilite Repository",s=o?"{{REPOSILITE.DESCRIPTION}}":"Public Maven repository hosted through the Reposilite",i=o?"{{REPOSILITE.ORGANIZATION_WEBSITE}}":location.protocol+"//"+location.host+t;return{available:o,basePath:t,id:a,title:e,description:s,organizationWebsite:i,organizationLogo:o?"{{REPOSILITE.ORGANIZATION_LOGO}}":"https://avatars.githubusercontent.com/u/75123628?s=200&v=4",icpLicense:o?"{{REPOSILITE.ICP_LICENSE}}":"\u56FDICP\u5907000000000\u53F7"}}const{basePath:Fe}=V(),te=()=>window.location.protocol+"//"+location.host+Fe,Qe=()=>te().endsWith("/")?te().slice(0,-1):te(),K=o=>Qe()+o,oe=(o,t)=>{const a=()=>o&&t?e(o,t):{},e=(n,r)=>({headers:{Authorization:`xBasic ${btoa(`${n}:${r}`)}`}}),s=(n,r)=>(r=r||a(),ce.get(K(n),ie({},r)));return{createURL:K,client:{auth:{me(n,r){return s("/api/auth/me",e(n,r))}},console:{},maven:{content(n){return s(`/${n}`)},details(n){return s(`/api/maven/details/${n||""}`)}}}}},S="",he="session-token-name",ve="session-token-secret",Ye="access-token:manager",F=O({name:S,secret:S}),be={id:S,name:S,createdAt:S,permissions:[],routes:[]},Q=O({details:be});function H(){const o=(n,r)=>{localStorage.setItem(he,n),F.name=n,localStorage.setItem(ve,r),F.secret=r},t=()=>{o(S,S),Q.details=be},a=async(n,r)=>{try{const{client:d}=oe();if(n==S)throw new Error("Missing credentials");const u=await d.auth.me(n,r);return o(n,r),Q.details=u.data,{token:F,session:Q}}catch(d){throw t(),d}};return{token:F,session:Q,login:a,logout:t,fetchSession:()=>a(localStorage.getItem(he),localStorage.getItem(ve)),isLogged:n=>(n==null?void 0:n.name)!=S,isManager:n=>{var r;return(r=n==null?void 0:n.permissions)==null?void 0:r.find(d=>d.identifier==Ye)}}}const Y=O({watchable:0,path:""});function Ze(o){const t=de();return j(()=>t.params.qualifier,a=>{Y.path=a,Y.watchable++},{immediate:!0}),j(()=>o.name,a=>Y.watchable++),{qualifier:Y}}var v=(o,t)=>{for(const[a,e]of t)o[a]=e;return o};const Je=Ce({setup(){const{title:o,description:t,organizationLogo:a,icpLicense:e}=V();Ee({title:o,description:t});const{theme:s,fetchTheme:i}=fe(),{fetchSession:n,token:r,session:d}=H(),{qualifier:u}=Ze(r);return i(),n().catch(h=>{}),{theme:s,qualifier:u,token:r,session:d,icpLicense:e}}}),Xe={key:0,class:"absolute bottom-4 w-full text-center text-xs"},et={href:"https://beian.miit.gov.cn",target:"_blank"};function tt(o,t,a,e,s,i){const n=m("router-view");return c(),p("div",{class:ue({dark:o.theme.isDark})},[g(n,{class:"min-h-screen dark:bg-black dark:text-white",qualifier:o.qualifier,token:o.token,session:o.session},null,8,["qualifier","token","session"]),o.icpLicense?(c(),p("div",Xe,[l("a",et,$(o.icpLicense),1)])):C("",!0)],2)}var ot=v(Je,[["render",tt]]);const nt={},st={class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},at=l("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1),rt=[at];function lt(o,t){return c(),p("svg",st,rt)}var it=v(nt,[["render",lt]]);const ct={components:{GlobeIcon:it},setup(){const{description:o,organizationWebsite:t,organizationLogo:a}=V();return{description:o,organizationWebsite:t,organizationLogo:a}}},dt={class:"bg-gray-100 dark:bg-black"},ut={class:"container mx-auto flex flex-row"},pt={class:"w-35"},_t=["src"],mt={class:"flex flex-col justify-center px-10"},gt={class:"flex flex-row py-2"},ft=["href"];function ht(o,t,a,e,s,i){const n=m("GlobeIcon");return c(),p("div",dt,[l("div",ut,[l("div",pt,[l("img",{class:"border-2 rounded-full dark:border-gray-700",src:e.organizationLogo},null,8,_t)]),l("div",mt,[l("div",null,[l("p",null,$(e.description),1)]),l("div",gt,[g(n),l("a",{class:"px-3 text-gray-500",href:e.organizationWebsite},$(e.organizationWebsite),9,ft)])])])])}var vt=v(ct,[["render",ht]]);const bt={},yt={class:"mx-2 py-1.5 rounded-full bg-white dark:bg-gray-900 font-bold px-6 text-sm cursor-pointer"};function kt(o,t){return c(),p("div",yt,[pe(o.$slots,"default")])}var xt=v(bt,[["render",kt]]);const wt={inheritAttrs:!1,components:{VueFinalModal:Le,ModalsContainer:Se},setup(){const{login:o}=H(),t=f(!1),a=f(""),e=f(""),s=()=>t.value=!1;return{name:a,secret:e,close:s,showLogin:t,signin:(n,r)=>{o(n,r).then(d=>q(`Dashboard accessed as ${n}`,{position:"bottom-right"})).then(d=>s()).catch(d=>{console.log(d),q(`${d.response.status}: ${d.response.data.message}`,{type:"danger"})})}}}},$t=o=>(_e("data-v-1d9af69e"),o=o(),me(),o),It={class:"relative border bg-white dark:bg-gray-900 border-gray-100 dark:border-black m-w-20 py-5 px-10 rounded-2xl shadow-xl text-center"},Tt=$t(()=>l("p",{class:"font-bold text-xl pb-4"},"Login with access token",-1)),Ct={class:"text-right mt-1"};function Et(o,t,a,e,s,i){const n=m("vue-final-modal");return c(),p("div",null,[g(n,Oe({modelValue:e.showLogin,"onUpdate:modelValue":t[6]||(t[6]=r=>e.showLogin=r)},o.$attrs,{classes:"flex justify-center items-center"}),{default:k(()=>[l("div",It,[Tt,l("form",{class:"flex flex-col w-96",onSubmit:t[4]||(t[4]=Me(r=>e.signin(e.name,e.secret),["prevent"]))},[U(l("input",{placeholder:"Name","onUpdate:modelValue":t[0]||(t[0]=r=>e.name=r),type:"text",class:"input"},null,512),[[W,e.name]]),U(l("input",{placeholder:"Secret","onUpdate:modelValue":t[1]||(t[1]=r=>e.secret=r),type:"password",class:"input"},null,512),[[W,e.secret]]),l("div",Ct,[l("button",{onClick:t[2]||(t[2]=r=>e.close()),class:"text-blue-400 text-xs"},"\u2190 Back to index")]),l("div",{class:"bg-gray-100 dark:bg-gray-800 py-2 my-3 rounded-md cursor-pointer",onClick:t[3]||(t[3]=r=>e.signin(e.name,e.secret))},"Sign in")],32),l("button",{class:"absolute top-0 right-0 mt-5 mr-5",onClick:t[5]||(t[5]=r=>e.close())},"\u{1F5D9}")])]),_:1},16,["modelValue"]),l("div",{onClick:t[7]||(t[7]=r=>e.showLogin=!0)},[pe(o.$slots,"button",{},void 0,!0)])])}var Lt=v(wt,[["render",Et],["__scopeId","data-v-1d9af69e"]]);const St={},Mt={class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Ot=l("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"},null,-1),qt=[Ot];function At(o,t){return c(),p("svg",Mt,qt)}var Pt=v(St,[["render",At]]);const Rt={},Bt={class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Vt=l("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"},null,-1),jt=[Vt];function Dt(o,t){return c(),p("svg",Bt,jt)}var Ht=v(Rt,[["render",Dt]]);const Nt={components:{MenuButton:xt,LoginModal:Lt,MoonIcon:Pt,SunIcon:Ht},props:{token:{type:Object,required:!0}},setup(o){const{theme:t,toggleTheme:a}=fe(),{title:e}=V(),{isLogged:s,logout:i}=H(),n=o.token,r=A(()=>s(n));return{token:n,title:e,logged:r,signout:()=>i(),theme:t,toggleTheme:a}}},zt={class:"flex flex-row"},Ut={key:0,class:"pt-1.1 px-2"},Wt=B(" Welcome "),Gt={class:"font-bold underline"},Kt=B(" Sign in "),Ft=B(" Logout ");function Qt(o,t,a,e,s,i){const n=m("MenuButton"),r=m("LoginModal"),d=m("SunIcon"),u=m("MoonIcon");return c(),p("nav",zt,[e.logged?(c(),p("div",Ut,[Wt,l("span",Gt,$(e.token.name),1)])):C("",!0),g(r,null,{button:k(()=>[e.logged?C("",!0):(c(),L(n,{key:0},{default:k(()=>[Kt]),_:1}))]),_:1}),e.logged?(c(),L(n,{key:1,onClick:t[0]||(t[0]=h=>e.signout())},{default:k(()=>[Ft]),_:1})):C("",!0),l("div",{class:"pl-2 pt-1.3 cursor-pointer rounded-full bg-white dark:bg-gray-900",onClick:t[1]||(t[1]=h=>e.toggleTheme())},[e.theme.isDark?(c(),L(d,{key:0,class:"mr-1.9"})):(c(),L(u,{key:1,class:"mr-1.5"}))])])}var Yt=v(Nt,[["render",Qt]]);const Zt={components:{Hero:vt,Menu:Yt},props:{token:{type:Object,required:!0}},setup(o){const t=o.token,{title:a}=V();return{token:t,title:a}}},Jt={class:"bg-gray-100 dark:bg-black dark:text-white"},Xt={class:"container mx-auto flex flex-row py-10 justify-between"},eo={class:"text-xl font-medium py-1"};function to(o,t,a,e,s,i){const n=m("router-link"),r=m("Menu"),d=m("Hero");return c(),p("header",Jt,[l("div",Xt,[l("h1",eo,[g(n,{to:"/"},{default:k(()=>[B($(e.title),1)]),_:1})]),g(r,{token:e.token,class:"mt-0.5"},null,8,["token"])]),g(d,{class:"pt-2 pb-11"})])}var oo=v(Zt,[["render",to]]);function no(){return{createSnippets:(t,a,e)=>[{name:"Maven",lang:"xml",snippet:`
<dependency>
  <groupId>${t}</groupId>
  <artifactId>${a}</artifactId>
  <version>${e}</version>
</dependency>`.trim()},{name:"Gradle Groovy",lang:"xml",snippet:`implementation "${t}:${a}:${e}"`},{name:"Gradle Kotlin",lang:"kotlin",snippet:`implementation("${t}:${a}:${e}")`},{name:"SBT",lang:"scala",snippet:`"${t}" %% "${a}" %% "${e}"`}]}}function so(){const{id:o,title:t}=V();return{createRepositories:e=>{const s=A(()=>e.path.split("/")[0]),i=o+(e.path?`-${s.value}`:""),n=location.protocol+"//"+location.host+(e.path?`/${s.value}`:"/{repository}");return[{name:"Maven",lang:"xml",snippet:`
<repository>
  <id>${i}</id>
  <name>${t}</name>
  <url>${n}</url>
</repository>
        `.trim()},{name:"Gradle Groovy",lang:"groovy",snippet:`maven {
    url "${n}"
 }`.trim()},{name:"Gradle Kotlin",lang:"kotlin",snippet:`maven {
    url = uri("${n}")
}`},{name:"SBT",lang:"scala",snippet:`resolvers += "${i}" at "${n}"`}]}}}const ao=new DOMParser;function ro(){return{parseMetadata:s=>ao.parseFromString(s,"text/xml"),groupId:s=>{var i,n;return(n=(i=s==null?void 0:s.getElementsByTagName("groupId")[0])==null?void 0:i.firstChild)==null?void 0:n.nodeValue},artifactId:s=>{var i,n;return(n=(i=s==null?void 0:s.getElementsByTagName("artifactId")[0])==null?void 0:i.firstChild)==null?void 0:n.nodeValue},versions:s=>{var i,n,r;return(r=(n=Array.from((i=s==null?void 0:s.getElementsByTagName("versioning")[0])==null?void 0:i.children))==null?void 0:n.map(d=>d.firstChild.nodeValue))!=null?r:["{unknown}"]}}}const lo={},io={class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},co=l("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"},null,-1),uo=[co];function po(o,t){return c(),p("svg",io,uo)}var _o=v(lo,[["render",po]]);const mo={components:{PrismEditor:qe,CopyIcon:_o},props:{qualifier:{type:Object,required:!0},token:{type:Object,required:!0}},setup(o){const t=o.qualifier,a=o.token,e=f(""),s=f([]),{createRepositories:i}=so(),{createSnippets:n}=no(),{parseMetadata:r,groupId:d,artifactId:u,versions:h}=ro(),{client:_}=oe(a.name,a.secret),{copy:I,isSupported:b}=Ae(),x=f(localStorage.getItem("card-tab")||"Maven");G(()=>localStorage.setItem("card-tab",x.value));const R=()=>{s.value=i(t),e.value="Repository details"},J=T=>{const y=r(T);s.value=n(d(y),u(y),h(y)[0]),e.value="Artifact details"};G(()=>{const T=t.path.split("/");if(T.length==1&&T[0]==""){R();return}_.maven.content(`${t.path}/maven-metadata.xml`).then(y=>J(y.data)).catch(y=>{y.message!=="Request failed with status code 404"&&console.log(y),R()})}),G(()=>{s.value.forEach(T=>{T.highlighter=y=>{var z;return ee.highlight(y,(z=ee.languages[T.lang])!=null?z:ee.languages.js)}})});const E=f("slide-right");return j(x,(T,y)=>{const z=s.value.findIndex(X=>X.name===T),we=s.value.findIndex(X=>X.name===y);E.value=z-we<0?"slide-left":"slide-right"}),{title:e,configurations:s,selectedTab:x,transitionName:E,copy:async()=>{const{snippet:T}=s.value.find(y=>y.name===x.value);return await I(T),q("Copied snippet",{type:"info"})},isCopySupported:b}}},go={class:"bg-white dark:bg-gray-900 shadow-lg p-7 rounded-xl border-gray-100 dark:border-black"},fo={class:"flex flex-row justify-between"},ho={class:"font-bold flex items-center w-full"},vo={class:"flex"},bo=["onClick"],yo=l("hr",{class:"dark:border-gray-800"},null,-1),ko={class:"overflow-hidden"};function xo(o,t,a,e,s,i){const n=m("copy-icon"),r=m("prism-editor");return c(),p("div",go,[l("div",fo,[l("h1",ho,[B($(e.title)+" ",1),e.isCopySupported?(c(),p("span",{key:0,onClick:t[0]||(t[0]=(...d)=>e.copy&&e.copy(...d)),class:"ml-auto cursor-pointer"},[g(n)])):C("",!0)])]),l("div",vo,[(c(!0),p(M,null,P(e.configurations,d=>(c(),p("div",{key:d.name,onClick:u=>e.selectedTab=d.name,class:ue(["py-4 px-7 flex-grow text-center border-b-2 cursor-pointer border-transparent",{"!border-gray-800":d.name===e.selectedTab}])},$(d.name),11,bo))),128))]),yo,l("div",ko,[g(Pe,{name:e.transitionName,mode:"out-in"},{default:k(()=>[(c(),p("div",{key:e.selectedTab,class:"relative h-33 mt-6 p-4 mr-1 rounded-lg bg-gray-100 dark:bg-gray-800"},[(c(!0),p(M,null,P(e.configurations,d=>(c(),p(M,null,[d.name===e.selectedTab?(c(),L(r,{key:0,class:"snippet absolute text-sm",modelValue:d.snippet,"onUpdate:modelValue":u=>d.snippet=u,highlight:d.highlighter,readonly:"","line-numbers":""},null,8,["modelValue","onUpdate:modelValue","highlight"])):C("",!0)],64))),256))]))]),_:1},8,["name"])])])}var wo=v(mo,[["render",xo]]);const $o={props:{file:{type:Object,required:!0}},setup(o){return{file:o.file,prettyBytes:Re}}},Io={class:"flex flex-row justify-between mb-1.5 py-3 rounded-full bg-white dark:bg-gray-900 lg:max-w-2/5 xl:max-w-1/2 cursor-pointer"},To={class:"flex flex-row"},Co={key:0,class:"text-xm px-6 pt-1.75"},Eo={key:1,class:"text-xm px-6 pt-1.75"},Lo={class:"font-semibold"},So={key:0,class:"px-6"};function Mo(o,t,a,e,s,i){return c(),p("div",Io,[l("div",To,[e.file.type=="DIRECTORY"?(c(),p("div",Co,"\u26AB")):(c(),p("div",Eo,"\u26AA")),l("div",Lo,$(e.file.name),1)]),e.file.contentLength?(c(),p("div",So,$(e.prettyBytes(e.file.contentLength)),1)):C("",!0)])}var Oo=v($o,[["render",Mo]]);const qo={components:{Card:wo,Entry:Oo},props:{qualifier:{type:Object,required:!0},token:{type:Object,required:!0}},setup(o){const t=o.qualifier,a=o.token,e=f(""),s=f([]),i=f(!1),n=f(void 0),r=_=>_.type=="DIRECTORY",d=de(),u=_=>(_.endsWith("/")?_.slice(0,-1):_).split("/").slice(0,-1).join("/")||"/";j(()=>t.watchable,async _=>{const{client:I}=oe(a.name,a.secret);I.maven.details(t.path).then(b=>{s.value=b.data.files,i.value=s.value.length==0,n.value=void 0}).catch(b=>{console.log(b),q(`${b.response.status}: ${b.response.data.message}`,{type:"danger"}),n.value=b}),e.value=u(`/${t.path}`)},{immediate:!0});const h=A(()=>{const _=d.path.split("/");return _.map((I,b)=>({link:_.slice(0,b+1).join("/")||"/",name:b===_.length-1?I:I+"/"}))});return{qualifier:t,token:a,parentPath:e,files:s,isEmpty:i,isErrored:n,isDirectory:r,createURL:K,breadcrumbs:h}}},Ao={class:"bg-gray-100"},Po={class:"bg-gray-100 dark:bg-black"},Ro={class:"container mx-auto"},Bo={class:"pt-7 pb-3 pl-2 font-semibold"},Vo=l("span",{class:"select-none"},"Index of ",-1),jo={class:"select-text"},Do=l("span",{class:"font-normal text-xl text-gray-500 select-none"}," \u2934 ",-1),Ho={class:"dark:bg-black"},No={class:"container mx-auto relative min-h-320px mb-32"},zo={class:"lg:absolute pt-5 -top-5 right-8"},Uo={class:"pt-4"},Wo=["href"],Go={key:0},Ko=l("p",null,"Directory is empty",-1),Fo=[Ko],Qo={key:1},Yo=l("p",null,"Directory not found",-1),Zo=[Yo];function Jo(o,t,a,e,s,i){const n=m("router-link"),r=m("Card"),d=m("Entry");return c(),p("div",Ao,[l("div",Po,[l("div",Ro,[l("p",Bo,[Vo,l("span",jo,[(c(!0),p(M,null,P(e.breadcrumbs,u=>(c(),L(n,{key:u.link,to:u.link},{default:k(()=>[B($(u.name),1)]),_:2},1032,["to"]))),128))]),g(n,{to:e.parentPath},{default:k(()=>[Do]),_:1},8,["to"])])])]),l("div",Ho,[l("div",No,[l("div",zo,[g(r,{qualifier:e.qualifier,token:e.token},null,8,["qualifier","token"])]),l("div",Uo,[(c(!0),p(M,null,P(e.files,u=>(c(),p("div",{key:u},[e.isDirectory(u)?(c(),L(n,{key:0,to:o.append(o.$route.path,u.name)},{default:k(()=>[g(d,{file:u},null,8,["file"])]),_:2},1032,["to"])):(c(),p("a",{key:1,href:e.createURL(o.$route.path+"/"+u.name),target:"_blank"},[g(d,{file:u},null,8,["file"])],8,Wo))]))),128)),e.isEmpty?(c(),p("div",Go,Fo)):C("",!0),e.isErrored?(c(),p("div",Qo,Zo)):C("",!0)])])])])}var Xo=v(qo,[["render",Jo]]);const en={},tn={class:"container mx-auto pt-10 px-15"},on=l("i",null,"Endpoints :: soon\u2122",-1),nn=[on];function sn(o,t){return c(),p("div",tn,nn)}var an=v(en,[["render",sn]]);const ye=["Other","Trace","Debug","Info","Warn","Error"],ne=O({}),ke=f(""),rn=f(0),Z=O([]),ln=new Be,cn=o=>{var t;return(t=ye.find(a=>o.includes(` | ${a.toUpperCase()} | `)))!=null?t:"Other"},xe=o=>ln.toHtml(o.replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll(" ","&nbsp;"));function dn(){ye.forEach(e=>{ne[e]={name:e,enabled:!0,count:A(()=>Z.reduce((s,i)=>s+(i.level===e),0))}});const o=A(()=>Z.filter(e=>e.message.toLowerCase().includes(ke.value.toLowerCase())).filter(e=>ne[e.level].enabled));return{levels:ne,log:o,filter:ke,sanitizeMessage:xe,logMessage:e=>{Z.push({id:rn.value++,message:xe(e),level:cn(e)})},clearLog:()=>{Z.length=0}}}const w=f(),se=f("");function un(){const o=K("/api/console/sock").replace("https","wss").replace("http","ws"),t=()=>{var u;return((u=w.value)==null?void 0:u.readyState)===WebSocket.OPEN},a=()=>{t()&&w.value.close()},e=()=>{w.value.send(se.value),se.value=""},s=f(),i=f(),n=f(),r=f();return{connection:w,connect:u=>{try{w.value=new WebSocket(o),w.value.onopen=()=>{w.value.send(`Authorization:${u.name}:${u.secret}`),s==null||s.value()},w.value.onmessage=_=>{_.data!="keep-alive"&&(i==null||i.value(_.data))},w.value.onerror=_=>n==null?void 0:n.value(_),w.value.onclose=()=>r==null?void 0:r.value();const h=setInterval(()=>{var _;t()?(_=w==null?void 0:w.value)==null||_.send("keep-alive"):clearInterval(h)},1e3*5)}catch(h){console.log(h),n==null||n.value(h)}},close:a,onOpen:s,onMessage:i,onError:n,onClose:r,command:se,execute:e}}const pn={props:{selectedTab:{type:Object,required:!0}},setup(o){const t=o.selectedTab,{levels:a,log:e,logMessage:s,filter:i,clearLog:n}=dn(),{onOpen:r,onMessage:d,onClose:u,onError:h,connect:_,close:I,command:b,execute:x}=un();Ve(()=>I());const R=()=>{const E=document.getElementById("console");E.scrollTop=E.scrollHeight},J=()=>{q("Connecting to the remote console",{type:"info"});const{token:E}=H();r.value=()=>n(),d.value=N=>{s(N),De(()=>R())},h.value=N=>q(`${N||""}`,{type:"danger"}),u.value=()=>q("Connection with console has been lost",{type:"danger"}),_(E)};return j(()=>t.value,E=>E==="Console"?J():I(),{immediate:!0}),{log:e,command:b,execute:x,levels:a,filter:i}}},_n={class:"container mx-auto pt-10 px-15 text-xs"},mn={class:"flex text-sm flex-col xl:flex-row w-full py-2 justify-between"},gn={class:"flex flex-row justify-around w-full xl:w-1/2"},fn=["checked","onChange"],hn={class:"pl-2 pr-4"},vn={class:"bg-white dark:bg-gray-900 rounded-lg"},bn={id:"console",class:"overflow-scroll h-144 px-4"},yn=["innerHTML"],kn=l("hr",{class:"dark:border-dark-300"},null,-1);function xn(o,t,a,e,s,i){return c(),p("div",_n,[l("div",mn,[U(l("input",{placeholder:"Filter","onUpdate:modelValue":t[0]||(t[0]=n=>e.filter=n),class:"w-full xl:w-1/2 mr-5 py-1 px-4 rounded-lg bg-white dark:bg-gray-900"},null,512),[[W,e.filter]]),l("div",gn,[(c(!0),p(M,null,P(e.levels,n=>(c(),p("div",{key:n.name,class:"pt-1.9 xl:pt-0.8 font-sans"},[l("input",{type:"checkbox",checked:n.enabled,onChange:r=>n.enabled=!n.enabled},null,40,fn),l("span",hn,$(n.name)+" ("+$(n.count)+")",1)]))),128))])]),l("div",vn,[l("div",bn,[(c(!0),p(M,null,P(e.log,n=>(c(),p("p",{key:n.id,innerHTML:n.message,class:"whitespace-nowrap"},null,8,yn))),128))]),kn,U(l("input",{placeholder:"Type command or '?' to get help",class:"w-full py-2 px-4 rounded-b-lg bg-white dark:bg-gray-900 dark:text-white","onUpdate:modelValue":t[1]||(t[1]=n=>e.command=n),onKeyup:t[2]||(t[2]=je(n=>e.execute(),["enter"]))},null,544),[[W,e.command]])])])}var wn=v(pn,[["render",xn]]);const $n={components:{Header:oo,Browser:Xo,Endpoints:an,Console:wn},props:{qualifier:{type:Object,required:!0},token:{type:Object,required:!0},session:{type:Object,required:!0}},setup(o){const t=o.qualifier,a=o.token,e=o.session,{isManager:s}=H(),i=O({value:localStorage.getItem("selectedTab")||"Overview"});G(()=>localStorage.setItem("selectedTab",i.value));const n=[{name:"Overview"},{name:"Endpoints"},{name:"Console",manager:!0}],r=A(()=>n.filter(u=>!(u==null?void 0:u.manager)||s(e.details)).map(u=>u.name)),d=A(()=>r.value.some(u=>u=="Console"));return{qualifier:t,token:a,isManager:s,menuTabs:r,consoleEnabled:d,selectedTab:i}}},In=o=>(_e("data-v-63b115f1"),o=o(),me(),o),Tn={class:"bg-gray-100 dark:bg-black"},Cn={class:"container mx-auto"},En=In(()=>l("hr",{class:"dark:border-gray-700"},null,-1)),Ln={class:"overflow-auto"};function Sn(o,t,a,e,s,i){const n=m("Header"),r=m("tab"),d=m("tabs"),u=m("Browser"),h=m("tab-panel"),_=m("Endpoints"),I=m("Console"),b=m("tab-panels");return c(),p("div",null,[g(n,{token:e.token},null,8,["token"]),l("div",Tn,[l("div",Cn,[g(d,{modelValue:e.selectedTab.value,"onUpdate:modelValue":t[0]||(t[0]=x=>e.selectedTab.value=x)},{default:k(()=>[(c(!0),p(M,null,P(e.menuTabs,(x,R)=>(c(),L(r,{class:"item font-normal",key:`menu${R}`,val:x,label:x,indicator:!0},null,8,["val","label"]))),128))]),_:1},8,["modelValue"])]),En,l("div",Ln,[g(b,{modelValue:e.selectedTab.value,"onUpdate:modelValue":t[1]||(t[1]=x=>e.selectedTab.value=x),animate:!0},{default:k(()=>[g(h,{val:"Overview"},{default:k(()=>[g(u,{qualifier:e.qualifier,token:e.token,ref:""},null,8,["qualifier","token"])]),_:1}),g(h,{val:"Endpoints"},{default:k(()=>[g(_)]),_:1}),e.consoleEnabled?(c(),L(h,{key:0,val:"Console"},{default:k(()=>[g(I,{selectedTab:e.selectedTab},null,8,["selectedTab"])]),_:1})):C("",!0)]),_:1},8,["modelValue"])])])])}var Mn=v($n,[["render",Sn],["__scopeId","data-v-63b115f1"]]);const On=He({history:Ne(),routes:[{path:"/:qualifier(.*)",name:"Index",component:Mn}]});const ae=ze(ot);ae.config.globalProperties.append=(o,t)=>o+(o.endsWith("/")?"":"/")+t;ae.config.globalProperties.drop=o=>(o.endsWith("/")?o.slice(0,-1):o).split("/").slice(0,-1).join("/");ae.use(Ue()).use(We,ce).use(Ge).use(On).mount("#app");
