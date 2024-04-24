import{_ as u}from"./ValaxyMain.vue_vue_type_style_index_0_lang-9HTySS_m.js";import{a as m,p as c,g as p,o as _,c as f,w as o,f as w,i as t,h as r,j as e,q as D,r as s}from"./app-DEw9raa7.js";import"./YunFooter.vue_vue_type_script_setup_true_lang-CYufLakv.js";import"./YunCard.vue_vue_type_script_setup_true_lang-BabP9Q9Y.js";import"./YunPageHeader.vue_vue_type_script_setup_true_lang-B8z3l9zt.js";import"./index-C7yU5XnD.js";const v="/images/RBDHoudini/RBDOffNetwork.png",b="/images/RBDHoudini/BulletZhihu.png",y="/images/RBDHoudini/AssembleNode.png",B="/images/RBDHoudini/Packnodes.png",R="/images/RBDHoudini/RBDSolverNodes.png",x="/images/RBDHoudini/RBDFracturedObjectNet.png",O="/images/RBDHoudini/attFOb.png",P="/images/RBDHoudini/RBDFracturedObjectNetIn.png",H="/images/RBDHoudini/pointbo1.png",j="/images/RBDHoudini/pointbo2.png",z="/images/RBDHoudini/demo1Model.png",k="/images/RBDHoudini/DopNetGeoinput.png",S="/images/RBDHoudini/RBDDopNetW.png",N="/images/RBDHoudini/Dopjg1.mp4",$="/images/RBDHoudini/RigBdSP.png",C="/images/RBDHoudini/RBDWorkFlow.png",F="/images/RBDHoudini/RBD2stBreak.png",V="/images/RBDHoudini/Vis2Break.png",A="/images/RBDHoudini/RBD2breaknode.png",q="/images/RBDHoudini/NodesPackRBD.png",G="/images/RBDHoudini/GlueCons.png",M="/images/RBDHoudini/PackRBDDopNodes.png",T="/images/RBDHoudini/Consnodes.png",W="/images/RBDHoudini/19.mp4",Y=t("strong",null,"这部分是关于OneNote中的笔记部分，由于经常进行更改和升级，现在慢慢同步到博客上",-1),I=t("h4",{id:"rbd与刚体动力学",tabindex:"-1"},[e("RBD与刚体动力学 "),t("a",{class:"header-anchor",href:"#rbd与刚体动力学","aria-label":'Permalink to "RBD与刚体动力学"'},"​")],-1),J=t("hr",null,null,-1),U=t("p",null,[t("strong",null,"Houdini动力学的基本")],-1),Z=t("ul",null,[t("li",null,"动力学模拟具有模拟对象，解算器， 力场， 碰撞， 约束 这三个基本的元素"),t("li",null,"Houdini动态模拟单位默认使用千克， 米， 秒 做为基本单位。"),t("li",null,"跟据模拟的特性，我们可以把多个需要模拟的对象合并进数据流中一同模拟。")],-1),E=t("p",null,[t("strong",null,"DopNetwork中基本的网格")],-1),K=t("p",null,[t("img",{src:v,alt:""}),t("em",null,"官方展示的基本网格")],-1),L=t("h4",{id:"bulletsolver和rbd-solver",tabindex:"-1"},[e("BulletSolver和RBD Solver "),t("a",{class:"header-anchor",href:"#bulletsolver和rbd-solver","aria-label":'Permalink to "BulletSolver和RBD Solver"'},"​")],-1),Q=t("hr",null,null,-1),X=t("p",null,[e("根据"),t("a",{href:"https://zhuanlan.zhihu.com/p/583610419",target:"_blank",rel:"noreferrer"},"https://zhuanlan.zhihu.com/p/583610419"),e(" 中的说法。Bullet Solver是一种更适合大规模群集，破碎的一种解算方式。通过各种的包围盒来包裹集合体，从而达到加速结算的作用。缺点是精度上欠缺，对凹面体的结算不是很好。")],-1),tt=t("figure",null,[t("img",{src:b,alt:"",loading:"lazy",decoding:"async"})],-1),ot=t("p",null,"反之如果是RBD Solver。 这种解算器更适合小规模 精确刚体的模拟，代价是非常的消耗算力。一般在需要高精度碰撞的场景使用。",-1),et=t("figure",null,[t("img",{src:y,alt:"",loading:"lazy",decoding:"async"})],-1),it=t("figure",null,[t("img",{src:B,alt:"",loading:"lazy",decoding:"async"})],-1),st=t("hr",null,null,-1),nt=t("h5",{id:"rbd-solver",tabindex:"-1"},[e("RBD Solver "),t("a",{class:"header-anchor",href:"#rbd-solver","aria-label":'Permalink to "RBD Solver"'},"​")],-1),lt=t("figure",null,[t("img",{src:R,alt:"",loading:"lazy",decoding:"async"})],-1),dt=t("p",null,"RBD Solver的Sop部分非常简单，基本如果不需要建立自定义碰撞体积的话可以直接将几合体导入dop。导入节点如下：",-1),at=t("div",{style:{display:"flex","align-items":"center"}},[t("span",{style:{"margin-left":"4px"}},"●   "),t("svg",{xmlns:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdfracturedobject.svg",width:"25",height:"25"},[t("image",{href:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdfracturedobject.svg",width:"25",height:"25"})]),t("span",{style:{"margin-left":"4px"}},"RBD Fractured Object")],-1),ct=t("div",{style:{display:"flex","align-items":"center"}},[t("span",{style:{"margin-left":"4px"}},"●   "),t("svg",{xmlns:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdobject.svg",width:"25",height:"25"},[t("image",{href:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdobject.svg",width:"25",height:"25"})]),t("span",{style:{"margin-left":"4px"}},"RBD Object")],-1),rt=t("div",{style:{display:"flex","align-items":"center"}},[t("span",{style:{"margin-left":"4px"}},"●   "),t("svg",{xmlns:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdconfigureobject.svg",width:"25",height:"25"},[t("image",{href:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdconfigureobject.svg",width:"25",height:"25"})]),t("span",{style:{"margin-left":"4px"}},"RBD Configure Object")],-1),ht=t("div",{style:{display:"flex","align-items":"center"}},[t("span",{style:{"margin-left":"4px"}},"●   "),t("svg",{xmlns:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdpointobject.svg",width:"25",height:"25"},[t("image",{href:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdpointobject.svg",width:"25",height:"25"})]),t("span",{style:{"margin-left":"4px"}},"RBD Point Object")],-1),gt=t("p",null,"四个导入节点分别对应了不同的情况，酌情使用，首先第一个。",-1),ut=t("h6",null,[t("div",{style:{display:"flex","align-items":"center"}},[t("svg",{xmlns:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdfracturedobject.svg",width:"25",height:"25"},[t("image",{href:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdfracturedobject.svg",width:"25",height:"25"})]),t("span",{style:{"margin-left":"4px"}},"RBD Fractured Object")])],-1),mt=t("p",null,"这个节点允许你将已经破碎的集合体导入进来，当然，为了让解算器知道你的碎块分别是哪些东西，所以需要在sop中根据物体连接性来创建piece*",-1),pt=t("figure",null,[t("img",{src:x,alt:"",loading:"lazy",decoding:"async"})],-1),_t=t("figure",null,[t("img",{src:O,alt:"",loading:"lazy",decoding:"async"})],-1),ft=t("figure",null,[t("img",{src:P,alt:"",loading:"lazy",decoding:"async"})],-1),wt=t("h6",null,[t("div",{style:{display:"flex","align-items":"center"}},[t("svg",{xmlns:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdobject.svg",width:"25",height:"25"},[t("image",{href:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdobject.svg",width:"25",height:"25"})]),t("span",{style:{"margin-left":"4px"}},"RBD Object")])],-1),Dt=t("p",null,"这个是最简单的导入方式，一次导入一个模型，模型将视为一个整体在解算器中模拟。",-1),vt=t("h6",null,[t("div",{style:{display:"flex","align-items":"center"}},[t("svg",{xmlns:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdpointobject.svg",width:"25",height:"25"},[t("image",{href:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdpointobject.svg",width:"25",height:"25"})]),t("span",{style:{"margin-left":"4px"}},"RBD Point Object")])],-1),bt=t("p",null,"RBD点对象节点，将几何体在点云里每个点上做实例，然后一起模拟",-1),yt=t("figure",null,[t("img",{src:H,alt:"",loading:"lazy",decoding:"async"})],-1),Bt=t("figure",null,[t("img",{src:j,alt:"",loading:"lazy",decoding:"async"})],-1),Rt=t("h6",null,[t("div",{style:{display:"flex","align-items":"center"}},[t("svg",{xmlns:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdconfigureobject.svg",width:"25",height:"25"},[t("image",{href:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdconfigureobject.svg",width:"25",height:"25"})]),t("span",{style:{"margin-left":"4px"}},"RBD Configure Object")])],-1),xt=t("p",null,"将其他的RBD对象附加到当前数据流。附加模拟对象来加入数据流，不同之处是它似乎能附加其他DopNetwork中的数据。",-1),Ot=t("hr",null,null,-1),Pt=t("h6",{id:"示例",tabindex:"-1"},[e("示例 "),t("a",{class:"header-anchor",href:"#示例","aria-label":'Permalink to "示例"'},"​")],-1),Ht=t("p",null,[t("img",{src:z,alt:""}),e(" 这个示例是来自于官方的演示部分，官方演示所使用的模型是一个类似杠铃的东西，如上图。")],-1),jt=t("p",null,"然后需求是这个模型需要在碰撞的过程中跟据冲击力的大小和速度来进行自动的破碎。所以破碎的过程需要在DOP中进行。我们需要如下的节点：",-1),zt=t("div",{style:{display:"flex","align-items":"center"}},[t("svg",{xmlns:"https://www.sidefx.com/docs/houdini/icons/DOP/voronoifractureconfigureobject.svg",width:"25",height:"25"},[t("image",{href:"https://www.sidefx.com/docs/houdini/icons/DOP/voronoifractureconfigureobject.svg",width:"25",height:"25"})]),t("span",{style:{"margin-left":"4px"}},"Voronoi Fracture Configure Object")],-1),kt=t("p",null,"这个节点的作用是可以附加适当的数据来让模型进行断裂，一般这些数据是求解器给出的，让模型在受到一定程度的碰撞后自动破碎。",-1),St=t("figure",null,[t("img",{src:k,alt:"",loading:"lazy",decoding:"async"})],-1),Nt=t("p",null,"不过我们看到了在自动破碎之后官方给数据流附加了一个Auto Freeze节点",-1),$t=t("div",{style:{display:"flex","align-items":"center"}},[t("svg",{xmlns:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdautofreeze.svg",width:"25",height:"25"},[t("image",{href:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdautofreeze.svg",width:"25",height:"25"})]),t("span",{style:{"margin-left":"4px"}},"RBD Auto Freeze")],-1),Ct=t("p",null,"这个节点就如同其名字一样，冻结对象。再模拟中其实经常可以发现，本来应该落在地上停住的物体，还在无规则的抖动。这些是因为它虽然停下了，但解算器并不知道，所以还在一直解算这些数据，从而导致物体一直在抖动。为了解决这个问题，这个节点将通过速度和冲击来判断是否应该冻结这个对象，除非此物体再次受到一定程度的冲击。这样很好的节省了性能开销和物体的抖动问题。是一个非常重要的节点。",-1),Ft=t("figure",null,[t("img",{src:S,alt:"",loading:"lazy",decoding:"async"})],-1),Vt=t("p",null,"这是节点图。 模拟的结果如下：",-1),At=t("video",{controls:"",width:"1228",height:"800"},[t("source",{src:N,type:"video/mp4"}),e(" Your browser does not support the video tag. ")],-1),qt=t("hr",null,null,-1),Gt=t("h5",{id:"rbd-solver-1",tabindex:"-1"},[e("RBD Solver "),t("a",{class:"header-anchor",href:"#rbd-solver-1","aria-label":'Permalink to "RBD Solver"'},"​")],-1),Mt=t("p",null,"Bullet Solver 是最常见模拟刚体的方法，用在了各种的解算工具中。在简单的几何体中Bullet的模拟实际上是完全不输给RBD的。而且模拟速度有非常大的提升。不管是大小场景都适用。可谓是用途多多好处多多",-1),Tt=t("p",null,[t("strong",null,"Bullet Solver的解算器如下：")],-1),Wt=t("div",{style:{display:"flex","align-items":"center"}},[t("svg",{xmlns:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdsolver.svg",width:"25",height:"25"},[t("image",{href:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdsolver.svg",width:"25",height:"25"})]),t("span",{style:{"margin-left":"4px"}},"Rigid Body Solver")],-1),Yt=t("div",{style:{display:"flex","align-items":"center"}},[t("svg",{xmlns:"https://www.sidefx.com/docs/houdini/icons/DOP/bulletsolver.svg",width:"25",height:"25"},[t("image",{href:"https://www.sidefx.com/docs/houdini/icons/DOP/bulletsolver.svg",width:"25",height:"25"})]),t("span",{style:{"margin-left":"4px"}},"Bullet Solver")],-1),It=t("p",null,"可以看到依旧有这Rigid Body Solver这个选项，因为大部分的适合其实都是使用的这个节点，这个节点能在Bullet和RBD中自由切换，调试起来比较方便。就不用单独去拉取一个专门的节点了，此外，相比传统的Bullet节点，Rigid Body Solver的输入数量有所不同。分别提供了一个解算前后附加微解算器的输入端。更加灵活",-1),Jt=t("figure",null,[t("img",{src:$,alt:"",loading:"lazy",decoding:"async"})],-1),Ut=t("p",null,"就想上文说过的，在Bullet解算中，我们需要在Sop模块当中进行一定程度的预处理，一般如下过程：",-1),Zt=t("figure",null,[t("img",{src:C,alt:"",loading:"lazy",decoding:"async"})],-1),Et=t("p",null,"前面说到过Bullet解算器接受的是Pack过后的几何体，所以导入的时候使用的节点就会有所不同",-1),Kt=t("div",{style:{display:"flex","align-items":"center"}},[t("svg",{xmlns:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdpackedobject.svg",width:"25",height:"25"},[t("image",{href:"https://www.sidefx.com/docs/houdini/icons/DOP/rbdpackedobject.svg",width:"25",height:"25"})]),t("span",{style:{"margin-left":"4px"}},"RBD Packed Object")],-1),Lt=t("p",null,"这次的导入节点选择了这个，这个节点的作用是把打包几何传入Dop。从上图可以注意到在Sop中还定义了一个约束网格的部分，约束是刚体的模拟中一个必要添加的部分。理论上RBD的模拟也同样可以进行这个过程。但分情况讨论，RBD模拟中是实时根据碰撞的冲击来自动计算了破碎。而bullet解算器在Sop中就处理了破碎。所以模拟时会把所有的几何体都进行碎开。这使得模型会在模拟开始就会碎的七零八落。我们希望的是模型可以根据自身冲击来破碎。这里其实除了用约束网格还需要二次破碎打击点来控制碎块数量。这部分还是有一些复杂。",-1),Qt=t("figure",null,[t("img",{src:F,alt:"",loading:"lazy",decoding:"async"})],-1),Xt=t("p",null,"图中可以看到这里使用了一个metaball辅助二次破碎的节点让点在收到冲击的部分数量变多，这是首次模拟得到的位置数据。",-1),to=t("figure",null,[t("img",{src:V,alt:"",loading:"lazy",decoding:"async"})],-1),oo=t("figure",null,[t("img",{src:A,alt:"",loading:"lazy",decoding:"async"})],-1),eo=t("p",null,"然后跟上图一样分成了两个部分，一个打包过的几何体，和一个约束网格",-1),io=t("figure",null,[t("img",{src:q,alt:"",loading:"lazy",decoding:"async"})],-1),so=t("figure",null,[t("img",{src:G,alt:"",loading:"lazy",decoding:"async"})],-1),no=t("p",null,"随后进入Dop模拟，使用了两个packobject, 一个用来导入冲撞用的刚体，一个导入受击几何体 ，和RBD不一样的地方是这里用到了导入约束网格使用的节点，把约束信息合并进入数据流",-1),lo=t("figure",null,[t("img",{src:M,alt:"",loading:"lazy",decoding:"async"})],-1),ao=t("p",null,"这边也可以看到，约束网格的合并方式，在dop中我们有非常多的约束类型。每个类型也有自己相应的字段控制。所有的字段都可以在Sop网格中进行定义。",-1),co=t("figure",null,[t("img",{src:T,alt:"",loading:"lazy",decoding:"async"})],-1),ro=t("p",null,"最终都合并进 Constrain Network节点。",-1),ho=t("video",{controls:"",width:"1228",height:"800"},[t("source",{src:W,type:"video/mp4"}),e(" Your browser does not support the video tag. ")],-1),go=t("p",null,"最终可以清楚的看到有一部分因为约束的关系是没有完全破碎的。同理所有的建筑物，大楼等各种刚体。都可以灵活的用这个约束。",-1),uo=t("hr",null,null,-1),mo=t("h4",{id:"结束",tabindex:"-1"},[e("结束！！ "),t("a",{class:"header-anchor",href:"#结束","aria-label":'Permalink to "结束！！"'},"​")],-1),po=t("p",null,"到这里为止就是RBD刚体部分的全部笔记。之后会逐步跟据实际使用的各种情况来更新一些细节啦！！！",-1),xo={__name:"HoudiniRBD",setup(_o,{expose:h}){const n=JSON.parse('{"title":"Houdini RBD使用笔记","description":"","frontmatter":{"title":"Houdini RBD使用笔记","date":"2024-4-30","tags":["Houdini"],"categories":["Houdini"]},"headers":[],"relativePath":"pages/posts/Houdini/HoudiniRBD.md","path":"/home/runner/work/AfterDuang.github.io/AfterDuang.github.io/pages/posts/Houdini/HoudiniRBD.md","lastUpdated":1713964229000}'),d=m(),l=n.frontmatter||{};return d.meta.frontmatter=Object.assign(d.meta.frontmatter||{},n.frontmatter||{}),c("pageData",n),c("valaxy:frontmatter",l),globalThis.$frontmatter=l,h({frontmatter:{title:"Houdini RBD使用笔记",date:"2024-4-30",tags:["Houdini"],categories:["Houdini"]}}),(i,wo)=>{const a=p("font"),g=u;return _(),f(g,{frontmatter:w(l)},{"main-content-md":o(()=>[t("blockquote",null,[t("p",null,[Y,r(a,{color:"#c00000",style:{"font-size":"14px"}},{default:o(()=>[e("此文章更新于2024.04.23")]),_:1})])]),I,J,U,Z,E,K,D(" more "),L,Q,X,tt,ot,t("blockquote",null,[t("p",null,[t("strong",null,[r(a,{style:{"font-size":"14px"}},{default:o(()=>[e("PS: 如果使用Pack带打包刚体对象，这种方式对RBD Solver不起效果。之能对Bullet Solver起作用")]),_:1})])])]),et,it,st,nt,lt,dt,at,ct,rt,ht,gt,ut,mt,pt,_t,ft,wt,Dt,vt,bt,yt,Bt,Rt,xt,Ot,Pt,Ht,jt,zt,kt,St,Nt,$t,Ct,Ft,Vt,At,qt,Gt,Mt,Tt,Wt,Yt,It,Jt,Ut,Zt,Et,Kt,Lt,Qt,Xt,to,oo,eo,io,so,no,lo,ao,co,ro,ho,go,uo,mo,po]),"main-header":o(()=>[s(i.$slots,"main-header")]),"main-header-after":o(()=>[s(i.$slots,"main-header-after")]),"main-nav":o(()=>[s(i.$slots,"main-nav")]),"main-content":o(()=>[s(i.$slots,"main-content")]),"main-content-after":o(()=>[s(i.$slots,"main-content-after")]),"main-nav-before":o(()=>[s(i.$slots,"main-nav-before")]),"main-nav-after":o(()=>[s(i.$slots,"main-nav-after")]),comment:o(()=>[s(i.$slots,"comment")]),footer:o(()=>[s(i.$slots,"footer")]),aside:o(()=>[s(i.$slots,"aside")]),"aside-custom":o(()=>[s(i.$slots,"aside-custom")]),default:o(()=>[s(i.$slots,"default")]),_:3},8,["frontmatter"])}}};export{xo as default};