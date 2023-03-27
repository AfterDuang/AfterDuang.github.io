---
title: 推荐的网站
date: 2019-06-21 13:06:06
keywords: 链接
comments: true
links:
  - url: https://segmentfault.com/markdown#articleHeader11
    avatar: http://api.btstu.cn/sjtx/api.php
    name: Segmentfault
    blog: Segmentfault
    desc: MarkDown语法手册
    color: "#ED2903" # 代表色
    email: # 非必须
  - url: https://helpx.adobe.com/cn/after-effects/using/expression-language-reference.ug.html#property_attributes_and_methods_expression_reference
    avatar: http://api.btstu.cn/sjtx/api.php?lx=c2&format=images
    name: Adobe表达式手册
    blog: Adobe表达式手册
    desc: Adobe表达式参考
    color: "#0078e7" 
  - url: https://sketchfab.com/feed
    avatar: http://api.btstu.cn/sjtx/api.php?lx=c1&format=images
    name: Skerchfab
    blog: Skerchfab
    desc: 一个3D模型下载网站
    color: "#ED2903" 
  - url: https://picrew.me/
    avatar: http://api.btstu.cn/sjtx/api.php?lx=c6&format=images
    name: Picrew
    blog: Picrew
    desc: 类似换装随机制作头像的网站
    color: "#FF9000" 
  - url: https://colorhunt.co/
    avatar: http://api.btstu.cn/sjtx/api.php?lx=c5&format=images
    name: Colorhunt
    blog: ColorHunt
    desc: 配色网站
    color: "#786466" 
  - url: https://developer.mozilla.org/zh-CN/docs/Learn
    avatar: http://api.btstu.cn/sjtx/api.php?lx=c4&format=images
    name: MDN_WEB_DOCS
    blog: MDN_WEB_DOCS
    desc: WEB网页开发手册
    color: "#8B9B2F" 
  - url: http://www.cyc2018.xyz/
    avatar: http://api.btstu.cn/sjtx/api.php?lx=c7&format=images
    name: CS_Notes
    blog: CS_Notes
    desc: Cyc的学习手册
    color: "#8B9B2F"
random: false
---

<YunLinks :links="frontmatter.links" :random="frontmatter.random" />



##### <b>这里用到了一个随机生成头像的API</b>
---

请求地址：http://api.btstu.cn/sjtx/api.php
请求实例：http://api.btstu.cn/sjtx/api.php?lx=c1&format=images

---

|  名称   | 必填  | 类型 |  说明 |
|  ----  | ----  | ---- | ---- |
| method  | 否 | string	 | 输出壁纸端[mobile(手机端),pc（电脑端）,zsy（手机电脑自动判断）]默认为pc |
| lx  | 否 | string |  输出头像类型 a1（男头）b1（女头）c1（动漫头像）c2（动漫女头）c3（动漫男头）默认为c1 |
| 	format  | 否 | string | 输出壁纸格式[json images]默认为images |

>ref : https://api.btstu.cn/