import{d,k as m,o as e,e as a,i as t,F as p,l as f,n as u,t as r,f as h,_ as g}from"./app-DEw9raa7.js";import{o as k}from"./index-C7yU5XnD.js";const v={class:"links"},y={class:"link-items"},b=["href","title"],x={class:"link-left"},B=["src","alt"],I={class:"link-info",m:"l-2"},E={class:"link-blog",font:"serif black"},w={class:"link-desc"},z=d({__name:"YunLinks",props:{links:{},random:{type:Boolean},errorImg:{}},setup(l){const o=l,{data:i}=m(o.links,o.random);function c(n){k(n,o.errorImg)}return(n,D)=>(e(),a("div",v,[t("ul",y,[(e(!0),a(p,null,f(h(i),(s,_)=>(e(),a("li",{key:_,class:"link-item",style:u(`--primary-color: ${s.color}`)},[t("a",{class:"link-url",p:"x-4 y-2",href:s.url,title:s.name,alt:"portrait",rel:"friend",target:"_blank"},[t("div",x,[t("img",{class:"link-avatar",width:"64",height:"64",w:"16",h:"16",loading:"lazy",src:s.avatar,alt:s.name,onError:c},null,40,B)]),t("div",I,[t("div",E,r(s.blog),1),t("div",w,r(s.desc),1)])],8,b)],4))),128))])]))}}),S=g(z,[["__scopeId","data-v-64ff5004"]]);export{S as _};