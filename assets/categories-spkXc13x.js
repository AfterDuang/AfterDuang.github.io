import{_ as P}from"./YunCard.vue_vue_type_script_setup_true_lang-BabP9Q9Y.js";import{_ as V}from"./YunPostCollapse.vue_vue_type_style_index_0_lang-DvXD2s8K.js";import{d as q,u as D,a as A,m as $,B as E,v as L,aE as F,D as N,g as R,o as t,e as r,i as _,t as b,f as l,F as g,l as K,aF as U,c as y,w as p,q as S,h as m,z as j,K as T,aG as x,at as W,aA as G,aB as H,r as M,aC as O,az as J}from"./app-DEw9raa7.js";import{_ as Q}from"./YunPageHeader.vue_vue_type_script_setup_true_lang-B8z3l9zt.js";const X={class:"category-list-item inline-flex items-center cursor-pointer"},Z={key:0,"i-ri-folder-add-line":""},I={key:1,style:{color:"var(--va-c-primary)"},"i-ri-folder-reduce-line":""},ee={key:0},te=_("div",{"i-ri-file-text-line":""},null,-1),oe={m:"l-1",font:"serif black"},ne=q({__name:"YunCategory",props:{parentKey:{},category:{},level:{},collapsable:{type:Boolean,default:!0}},setup(z){const u=z,f=D(),n=A(),v=$(()=>{const e=n.query.category||"";return Array.isArray(e)?[e]:e.split("/")}),o=E(u.collapsable),{t:i}=L(),{locale:C}=L();function Y(e){const c=C.value==="zh-CN"?"zh":C.value;return e[`title_${c}`]?e[`title_${c}`]:e.title}const d=E(),{show:s}=F(d);function h(e){f.push({query:{category:e}}),s()}return N(()=>{const e=document.querySelector(".post-collapse-container");e&&(d.value=e)}),(e,c)=>{const k=R("YunCategory",!0),B=R("RouterLink");return t(),r(g,null,[_("li",X,[_("span",{class:"folder-action inline-flex",onClick:c[0]||(c[0]=a=>o.value=!o.value)},[o.value?(t(),r("div",Z)):(t(),r("div",I))]),_("span",{class:"category-name",m:"l-1",onClick:c[1]||(c[1]=a=>h(e.parentKey))},b(e.category.name==="Uncategorized"?l(i)("category.uncategorized"):e.category.name)+" ["+b(e.category.total)+"] ",1)]),o.value?S("v-if",!0):(t(),r("ul",ee,[(t(!0),r(g,null,K(e.category.children.values(),(a,w)=>(t(),r("li",{key:w,class:"post-list-item",m:"l-4"},[l(U)(a)?(t(),y(k,{key:0,"parent-key":e.parentKey?`${e.parentKey}/${a.name}`:a.name,category:a,collapsable:!v.value.includes(a.name)},null,8,["parent-key","category","collapsable"])):(t(),r(g,{key:1},[a.title?(t(),y(B,{key:0,to:a.path||"",class:"inline-flex items-center"},{default:p(()=>[te,_("span",oe,b(Y(a)),1)]),_:2},1032,["to"])):S("v-if",!0)],64))]))),128))]))],64)}}}),ae=q({__name:"YunCategories",props:{categories:{},level:{default:0},collapsable:{type:Boolean,default:!0}},setup(z){const u=A(),f=$(()=>{const n=u.query.category||"";return Array.isArray(n)?[n]:n.split("/")});return(n,v)=>{const o=ne;return t(!0),r(g,null,K(n.categories.values(),i=>(t(),r("ul",{key:i.name,class:"category-list",m:"l-4"},[m(o,{"parent-key":i.name,category:i,level:n.level+1,collapsable:!f.value.includes(i.name)},null,8,["parent-key","category","level","collapsable"])]))),128)}}}),se={text:"center",class:"yun-text-light",p:"2"},ue=q({__name:"categories",setup(z){const{t:u}=L(),f=j(),n=T(),v=A(),o=$(()=>v.query.category||""),i=x(),C=$(()=>f.postList.filter(s=>s.categories&&o.value!=="Uncategorized"?typeof s.categories=="string"?s.categories===o.value:s.categories.join("/").startsWith(o.value)&&s.categories[0]===o.value.split("/")[0]:!s.categories&&o.value==="Uncategorized"?s.categories===void 0:!1)),Y=W(n);return G([H({"@type":"CollectionPage"})]),(d,s)=>{const h=J,e=Q,c=ae,k=R("RouterView"),B=V,a=P;return t(),r(g,null,[d.$slots["sidebar-child"]?(t(),y(h,{key:0},{default:p(()=>[M(d.$slots,"sidebar-child")]),_:3})):(t(),y(h,{key:1})),m(k,null,{default:p(({Component:w})=>[(t(),y(O(w),null,{"main-header":p(()=>[m(e,{title:l(Y)||l(u)("menu.categories"),icon:l(n).icon||"i-ri-folder-2-line",color:l(n).color},null,8,["title","icon","color"])]),"main-content":p(()=>[_("div",se,b(l(u)("counter.categories",Array.from(l(i).children).length)),1),m(c,{categories:l(i).children},null,8,["categories"]),m(k)]),"main-nav-before":p(()=>[o.value?(t(),y(a,{key:0,class:"post-collapse-container",m:"t-4",w:"full"},{default:p(()=>[m(e,{title:o.value==="Uncategorized"?l(u)("category.uncategorized"):o.value.split("/").join(" / "),icon:"i-ri-folder-open-line"},null,8,["title"]),m(B,{w:"full",m:"b-4",p:"x-20 lt-sm:x-5",posts:C.value},null,8,["posts"])]),_:1})):S("v-if",!0)]),_:2},1024))]),_:1})],64)}}});export{ue as default};
