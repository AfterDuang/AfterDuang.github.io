import{_ as T}from"./YunFooter.vue_vue_type_script_setup_true_lang-CYufLakv.js";import{d as f,o as t,e as a,i,r as C,L as S,B as b,D as H,t as g,q as _,_ as M,aJ as V,m as d,s as w,F as B,l as z,n as Y,f as v,c as $,h as k,aK as D,R,aL as A,a as E,g as F,az as P}from"./app-DEw9raa7.js";const G={class:"yun-notice m-auto"},I=["innerHTML"],j=f({__name:"YunNotice",props:{content:{}},setup(m){return(n,o)=>(t(),a("div",G,[i("span",{innerHTML:n.content},null,8,I),C(n.$slots,"default")]))}}),q={class:"say"},J={key:0,class:"say-content animate-fade-in animate-iteration-1"},K={key:1,class:"say-author"},O={key:2,class:"say-from"},W=f({__name:"YunSay",setup(m){const n=S(),o=b(""),s=b(""),u=b("");function h(){const r=n.value.say.hitokoto.enable?n.value.say.hitokoto.api:n.value.say.api;r&&fetch(r).then(e=>{if(e.ok)e.json().then(c=>{if(n.value.say.hitokoto.enable)o.value=c.hitokoto,s.value=c.from_who,u.value=c.from;else{const l=c[Math.floor(Math.random()*c.length)];l.content?(o.value=l.content,s.value=l.author,u.value=l.from):o.value=l}});else throw new Error(`${n.value.say.api}, HTTP error, status = ${e.status}`)}).catch(e=>{console.error(e.message)})}return H(()=>{h()}),(r,e)=>(t(),a("div",q,[o.value?(t(),a("span",J,g(o.value),1)):_("v-if",!0),s.value?(t(),a("span",K,g(s.value),1)):_("v-if",!0),u.value?(t(),a("span",O,g(u.value),1)):_("v-if",!0)]))}}),Q=i("div",{"i-ri-arrow-down-s-line":"","inline-flex":""},null,-1),U=[Q],X=f({__name:"YunGoDown",setup(m){function n(){const o=document.getElementById("yun-banner");o&&window.scrollTo({top:o.clientHeight,behavior:"smooth"})}return(o,s)=>(t(),a("button",{class:"go-down","aria-label":"go-down",onClick:n},U))}}),Z={},ee={class:"yun-cloud"},ne=V('<svg class="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto"><defs><path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" fill="var(--yun-c-cloud)"></path></defs><g class="parallax"><use xlink:href="#gentle-wave" x="48" y="0"></use><use xlink:href="#gentle-wave" x="48" y="3"></use><use xlink:href="#gentle-wave" x="48" y="5"></use><use xlink:href="#gentle-wave" x="48" y="7"></use></g></svg>',1),te=[ne];function oe(m,n){return t(),a("div",ee,te)}const se=M(Z,[["render",oe]]),ae={class:"banner-line-container"},re={class:"banner-char-container"},ce={class:"char"},le={class:"banner-line-container bottom"},ie=f({__name:"YunBanner",setup(m){const n=S(),o=d(()=>{const r=[];for(let e=0;e<n.value.banner.title.length;e++){const c=D(1.5,3.5);r.push(c)}return r}),s=d(()=>o.value.reduce((r,e)=>r+e,0)/2),u=d(()=>({"--banner-line-height":`calc(var(--banner-height, 100vh) / 2 - ${s.value}rem)`})),h=b(!0);return(r,e)=>{var y;const c=se,l=X;return t(),a("div",{id:"yun-banner",style:Y(u.value)},[i("div",ae,[i("div",{class:w(["banner-line vertical-line-top",{active:h.value}])},null,2)]),i("div",re,[(t(!0),a(B,null,z(v(n).banner.title,(x,p)=>(t(),a("div",{key:p,class:"char-box"},[i("span",{class:w([p%2!==0?"char-right":"char-left"]),style:Y({"--banner-char-size":`${o.value[p]}rem`})},[i("span",ce,g(x),1)],6)]))),128))]),i("div",le,[i("div",{class:w(["banner-line vertical-line-bottom",{active:h.value}])},null,2)]),(y=v(n).banner.cloud)!=null&&y.enable?(t(),$(c,{key:0})):_("v-if",!0),k(l)],4)}}}),he=f({__name:"home",setup(m){const n=R(),o=A("home"),s=S(),u=E(),h=d(()=>u.path.startsWith("/page")),r=d(()=>{const e=s.value.notice;return e.enable&&(h.value?!e.hideInPages:!0)});return(e,c)=>{const l=P,y=ie,x=W,p=j,L=F("RouterView"),N=T;return t(),a("main",{class:w(["yun-main flex-center",v(o)&&!v(n).isSidebarOpen?"pl-0":"md:pl-$va-sidebar-width"]),flex:"~ col",w:"full"},[k(l,{"show-hamburger":!0}),h.value?_("v-if",!0):(t(),a(B,{key:0},[v(s).banner.enable?(t(),$(y,{key:0})):_("v-if",!0),v(s).say.enable?(t(),$(x,{key:1,w:"full"})):_("v-if",!0)],64)),r.value?(t(),$(p,{key:1,content:v(s).notice.content,mt:"4"},null,8,["content"])):_("v-if",!0),C(e.$slots,"board"),C(e.$slots,"default",{},()=>[k(L)]),k(N)],2)}}});export{he as default};
