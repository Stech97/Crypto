(this["webpackJsonpcrypto-react"]=this["webpackJsonpcrypto-react"]||[]).push([[0],{103:function(e,a,t){e.exports=t(216)},175:function(e,a,t){},213:function(e,a,t){},214:function(e,a,t){},216:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(46),i=t.n(c),l=t(20),o=t(10),s=t(219),m=t(36),u=t(97),d=t.n(u);var p={visibility:!0,placeholder:"maxmustter@hotmail.com"},h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"COMINGSOON_ERROR":case"COMINGSOON_SUCCESS":return Object(m.a)(Object(m.a)({},e),{},{visibility:a.payload,placeholder:a.placeholder});default:return e}},E=t(98),g=Object(o.c)({form:s.a,ComingSoon:h,routing:E.routerReducer}),b=t(100),v=t.n(b),f=t(101),N=Object(o.d)(g,Object(o.a)(f.a,v.a)),y=t(3),O=t(4),w=t(6),j=t(5),k=t(102),x=t(11),C=(t(175),t(218)),S=t(217),T=function(e){var a=e.input,t=e.placeholder,n=e.className,c=e.type;return r.a.createElement("input",Object.assign({},a,{className:n,placeholder:t,type:c}))},D=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){var e=this,a=this.props,t=a.handleSubmit,n=a.submitting,c=(a.reset,a.sendError),i=a.placeholder,l=function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())};return r.a.createElement("form",{className:c?"comingsoon-form-box":"none",onSubmit:t((function(a){var t;console.log(a.email,l(a.email)),l(a.email)?e.props.dispatch((function(e){var a={message_html:t};fetch("http://defima.io:88/api/Email/AddEmail",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({Email:"test"+t})}).then((function(t){t.ok?d.a.send("gmail","test",a,"user_jIExVfMX1Oha7HaXMmsBs").then((function(a){console.log("Email successfully sent!"),e({type:"COMINGSOON_SUCCESS",payload:!1,placeholder:"maxmustter@hotmail.com"})})).catch((function(a){console.error("Oh well, you failed. Here some thoughts on the error that occured:",a),e({type:"COMINGSOON_ERROR",payload:!0,placeholder:"Something went wrong. Try again later."})})):alert(t.e)})).catch((function(a){console.log(a),e({type:"COMINGSOON_ERROR",payload:!0,placeholder:"Something went wrong. Try again later."})}))}),a.email):e.props.dispatch((function(e){e({type:"COMINGSOON_ERROR",payload:!0,placeholder:"Wrong email. Please try again."})})),e.props.reset()}))},r.a.createElement(C.a,{component:T,name:"email",className:"commingsoon-input-text",type:"text",placeholder:i}),r.a.createElement("button",{type:"submit",disabled:n,className:"comingsoon-input-button"},"Notify Me"))}}]),t}(n.Component),F=Object(S.a)({form:"TESTFORM"})(D),I=function(){return r.a.createElement("div",{className:"comingsoon-logobox"},r.a.createElement("img",{src:"img/defimaLogo.png",alt:"defimaLogo"}))},W=function(){return r.a.createElement("div",{className:"comingsoon-h1-box"},r.a.createElement("h1",null,"We Will Launch Soon."))},A=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){var e=this.props.ComingSoon;return console.log(e.visibility),r.a.createElement("section",{className:"comingsoon"},r.a.createElement("div",{className:"comingsoon-wrapper"},r.a.createElement("div",{className:"comingsoon-grid-container"},r.a.createElement(I,null),r.a.createElement(W,null),r.a.createElement("div",{className:e.visibility?"comingsoon-h2-box":"none"},r.a.createElement("h2",null,"Subscribe to get notification as soon as we launch.")),r.a.createElement(F,{updateView:e.updateView,sendError:e.visibility,placeholder:e.placeholder}),r.a.createElement("div",{className:e.visibility?"none":"comingsoon-thanks-box"},r.a.createElement("p",null,"Thank you for your subscription.")))))}}]),t}(n.Component),R=Object(l.b)((function(e){return console.log(e),{ComingSoon:e.ComingSoon}}))(A),L=(t(213),function(){return r.a.createElement("div",{className:"top-logo-box"},r.a.createElement("img",{src:"./img/logo.png",srcSet:"./img/logo@2x.png 2x, ./img/logo@3x.png 3x",alt:"Logo"}))}),M=function(){return r.a.createElement("div",{className:"top-nav-box"},r.a.createElement("div",{className:"nav-bar nav-about"},r.a.createElement("a",{href:"#"},"About")),r.a.createElement("div",{className:"nav-bar nav-team"},r.a.createElement("a",{href:"#"},"Team")),r.a.createElement("div",{className:"nav-bar nav-blog"},r.a.createElement("a",{href:"#"},"Blog")),r.a.createElement("div",{className:"nav-bar nav-login"},r.a.createElement("a",{href:"#"},"Login")),r.a.createElement("div",{className:"nav-bar nav-signup"},r.a.createElement("a",{href:"#",className:"button-main-inversed button-signup"},"Sign Up")))},P=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("header",null,r.a.createElement("div",{className:"header-grid-container"},r.a.createElement(L,null),r.a.createElement(M,null)))}}]),t}(n.Component),U=function(){return r.a.createElement("div",{className:"homescreen-header"},r.a.createElement("h1",null,"The most profitable and secure way to get cashflow from the DeFi markets."))},_=function(){return r.a.createElement("a",{href:"#",className:"button-main button-getstarted homescreen-button"},"Get started")},B=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("section",{className:"homescreen"},r.a.createElement("div",{className:"wrapper"},r.a.createElement("div",{className:"homescreen-grid-container"},r.a.createElement(U,null),r.a.createElement(_,null))))}}]),t}(n.Component),G=function(){return r.a.createElement("div",{className:"ourmission-header"},r.a.createElement("h1",null,"Our Mission"),r.a.createElement("h2",null,"The World Of Financial Freedom"))},q=function(){return r.a.createElement("div",{className:"ourmission-text"},r.a.createElement("p",null,"Our goal is to find the most profitable and secure way to participate in the DeFi markets. In order to get the most profit out of all possibilities of decentralized finance, it is of utmost importance to have huge investments and useful knowledge."),r.a.createElement("p",null,"So, the reason why we developed the DEFIMA platform is to give investors an easy accessibility to invest in DeFi products without having a lot of knowledge nor a big budget."),r.a.createElement("p",null,"All of the investor\u2019s money will be bundled in a big pool. With this pool, we can reach higher profits, better security and long-term investments."),r.a.createElement("p",null,"With this advantage, we can reach up to 11% on your investment each month. This wouldn\u2019t be possible, if everyone is on his own."),r.a.createElement("p",null,"Our mission is to give everyone an easy way to join the very profitable DeFi lending market."))},J=function(){return r.a.createElement("div",{className:"ourmission-icons"},r.a.createElement("div",{className:"ourmission-iconbox-1"},r.a.createElement("img",{className:"ourmission-icon-image-1",src:"img/ourmission-icon-1.png",alt:"ourmission-icon-1",srcSet:"img/ourmission-icon-1@2x.png 2x, img/ourmission-icon-1@3x.png 3x"})),r.a.createElement("div",{className:"ourmission-iconbox-2"},r.a.createElement("img",{className:"ourmission-icon-image-2",src:"img/ourmission-icon-2.png",alt:"ourmission-icon-2",srcSet:"img/ourmission-icon-2@2x.png 2x, img/ourmission-icon-2@3x.png 3x"})),r.a.createElement("div",{className:"ourmission-iconbox-3"},r.a.createElement("img",{className:"ourmission-icon-image-3",src:"img/ourmission-icon-3.png",alt:"ourmission-icon-3",srcSet:"img/ourmission-icon-3@2x.png 2x, img/ourmission-icon-3@3x.png 3x"})),r.a.createElement("div",{className:"ourmission-iconbox-4"},r.a.createElement("img",{className:"ourmission-icon-image-4",src:"img/ourmission-icon-4.png",alt:"ourmission-icon-4",srcSet:"img/ourmission-icon-4@2x.png 2x, img/ourmission-icon-4@3x.png 3x"})))},Y=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("section",{className:"ourmission"},r.a.createElement("div",{className:"wrapper"},r.a.createElement(G,null),r.a.createElement(q,null),r.a.createElement(J,null)))}}]),t}(n.Component),H=function(){return r.a.createElement("div",{className:"howitworks-header"},r.a.createElement("h1",null,"How It Works"),r.a.createElement("h2",null,"Business model"))},$=function(){return r.a.createElement("div",{className:"howitworks-scheme"},r.a.createElement("img",{src:"img/howitworks_scheme.png",alt:"howitworks_scheme"}))},z=[{id:1,header:"Investor",text:"The Investor deposits and buys a product."},{id:2,header:"Defima Pool",text:"Every Investor is a small part of the Defima pool. With this pool, we are able to get the best profits in the market."},{id:3,header:"Defima Oracle",text:"Together with Artificial Intelligence, our finance experts invest in safe and highly profitable investment opportunities in the DeFi market."},{id:4,header:"DeFi Markets",text:"We close the positions and collect all profits from the DeFi markets every week. We pay all our investors and keep a small amount as a backup in the Defima pool."}],V=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){var e=this.props.data.map((function(e){return r.a.createElement(r.a.Fragment,{key:e.id},r.a.createElement("div",{className:"howitworks-image-"+e.id},r.a.createElement("img",{src:"img/howitworks-icon-"+e.id+".png",alt:"howitworks-icon-"+e.id})),r.a.createElement("div",{className:"howitworks-caption-"+e.id},r.a.createElement("h3",null,e.header),r.a.createElement("p",null,e.text)))}));return r.a.createElement(r.a.Fragment,null,e)}}]),t}(n.Component),X=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("section",{className:"howitworks"},r.a.createElement("div",{className:"howitworks-wrapper wrapper"},r.a.createElement(H,null),r.a.createElement($,null),r.a.createElement(V,{data:z})))}}]),t}(n.Component),Z=function(){return r.a.createElement("div",{className:"portfolio-header"},r.a.createElement("h1",null,"Portfolio"),r.a.createElement("h2",null,"Investment Products"))},K=[{id:1,header:"Small",percent:6,investment:100,level:2},{id:2,header:"Medium",percent:8,investment:5e3,level:4},{id:3,header:"Large",percent:11,investment:1e4,level:7}],Q=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){var e=this.props.data.map((function(e){return r.a.createElement("div",{key:e.id,className:"portfolio-product-"+e.id},r.a.createElement("div",{className:"portfolio-product-header"},r.a.createElement("h3",null,e.header)),r.a.createElement("p",null,"Monthly Profit of up to ",e.percent,"% month"),r.a.createElement("p",null,"Starting from $",e.investment),r.a.createElement("p",null,"Career commission qualified Level 1-",e.level),r.a.createElement("a",{className:"porfolio-product-button",href:"#"},"Invest"))}));return r.a.createElement("div",{className:"portfolio-product"},e)}}]),t}(n.Component),ee=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("section",{className:"portfolio"},r.a.createElement("div",{className:"wrapper portfolio-wrapper"},r.a.createElement(Z,null),r.a.createElement(Q,{data:K})))}}]),t}(n.Component),ae=function(){return r.a.createElement("div",{className:"career-header"},r.a.createElement("h1",null,"Career Team"),r.a.createElement("h2",null,"Commission Plan"))},te=function(){return r.a.createElement("div",{className:"career-scheme"},r.a.createElement("img",{src:"img/career-strips.png",srcSet:"img/career-strips@2x.png 2x, img/career-strips@3x.png 3x",alt:"career-strips"}))},ne=function(){return r.a.createElement("div",{className:"career-text"},r.a.createElement("p",null,"Commissions are a part of the weekly earnings of partners in your downline."),r.a.createElement("p",null,"The exact percentage depends on which level of your downline a partner is seated and on which product you choose."))},re=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("section",{className:"career"},r.a.createElement("div",{className:"wrapper career-wrapper"},r.a.createElement(ae,null),r.a.createElement(te,null),r.a.createElement(ne,null)))}}]),t}(n.Component),ce=function(){return r.a.createElement("div",{className:"defimatoken-image"},r.a.createElement("img",{src:"img/defimacoin.png",srcSet:"img/defimacoin@2x.png 2x, img/defimacoin@3x.png 3x",alt:"defima coin"}))},ie=function(){return r.a.createElement("div",{className:"defimatoken-content-header"},r.a.createElement("h1",null,"Defima Token"))},le=function(){return r.a.createElement("div",{className:"defimatoken-content-text"},r.a.createElement("p",null,"Defima Token is a cryptocurrency token and operates on the Ethereum platform. We developed the token in order to get more financial power to build the platform."),r.a.createElement("p",null,"All profits and commission earnings will be paid out in our defimatoken. You can, of course, always exchange the token to Bitcoin or USD, and withdraw the money."),r.a.createElement("p",null,"For now, the token is only reserved for all Defima investors, and you can only get defimatoken by profits or commissions from Defima products. One token is currently worth 1 USD."),r.a.createElement("p",null,"As part of its strategy plan, Defima plans to make a public sale (ICO) in the near future. When this happens, we expect that the token will double or triple its price. We recommend all Defima investors to hold as many defimatoken as possible in order to benefit from the public sale."))},oe=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("section",{className:"defimatoken"},r.a.createElement("div",{className:"defimatoken-wrapper"},r.a.createElement(ce,null),r.a.createElement("div",{className:"defimatoken-content"},r.a.createElement(ie,null),r.a.createElement(le,null))))}}]),t}(n.Component),se=function(){return r.a.createElement("div",{className:"ourteam-header"},r.a.createElement("h1",null,"About Us"),r.a.createElement("h2",null,"Employee Spotlight"))},me=[{id:1,name:"Thomas",post:"CEO & Founder"},{id:2,name:"Scarlett",post:"CEO & Founder"},{id:3,name:"Cagdas",post:"Brand Ambassador"}],ue=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){var e=this.props.data.map((function(e){return r.a.createElement(r.a.Fragment,{key:e.id},r.a.createElement("div",{className:"ourteam-member-photo-"+e.id},r.a.createElement("img",{src:"img/member-photo-"+e.id+".png",alt:"member-photo-"+e.id})),r.a.createElement("div",{className:"ourteam-member-caption-"+e.id},r.a.createElement("div",{className:"ourteam-member-name"},r.a.createElement("p",null,e.name)),r.a.createElement("div",{className:"ourteam-member-post"},r.a.createElement("p",null,e.post)),r.a.createElement("div",{className:"ourteam-member-mailbutton"},r.a.createElement("a",{href:"#"},r.a.createElement("i",{className:"fas fa-envelope"})))))}));return r.a.createElement(r.a.Fragment,null,e)}}]),t}(n.Component),de=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("section",{className:"ourteam"},r.a.createElement("div",{className:"wrapper ourteam-wrapper"},r.a.createElement(se,null),r.a.createElement("div",{className:"ourteam-member"},r.a.createElement(ue,{data:me}))))}}]),t}(n.Component),pe=function(){return r.a.createElement("div",{className:"joinus-header"},r.a.createElement("h1",null,"Join the Defima Platform Now"))},he=function(){return r.a.createElement("div",{className:"joinus-content"},r.a.createElement("div",{className:"joinus-content-point-1"},r.a.createElement("div",{className:"joinus-content-check"},r.a.createElement("i",{className:"far fa-check-circle"})),r.a.createElement("div",{className:"joinus-content-text"},r.a.createElement("p",null,"Starting from ",r.a.createElement("span",null,"$100")))),r.a.createElement("div",{className:"joinus-content-point-2"},r.a.createElement("div",{className:"joinus-content-check"},r.a.createElement("i",{className:"far fa-check-circle"})),r.a.createElement("div",{className:"joinus-content-text"},r.a.createElement("p",null,"Earn up to ",r.a.createElement("span",null,"132%")," APY"))),r.a.createElement("div",{className:"joinus-content-point-3"},r.a.createElement("div",{className:"joinus-content-check"},r.a.createElement("i",{className:"far fa-check-circle"})),r.a.createElement("div",{className:"joinus-content-text"},r.a.createElement("p",null,"Affiliate commission in ",r.a.createElement("span",null,"1-7")," Levels"))))},Ee=function(){return r.a.createElement("div",{className:"joinus-buttons"},r.a.createElement("div",{className:"joinus-buttons-getstarted"},r.a.createElement("a",{href:"#"},"Get started")),r.a.createElement("div",{className:"joinus-buttons-download"},r.a.createElement("a",{href:"#"},"Download presentation")))},ge=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("section",{className:"joinus"},r.a.createElement("div",{className:"wrapper joinus-wrapper"},r.a.createElement(pe,null),r.a.createElement(he,null),r.a.createElement(Ee,null)))}}]),t}(n.Component),be=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(P,null),r.a.createElement(B,null),r.a.createElement(Y,null),r.a.createElement(X,null),r.a.createElement(ee,null),r.a.createElement(re,null),r.a.createElement(oe,null),r.a.createElement(de,null),r.a.createElement(ge,null))}}]),t}(n.Component),ve=(t(95),function(){return r.a.createElement("div",{className:"top-logo-box"},r.a.createElement("img",{src:"img/logo.png",srcSet:"img/logo@2x.png 2x, img/logo@3x.png 3x",alt:"Logo"}))}),fe=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"top-nav-box"},r.a.createElement("div",{className:"nav-bar nav-about"},r.a.createElement("a",{href:!0},"About")),r.a.createElement("div",{className:"nav-bar nav-team"},r.a.createElement("a",{href:!0},"Team")),r.a.createElement("div",{className:"nav-bar nav-blog"},r.a.createElement("a",{href:!0},"Blog")),r.a.createElement("div",{className:"nav-bar nav-login"},r.a.createElement("a",{href:!0},"Login")),r.a.createElement("div",{className:"nav-bar nav-signup"},r.a.createElement("a",{href:"#",className:"button-main-inversed button-signup"},"Sign Up")))}}]),t}(n.Component),Ne=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("header",null,r.a.createElement("div",{className:"header-grid-container"},r.a.createElement(ve,null),r.a.createElement(fe,null)))}}]),t}(n.Component),ye=function(e){var a=e.input,t=e.placeholder,n=e.className,c=e.type;return r.a.createElement("input",Object.assign({},a,{className:n,placeholder:t,type:c}))},Oe=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){var e=this.props,a=e.handleSubmit,t=(e.reset,e.pristine),n=e.submitting;return r.a.createElement("form",{className:"login-form",onSubmit:a((function(e){fetch("https://api.ipify.org?format=json",{mode:"cors"}).then((function(e){return e.json()})).then((function(e){return fetch("http://ip-api.com/json/"+e.ip+"?fields=24593")})).then((function(e){return e.json()})).then((function(e){return alert("You are from "+e.country+". Your IP "+e.query),fetch("http://84.201.132.112/api/Identity/token",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"admin",password:"admin",IP:e.query,Country:e.country})})})).then((function(e){e.ok?alert("You succesfully logged in!"):alert("Wrong username or password!")}))}))},r.a.createElement(C.a,{component:ye,name:"username",className:"login-form-user",type:"text",placeholder:"Username"}),r.a.createElement(C.a,{component:ye,name:"password",className:"login-form-password",type:"password",placeholder:"Password"}),r.a.createElement("button",{className:"login-form-button",type:"submit",disabled:t||n},"Login"))}}]),t}(n.Component),we=Object(S.a)({form:"LoginForm"})(Oe),je=function(){return r.a.createElement("div",{className:"login-header"},r.a.createElement("h1",null,"Login to defima"))},ke=function(){return r.a.createElement("div",{className:"login-forgot"},r.a.createElement("p",null,"Forgot your password? ",r.a.createElement("a",{href:"#"},"Restore it.")))},xe=function(){return r.a.createElement("div",{className:"login-footer"},r.a.createElement("a",{href:"#"},"Terms of use"),r.a.createElement("a",{href:"#"},"Privacy policy"))},Ce=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("section",{className:"login"},r.a.createElement("div",{className:"login-wrapper wrapper"},r.a.createElement(je,null),r.a.createElement(we,null),r.a.createElement(ke,null),r.a.createElement(xe,null)))}}]),t}(n.Component),Se=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement(n.Fragment,null,r.a.createElement(Ne,null),r.a.createElement(Ce,null))}}]),t}(n.Component),Te=t(47),De=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"dash-header"},r.a.createElement("div",{className:"dash-header-logo"},r.a.createElement("img",{src:"img/logo.png",alt:"logo"})),r.a.createElement("div",{className:"dash-header-user"},r.a.createElement("div",{className:"dash-header-user-icon"},r.a.createElement("img",{src:"img/user-icon.png",alt:"usericon"})),r.a.createElement("div",{className:"dash-header-user-name"},r.a.createElement("h2",null,"Roland")),r.a.createElement("div",{className:"dash-header-user-arrow"},r.a.createElement("img",{src:"img/arrow-down.png",alt:"arrow-down"}))))}}]),t}(n.Component),Fe=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){var e=this.props;e.handleClick,e.isClose;return r.a.createElement("div",{className:this.props.isClosed?"sidebar-closed":"sidebar"},r.a.createElement("div",{className:"sidebar-burger"},r.a.createElement("button",{onClick:this.props.onClick},r.a.createElement("img",{src:"img/burger-menu.png",alt:"burger-menu"}))),r.a.createElement("div",{className:"sidebar-dash sidebar-bar sidebar-bar-selected"},r.a.createElement("div",{className:"sidebar-bar-icon"},r.a.createElement("img",{src:"img/icon-dashboards.png",alt:"icon-dashboards"})),r.a.createElement("div",{className:"sidebar-bar-text"},r.a.createElement("h3",null,"Dashboards")),r.a.createElement("div",{className:"sidebar-bar-arrow"},r.a.createElement("img",{src:"img/arrow-right.png",alt:"arrow-right"}))),r.a.createElement("div",{className:"sidebar-investment sidebar-bar"},r.a.createElement("div",{className:"sidebar-bar-icon"},r.a.createElement("img",{src:"img/icon-investment.png",alt:"icon-investment"})),r.a.createElement("div",{className:"sidebar-bar-text"},r.a.createElement("h3",null,"Investment")),r.a.createElement("div",{className:"sidebar-bar-arrow"},r.a.createElement("img",{src:"img/arrow-right.png",alt:"arrow-right"}))),r.a.createElement("div",{className:"sidebar-team sidebar-bar"},r.a.createElement("div",{className:"sidebar-bar-icon"},r.a.createElement("img",{src:"img/icon-team.png",alt:"icon-team"})),r.a.createElement("div",{className:"sidebar-bar-text"},r.a.createElement("h3",null,"Team")),r.a.createElement("div",{className:"sidebar-bar-arrow"},r.a.createElement("img",{src:"img/arrow-right.png",alt:"arrow-right"}))),r.a.createElement("div",{className:"sidebar-marketing sidebar-bar"},r.a.createElement("div",{className:"sidebar-bar-icon"},r.a.createElement("img",{src:"img/icon-marketing.png",alt:"icon-marketing"})),r.a.createElement("div",{className:"sidebar-bar-text"},r.a.createElement("h3",null,"Marketing")),r.a.createElement("div",{className:"sidebar-bar-arrow"},r.a.createElement("img",{src:"img/arrow-right.png",alt:"arrow-right"}))),r.a.createElement("div",{className:"sidebar-history sidebar-bar"},r.a.createElement("div",{className:"sidebar-bar-icon"},r.a.createElement("img",{src:"img/icon-history.png",alt:"icon-history"})),r.a.createElement("div",{className:"sidebar-bar-text"},r.a.createElement("h3",null,"History")),r.a.createElement("div",{className:"sidebar-bar-arrow"},r.a.createElement("img",{src:"img/arrow-right.png",alt:"arrow-right"}))),r.a.createElement("div",{className:"sidebar-support sidebar-bar"},r.a.createElement("div",{className:"sidebar-bar-icon"},r.a.createElement("img",{src:"img/icon-support.png",alt:"icon-support"})),r.a.createElement("div",{className:"sidebar-bar-text"},r.a.createElement("h3",null,"Support")),r.a.createElement("div",{className:"sidebar-bar-arrow"},r.a.createElement("img",{src:"img/arrow-right.png",alt:"arrow-right"}))),r.a.createElement("div",{className:"sidebar-time"},r.a.createElement("p",null,"Server Time: 04:20:59")))}}]),t}(n.Component),Ie=function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"content-balance"},r.a.createElement("div",{className:"content-balance-btc-header"}),r.a.createElement("div",{className:"content-balance-btc-square"}),r.a.createElement("div",{className:"content-balance-btc-dol"}),r.a.createElement("div",{className:"content-balance-dol-header"}),r.a.createElement("div",{className:"content-balance-dol-square"}),r.a.createElement("div",{className:"content-balance-dol-coin"}),r.a.createElement("div",{className:"content-balance-coin-header"}),r.a.createElement("div",{className:"content-balance-coin-square"})),r.a.createElement("div",{className:"content-earnings"},r.a.createElement("div",{className:"content-earnings-total-invmemb"}),r.a.createElement("div",{className:"content-earnings-profteam"}),r.a.createElement("div",{className:"content-earnings-totalprof"}),r.a.createElement("div",{className:"content-earnings-graph"})),r.a.createElement("div",{className:"content-links"},r.a.createElement("div",{className:"refbyid"}),r.a.createElement("div",{className:"refbyusername"}),r.a.createElement("div",{className:"presentation-link"}),r.a.createElement("div",{className:"image-video-link"}),r.a.createElement("div",{className:"tutorial-link"})),r.a.createElement("div",{className:"content-newslog"},r.a.createElement("div",{className:"content-newslog-news"}),r.a.createElement("div",{className:"content-newslog-loginhistory"})))}}]),t}(n.Component),We=(t(214),function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(e){var n;return Object(y.a)(this,t),(n=a.call(this,e)).state={isClosed:!1},n.handleClick=n.handleClick.bind(Object(Te.a)(n)),n}return Object(O.a)(t,[{key:"handleClick",value:function(){this.setState((function(e){return{isToggleOn:!e.isClosed}}))}},{key:"render",value:function(){return r.a.createElement("div",{className:this.state.isClosed?"dash-wrapper-closed":"dash-wrapper"},r.a.createElement(De,null),r.a.createElement(Fe,{isClosed:this.state.isClosed,handleClick:this.handleClick}),r.a.createElement(Ie,null))}}]),t}(n.Component)),Ae=(t.p,t.p,t.p,t.p,function(e){Object(w.a)(t,e);var a=Object(j.a)(t);function t(){return Object(y.a)(this,t),a.apply(this,arguments)}return Object(O.a)(t,[{key:"render",value:function(){return r.a.createElement(k.a,null,r.a.createElement(x.c,null,r.a.createElement(x.a,{path:"/dashboard",component:We}),r.a.createElement(x.a,{path:"/main",component:be}),r.a.createElement(x.a,{path:"/login",component:Se}),r.a.createElement(x.a,{path:"/",component:R})))}}]),t}(n.Component)),Re=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Le(e,a){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),a&&a.onUpdate&&a.onUpdate(e)):(console.log("Content is cached for offline use."),a&&a.onSuccess&&a.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(r.a.createElement(l.a,{store:N},r.a.createElement(Ae,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var a="".concat("","/service-worker.js");Re?(!function(e,a){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var n=t.headers.get("content-type");404===t.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Le(e,a)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(a,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):Le(a,e)}))}}()},95:function(e,a,t){}},[[103,1,2]]]);
//# sourceMappingURL=main.de38515b.chunk.js.map