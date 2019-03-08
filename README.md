### net云音乐小程序踩坑日记

**接口调用**:

+ 线上小程序的ajax小程序调用必须是https,不能是本地localhost或ip访问；所以必须准备一个vps+域名





**开发阶段**: 

+ 开发阶段可以右上角“详情-->不校验合法域名、web-view（业务域名）、TLS版本以及HTTPS证书”，进行本地调试
+ 开发阶段在手机预览要想访问接口，必须开启调试模式，否则无法调用接口

**开发技巧**
+ **控制局部滚动**： 在app.wxss中添加page{overflow-y: hidden;},局部使用<scroll-view>组件并指定高度即可
+ **页面控制**： 每一个view组件应该添加一个box-sing:border-box属性，不然padding会导致view溢出屏幕