import{d as b,v as x,aw as C,A as w,L as T,m as f,ax as i,o as s,e as r,f as e,i as o,t as a,q as l,j as n,F as V,s as d,ay as F,r as $}from"./app-DEw9raa7.js";const B={class:"va-footer p-4 text-$va-c-text-light",text:"center sm"},H={key:0,class:"beian",m:"y-2"},L={href:"https://beian.miit.gov.cn/",target:"_blank",rel:"noopener"},N={class:"copyright flex justify-center items-center gap-2",p:"1"},S=["href","title"],Y={key:1,class:"powered",m:"2"},j=["innerHTML"],z=["href","title"],q=b({__name:"YunFooter",setup(D){const{t:u}=x(),h=C(),v=w(),t=T(),p=new Date().getFullYear(),g=f(()=>p===t.value.footer.since),y=f(()=>u("footer.powered",[`<a href="${i.repository.url}" target="_blank" rel="noopener">Valaxy</a> v${i.version}`])),c=f(()=>t.value.footer.icon||{url:i.repository.url,name:"i-ri-cloud-line",title:i.name});return(k,I)=>{var m,_;return s(),r("footer",B,[(m=e(t).footer.beian)!=null&&m.enable&&e(t).footer.beian.icp?(s(),r("div",H,[o("a",L,a(e(t).footer.beian.icp),1)])):l("v-if",!0),o("div",N,[o("span",null,[n(" © "),g.value?l("v-if",!0):(s(),r(V,{key:0},[n(a(e(t).footer.since)+" - ",1)],64)),n(" "+a(e(p)),1)]),(_=e(t).footer.icon)!=null&&_.enable?(s(),r("a",{key:0,class:d(["inline-flex",e(t).footer.icon.animated?"animate-pulse":""]),href:c.value.url,target:"_blank",title:c.value.title},[o("div",{class:d(c.value.name)},null,2)],10,S)):l("v-if",!0),o("span",null,a(e(v).author.name),1)]),e(t).footer.powered?(s(),r("div",Y,[o("span",{innerHTML:y.value},null,8,j),n(" | "),o("span",null,[n(a(e(u)("footer.theme"))+" - ",1),o("a",{href:e(t).pkg.repository.url,title:e(t).pkg.name,target:"_blank"},a(F(e(h).theme)),9,z),n(" v"+a(e(t).pkg.version),1)])])):l("v-if",!0),$(k.$slots,"default")])}}});export{q as _};