import{d as D,v as w,B as v,Y as B,m as C,g as b,o as s,e as a,i as o,t as c,f as h,F as _,l as m,aD as g,av as f,q as N,h as L,w as V,j as E}from"./app-DEw9raa7.js";const F={class:"post-collapse px-10 lt-sm:px-5",relative:""},I={w:"full",text:"center",class:"yun-text-light",p:"2"},M={class:"post-collapse-action",text:"center"},R={key:0,"i-ri-sort-desc":""},$={key:1,"i-ri-sort-asc":""},j={class:"collection-title","m-0":"",relative:""},q=["id"],P={class:"post-header",flex:"","items-center":"",relative:""},S={class:"post-meta"},T={key:0,class:"post-time",font:"mono",opacity:"80"},z={class:"post-title","inline-flex":"","items-center":"",font:"serif black"},G=D({__name:"YunPostCollapse",props:{posts:{}},setup(y){const p=y,{t:x}=w(),d=v([]),n=v({});B(()=>p.posts,()=>{n.value={},d.value=[],p.posts.forEach(t=>{if(!(t.hide&&t.hide!=="index")&&t.date){const e=Number.parseInt(f(t.date,"YYYY"));n.value[e]?n.value[e].push(t):(d.value.push(e),n.value[e]=[t])}})},{immediate:!0});const r=v(!0),k=C(()=>{const e=d.value.sort((u,i)=>i-u);return r.value?e:[...e].reverse()});return(t,e)=>{const u=b("RouterLink");return s(),a("div",F,[o("div",I,c(h(x)("counter.archives",t.posts.length)),1),o("div",M,[o("button",{class:"yun-icon-btn shadow hover:shadow-md",onClick:e[0]||(e[0]=i=>r.value=!r.value)},[r.value?(s(),a("div",R)):(s(),a("div",$))])]),(s(!0),a(_,null,m(k.value,i=>(s(),a("div",{key:i,m:"b-6"},[o("div",j,[o("h2",{id:`#archive-year-${i}`,class:"archive-year",text:"4xl",p:"y-2"},c(i),9,q)]),(s(!0),a(_,null,m(h(g)(n.value[i],r.value),(l,Y)=>(s(),a("article",{key:Y,class:"post-item",relative:""},[o("header",P,[o("div",S,[l.date?(s(),a("time",T,c(h(f)(l.date,"MM-DD")),1)):N("v-if",!0)]),o("h2",z,[L(u,{to:l.path||"",class:"post-title-link"},{default:V(()=>[E(c(l.title),1)]),_:2},1032,["to"])])])]))),128))]))),128))])}}});export{G as _};