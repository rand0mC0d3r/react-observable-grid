(this.webpackJsonpsample=this.webpackJsonpsample||[]).push([[0],{119:function(e,t,n){},120:function(e,t,n){"use strict";n.r(t);var r=n(161),a=n(0),i=n.n(a),o=n(12),c=n.n(o),l=n(65),s=n(11),d=n(58),u=n(162),p=n(158),b=n(156),f=n(160),j=n(90),x=n(157),m=n(59),h=n(159),g=n(84),O=n.n(g),v=n(64),y=n.n(v),w=n(85),S=n.n(w),C=n(86),k=n.n(C),N=n(82),I=n.n(N),E=n(83),_=n.n(E),M=n(24),R=n(54),D=n.n(R),P=n(78),A=n.n(P),T=n(2),H=function(e){var t=e.row,n=t.name,r=t.surname,a=t.nickname,i=t.streetname;return Object(T.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[Object(T.jsxs)(d.a,{style:{cursor:"pointer"},variant:"subtitle2",children:[n," ",r]}),Object(T.jsxs)(d.a,{style:{cursor:"pointer"},variant:"caption",color:"textSecondary",children:[a," ",i]})]})},W=function(e){var t=e.row.description;return Object(T.jsx)(d.a,{variant:"body2",children:t})},L=function(e){var t=e.row.tiles,n=e.selectedTiles,r=e.onSelectTile,a=void 0===r?function(){}:r,i=Object(M.a)(),o=U(i);return Object(T.jsx)("div",{style:{display:"flex",flexWrap:"wrap",flexDirection:"row",gap:"8px 8px",padding:"4px 0px"},children:t.map((function(e){var t=e.id,r=e.name;return Object(T.jsx)("div",{onClick:function(){return a(t)},className:[o.tile,n.some((function(e){return e===t}))&&o.selectedTile].join(" "),children:r},r)}))})},z=function(e){var t=e.row,n=t.price,r=t.currency;return Object(T.jsxs)(d.a,{style:{display:"flex",justifyContent:"flex-end"},variant:"subtitle2",children:[n," ",r]})},F=function(){var e=Object(M.a)(),t=B(e);return Object(T.jsxs)("div",{className:t.actionContainer,children:[Object(T.jsx)(A.a,{color:"primary"}),Object(T.jsx)(D.a,{color:"secondary"})]})},B=Object(m.a)((function(){return{actionContainer:{display:"flex",justifyContent:"flex-end",gap:"8px",flexWrap:"wrap",opacity:"0.3",filter:"grayscale(70%)","&:hover":{opacity:"1",filter:"grayscale(0%)"}}}})),U=Object(m.a)((function(e){return{tile:{border:"1px solid ".concat(e.palette.divider),boxShadow:"0px 0px 0px 0.5px rgba(0,0,0,0.5)",borderRadius:"12px",padding:"4px 8px"},selectedTile:{backgroundColor:e.palette.primary.main,color:"white"}}})),q=n(79),V=n(13),G=n(81),J=n(56),Y=n.n(J),K=n(57),Z=function(e){var t,n,r=e.onLoadMore,i=void 0===r?function(){}:r,o=e.isPointing,c=void 0!==o&&o,l=(t=function(){return i()},n=750,Object(a.useCallback)(Y()((function(){return t.apply(void 0,arguments)}),n),[n]));return Object(T.jsx)(K.a,{as:"div",style:{position:"relative",height:"0px",padding:"0px",margin:"0px",width:"0px",top:c?"50%":"-25%",opacity:"0",float:"left"},onChange:function(e){return e&&l()},children:"."})};Z.defaultProps={onLoadMore:function(){},isPointing:!1};var $=Z,Q=function(e){var t=e.children,n=e.isAlternating,r=e.isScrollable,a=Object(M.a)(),i=X(a);return Object(T.jsx)("div",{className:i.wrapper,children:Object(T.jsx)("div",{className:[i.container,i.anyItem,n&&i.alternatingItem,r&&i.isScrollable].join(" "),children:t})})},X=Object(m.a)((function(e){return{wrapper:{flex:"1 0 auto",position:"relative",alignSelf:"stretch","@media print":{height:"auto",overflow:"auto"}},container:{"&::-webkit-scrollbar":{display:"none"},"@media print":{height:"auto",overflow:"auto",position:"initial"}},anyItem:{"& > *":{minHeight:"44px",paddingLeft:"2px",paddingRight:"2px"},"& > *:hover":{backgroundColor:"#88888844 !important"}},alternatingItem:{"& > *:nth-child(even)":{backgroundColor:"#88888811"}},isScrollable:{overflow:"visible scroll",position:"absolute",width:"100%",height:"100%"}}}));Q.defaultProps={isScrollable:!0,isAlternating:!0};var ee=Q,te=function(e){var t=e.items;return Object(T.jsx)("div",{style:{flex:"1 0 auto",display:"flex",justifyContent:"flex-end",flexWrap:"wrap",alignItems:"center",position:"absolute",top:"90px",gap:"4px",right:"20px",zIndex:"1",width:"500px"},children:t.map((function(e){var t=e.label,n=e.value;return Object(T.jsx)("div",{style:{color:"white",fontSize:"12px",backgroundColor:"#333",borderRadius:"8px",padding:"8px 12px"},children:"".concat(t.toUpperCase(),": ").concat(n)},"".concat(t,": ").concat(n))}))})};te.defaultProps={items:[]};var ne=te,re=function(e){var t=e.children;return Object(T.jsx)("div",{style:{flex:"1 0 auto",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"},children:t||Object(T.jsx)(d.a,{variant:"caption",color:"textSecondary",children:"No rows ..."})})},ae=n(122),ie=n(124),oe="\u25b2",ce="\u25bc",le="10px 20px",se=Object(m.a)((function(e){return{wrapper:{width:"100%"},header:{display:"grid",fontSize:"12px",minHeight:"48px",alignItems:"stretch",gridColumnGap:"16px",gridRowGap:"16px",boxShadow:"0px 0px 4px 0px #00000029",borderBottom:"1px solid ".concat(e.palette.divider)},arrowColor:{color:e.palette.primary.main},flexbox:{display:"flex",alignItems:"center",flexWrap:"nowrap",gap:"4px"},miniFlexbox:{gap:"2px"},maxiFlexbox:{gap:"8px"},secondaryHeaders:{display:"flex",alignItems:"center",flexWrap:"nowrap",gap:"8px"},headersSelectable:{"&:hover":{backgroundColor:"rgba(0,0,0,0.1)"}},headers:{display:"flex",alignItems:"center",flexWrap:"nowrap",flexDirection:"column",alignSelf:"stretch",gap:"4px"},flipped:{transform:"rotate(180deg)"}}})),de=function(e){var t=e.gridTemplateColumns,n=e.headers,r=void 0===n?[]:n,i=e.setHeaders,o=e.options,c=o.ascArrow,l=o.descArrow,u=o.padding,p=e.order,b=e.onSelect,f=void 0===b?function(){}:b,j=e.orderBy,x=e.handleRequestSort,m=e.handleResetSort,h=(e.rowOptions,Object(M.a)()),g=se(h),O=Object(a.useState)(null),v=Object(s.a)(O,2),y=v[0],w=v[1],S=Boolean(y),C=S?"simple-popover":void 0,k=function(){w(null)},N=function(e){var t=e.property,n=e.label;return j===(t||(null===n||void 0===n?void 0:n.toLowerCase()))},I=function(e){var t=e.property,n=e.label,r=e.align,i=e.secondary,o=void 0!==i&&i;return N({property:t,label:n})&&Object(T.jsx)("div",{className:g.arrowColor,style:{transform:"scaleY(0.75)",order:r?-1:1,fontSize:"13px",opacity:o?.75:1},children:void 0===c&&void 0===l?"asc"===p?oe:ce:Object(a.cloneElement)(Object(T.jsx)(T.Fragment,{children:"asc"===p?c:l}))})},E=function(e){e.tooltip;var t=e.noSort,n=e.property,r=e.label,i=e.icon,o=e.align;return Object(T.jsxs)("div",{className:g.flexbox,onClick:function(){return!t&&x(n||r.toLowerCase())},onDoubleClick:function(){return!t&&m()},style:{cursor:t?"default":"pointer",justifyContent:o?"flex-end":"flex-start",flexDirection:"right"===o?"row-reverse":"row"},children:[i&&Object(a.cloneElement)(i,{style:{fontSize:16}}),Object(T.jsx)(d.a,{variant:"subtitle2",color:N({property:n,label:r})?"primary":"textSecondary",style:{lineHeight:"16px",flexOrder:0,userSelect:"none",fontWeight:N({property:n,label:r})?"bold":"normal"},children:r}),I({property:n,label:r,align:o})]},"".concat(n,"_").concat(r,"_").concat(o))};return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(ae.a,{id:C,open:S,anchorEl:y,onClose:k,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},children:Object(T.jsx)("div",{children:r.map((function(e){return Object(T.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"4px 12px"},children:[Object(T.jsx)(ie.a,{color:"primary",checked:e.visible,onChange:function(){return t=e.property,e.label,void i(r.map((function(e){return e.property===t?Object(V.a)(Object(V.a)({},e),{},{visible:!e.visible}):e})));var t}}),e.icon,Object(T.jsxs)(d.a,{color:"textSecondary",children:[e.label," (property: ",e.property,")"]})]},"".concat(e.property,"_").concat(e.label))}))})}),Object(T.jsx)("div",{className:g.wrapper,children:Object(T.jsx)("div",{onContextMenu:function(e){e.preventDefault(),w(e.currentTarget)},className:g.header,style:{padding:u||le,paddingTop:"0px",paddingBottom:"0px",gridTemplateColumns:t},children:null===r||void 0===r?void 0:r.filter((function(e){return e.visible})).map((function(e){var t=e.noHightlight,n=e.align,r=(e.selected,e.label),a=e.icon,i=e.tooltip,o=e.property,c=e.secondaryHeaders,l=e.additionalHeaders,s=e.noSort;return Object(T.jsxs)("div",{onDoubleClick:function(){return!t&&f(r)},className:"".concat(g.headers," ").concat(t?"":g.headersSelectable),style:{alignItems:n?"flex-end":"flex-start",padding:u||le,paddingLeft:"4px",paddingRight:"4px",margin:"0px -4px"},children:[Object(T.jsxs)("div",{className:"".concat(g.flexbox," ").concat(g.maxiFlexbox),children:[E({tooltip:i,noSort:s,property:o,label:r,icon:a,align:n}),l&&Object(T.jsx)("div",{className:g.secondaryHeaders,children:l.map((function(e){var t=e.label,r=e.property,a=e.noSort,o=e.icon;return E({tooltip:i,noSort:a,property:r,label:t,icon:o,align:n})}))})]}),c&&Object(T.jsx)("div",{className:g.secondaryHeaders,children:c.map((function(e){var t=e.label,r=e.property,a=e.noSort;return Object(T.jsxs)("div",{className:"".concat(g.flexbox," ").concat(g.miniFlexbox),style:{cursor:a?"default":"pointer"},children:[Object(T.jsx)(d.a,{variant:"caption",color:N({property:r,label:t})?"primary":"textSecondary",style:{flexOrder:0,lineHeight:"1.5",userSelect:"none",fontWeight:N({property:r,label:t})?"bold":"normal"},onClick:function(){return!a&&x(r||t.toLowerCase())},onDoubleClick:function(){return!a&&m()},children:t}),I({property:r,label:t,align:n,secondary:!0})]},"".concat(t,"_subHeader"))}))})]},"".concat(r))}))})})]})},ue=function(e){var t=e.id,n=e.forceRender,r=e.index,a=e.className,i=e.style,o=e.onClick,c=e.children,l=e.isRelevant,s=e.isScrollable;return l&&c?Object(T.jsx)(K.a,{children:function(e){var l=e.inView,d=e.ref;return Object(T.jsx)("div",Object(V.a)(Object(V.a)({},Object(V.a)({ref:d,onClick:o,id:t,key:r},(!!n||l)&&{className:a,style:i})),{},{children:(!!n||l)&&s&&c}))}}):null};ue.defaultProps={isScrollable:!0,forceRender:!1,isSelected:!1,isRelevant:!1};var pe=ue,be=Object(m.a)((function(e){return{wrapper:{position:"absolute",bottom:"20px",right:"20px",display:"flex",gap:"8px",zIndex:"1"},container:{fontWeight:"bold",border:"1px solid ".concat(e.palette.augmentColor({main:e.palette.divider}).dark),backgroundColor:"".concat(e.palette.background.default),padding:"10px 16px",borderRadius:"8px","&:hover":{backgroundColor:"#CCC !important"}}}})),fe=function(e){var t=e.selectedIndex,n=e.isAtTop,r=Object(M.a)(),a=be(r);return Object(T.jsx)("div",{className:a.wrapper,children:[!!t&&{id:"selected",label:"\u2192 ".concat(t+1)},!!n&&{id:"first",label:"\u2191"}].filter((function(e){return!1!==e})).map((function(e){var t=e.id,n=e.label;return Object(T.jsx)("div",{onClick:function(){return function(e){var t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth",block:"center"})}(t)},className:a.container,children:n},t)}))})},je=Object(m.a)((function(){return{selectedColumn:{top:"0px",left:"0px",bottom:"0px",right:"0px",position:"absolute"},observableRow:{alignSelf:"stretch",breakInside:"avoid",fontSize:"12px",alignItems:"center",gridColumnGap:"16px",display:"grid"}}})),xe=function(e){var t,n,r=e.headers,o=e.rows,c=void 0===o?[]:o,l=e.rowOptions,d=void 0===l?{padding:"20px",template:"repeat(1fr)"}:l,u=e.headerOptions,p=void 0===u?{}:u,b=e.emptyElement,f=(e.isUpdatingUrl,e.isDebugging),j=void 0!==f&&f,x=e.isSelectable,m=void 0===x||x,h=e.isScrollable,g=void 0===h||h,O=e.isAlternating,v=void 0===O||O,y=(Object(M.a)(),je()),w=Object(a.useState)("asc"),S=Object(s.a)(w,2),C=S[0],k=S[1],N=Object(a.useState)([]),I=Object(s.a)(N,2),E=I[0],_=I[1],R=Object(a.useState)([]),D=Object(s.a)(R,2),P=D[0],A=D[1],H=Object(a.useState)(""),W=Object(s.a)(H,2),L=W[0],z=W[1],F=Object(a.useState)(!1),B=Object(s.a)(F,2),U=B[0],q=B[1],J=Object(a.useState)(null),K=Object(s.a)(J,2),Z=K[0],Q=K[1],X=Object(a.useState)(""),te=Object(s.a)(X,2),ae=te[0],ie=te[1],oe=Object(a.useState)(null),ce=Object(s.a)(oe,2),le=ce[0],se=ce[1],ue=Object(a.useState)([]),be=Object(s.a)(ue,2),xe=be[0],me=be[1],he=Object(a.useState)({start:-1,end:1}),ge=Object(s.a)(he,2),Oe=ge[0],ve=ge[1],ye=Object(a.useState)(50),we=Object(s.a)(ye,2),Se=we[0],Ce=we[1],ke=25,Ne=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"}),Ie=(t=function(){return Ee()},n=5050,Object(a.useCallback)(Y()((function(){return t.apply(void 0,arguments)}),n),[n]),Object(G.a)({comparer:Ne.compare})),Ee=function(){return document.getElementsByTagName("*").length};Object(a.useEffect)((function(){A(r.map((function(e){return Object(V.a)(Object(V.a)({},e),{},{selected:!1,visible:e.visible||!0})})))}),[r]),Object(a.useEffect)((function(){_(c.map((function(e,t){return Object(V.a)(Object(V.a)({},e),{},{__origIndex:t})}))),se(null)}),[c]),Object(a.useEffect)((function(){E.length>0&&(me(""===L?E.map((function(e,t){return Object(V.a)(Object(V.a)({},e),{},{__index:t})})):function(e,t){return"asc"===e?Ie(t).asc([function(e){return e[L]}]):Ie(t).desc([function(e){return e[L]}])}(C,E).map((function(e,t){return Object(V.a)(Object(V.a)({},e),{},{__index:t})}))),ve({start:-1,end:1}),q(E.length-1>=Se))}),[E,C,L]),Object(a.useEffect)((function(){var e=setInterval((function(){var e=Number(Ee());e>=1e3&&(Ce(Se-.1*Se),q(!0)),Q(e)}),1500);return function(){return clearInterval(e)}}),[]),Object(a.useEffect)((function(){if(r){var e=r.map((function(e){return e.width})).join(" ");ie(e),-1===e.indexOf("minmax")&&console.error("Current grid-template-columns map contains no minmax(). Please use one otherwise the header will not be able to expand.")}}),[r]),Object(a.useEffect)((function(){var e=P.filter((function(e){return e.visible})).map((function(e){return e.width})).join(" ");ie(e)}),[P]);var _e=function(e){var t=null;return 0===e?t="first":e===le&&(t="selected"),t};return Object(T.jsxs)("div",{onMouseLeave:function(){return A(P.map((function(e){return Object(V.a)(Object(V.a)({},e),{},{selected:!1})})))},style:{display:"flex",position:"absolute",width:"100%",height:"100%",flexDirection:"column"},children:[j&&Object(T.jsx)(ne,{items:[{label:"throttling",value:U},{label:"throttleLimit",value:Se},{label:"order",value:C},{label:"orderBy",value:L},{label:"selectedIndex",value:le},{label:"sortedRows",value:xe.length},{label:"rows",value:c.length},{label:"startEnd",value:JSON.stringify(Oe)},{label:"pageSize",value:ke},{label:"totalElements",value:Z}]}),r&&Object(T.jsx)(de,{options:p,gridTemplateColumns:ae,setHeaders:A,headers:P,order:C,orderBy:L,onSelect:function(e){A(P.map((function(t){return Object(V.a)(Object(V.a)({},t),{},{selected:t.label===e&&!t.selected})})))},handleRequestSort:function(e){k(L===e&&"asc"===C?"desc":"asc"),z(e)},handleResetSort:function(){z(""),k("asc")},rowOptions:d}),c.length>0?Object(T.jsxs)(T.Fragment,{children:[Object(T.jsxs)(ee,{isScrollable:g,isAlternating:v,children:[U&&c.length>ke&&Oe.end>0&&-1!==Oe.start&&Object(T.jsx)($,{isPointing:!0,onLoadMore:function(){ve((function(){return{start:-1,end:1}}))}}),xe.filter((function(e){return!U||e.__index<=(null===le?Oe.end*ke:Math.max(le,Oe.end*ke))})).map((function(e){return Object(a.createElement)(pe,{gridSpacing:ae,minRows:25,rowOptions:d,isScrollable:g,key:e.__index,id:_e(e.__index),style:{padding:d.padding,gridTemplateColumns:ae,backgroundColor:m&&le===e.__origIndex?"#44444422":""},className:y.observableRow,index:e.__index,forceRender:!U,isRelevant:!U||e.__index<=(null===le?Oe.end*ke:Math.max(le,Oe.end*ke)),onClick:function(){return m&&se(le===e.__origIndex?null:e.__origIndex)}},P.filter((function(e){return e.visible})).map((function(t){return Object(T.jsx)(i.a.Fragment,{children:t.row(e)},"".concat(t.property,"_").concat(t.label,"_").concat(t.tooltip,"_").concat(t.width))})))})),U&&c.length>ke&&ke*Oe.end-1<c.length&&Object(T.jsx)($,{onLoadMore:function(){ve((function(e){return{start:e.start+1,end:e.end+1}}))}})]}),(!!le||c.length>ke&&Oe.end>3)&&Object(T.jsx)(fe,{selectedIndex:le,isAtTop:c.length>ke&&Oe.end>3}),-1!==P.findIndex((function(e){return e.selected}))&&Object(T.jsx)("div",{className:"".concat(y.observableRow," ").concat(y.selectedColumn),style:{alignItems:"unset",display:"grid",padding:d.padding,paddingTop:0,paddingBottom:0,gap:"16px",zIndex:-1,gridTemplateColumns:ae},children:Object(T.jsx)("div",{style:{gridColumnStart:P.findIndex((function(e){return e.selected}))+1,backgroundColor:"#EEE",margin:"0px -4px"}})})]}):Object(T.jsx)(re,{children:b})]})},me=n(88),he=n.n(me),ge=n(87),Oe=n.n(ge),ve=["USD","EUR","GBP","JPY","CAD","AUD","CHF","SEK","NZD"],ye=["pink","green","blue","yellow","orange","purple","brown","grey","black","white"],we=["Chocolate","Vanilla","Strawberry","Mint","Coffee","Cinnamon","Peppermint","Lemon","Hazelnut","Coconut","Pistachio","Mocha","Toffee","Peanut","Almond","Honey","Cherry"].map((function(e,t){return{id:t,name:e,color:ye[t%ye.length]}})),Se=n(89),Ce=n.n(Se),ke=Object(m.a)((function(){return{wrapper:{display:"flex",width:"100%",height:"100%",minWidth:"850px",gap:"16px",flexDirection:"column",position:"absolute",alignContent:"stretch",justifyContent:"center",alignItems:"center"},wrapper2:{display:"flex",position:"absolute",width:"100%",height:"100%",flexDirection:"column"},actions:{display:"flex",justifyContent:"space-between",gap:"16px",alignItems:"center"},smallActions:{gap:"4px"},bigContainer:{width:"90%"},container:{minWidth:"850px",position:"relative",borderRadius:"4px",maxWidth:"95%",width:"90%",border:"4px solid #333",height:"80%"}}})),Ne=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],r=t[1],i=Object(a.useState)([]),o=Object(s.a)(i,2),c=o[0],m=o[1],g=Object(a.useState)([]),v=Object(s.a)(g,2),w=v[0],C=v[1],N=Object(a.useState)(""),E=Object(s.a)(N,2),M=E[0],R=E[1],P=Object(a.useState)(!1),A=Object(s.a)(P,2),B=A[0],U=A[1],V=Object(a.useState)([]),G=Object(s.a)(V,2),J=G[0],Y=G[1],K=Object(a.useState)(["name","description"]),Z=Object(s.a)(K,2),$=Z[0],Q=Z[1],X=Object(a.useState)(!0),ee=Object(s.a)(X,2),te=ee[0],ne=ee[1],re=Object(a.useState)(!1),ae=Object(s.a)(re,2),ie=ae[0],oe=ae[1],ce=Object(a.useMemo)((function(){return Object(j.a)({palette:{type:"light"}})}),[]),le=ke(),se=[{label:"Name",tooltip:"Filter users by name",icon:Object(T.jsx)(y.a,{}),property:"name",width:"minmax(200px, 1fr)",row:function(e){return Object(T.jsx)(H,{row:e})},additionalHeaders:[{label:"Surname",icon:Object(T.jsx)(I.a,{}),property:"surname"}],secondaryHeaders:[{label:"Name1",property:"nickname"},{label:"Name2",property:"streetname"}]},{label:"Description",icon:Object(T.jsx)(_.a,{}),property:"description",row:function(e){return Object(T.jsx)(W,{row:e})},width:"2fr"},{label:"Tiles",icon:Object(T.jsx)(O.a,{}),property:"tilesHash",width:"minmax(100px, 2fr)",row:function(e){return Object(T.jsx)(L,{row:e,selectedTiles:J,onSelectTile:function(e){Y((function(t){return t.some((function(t){return t===e}))?t.filter((function(t){return t!==e})):[].concat(Object(l.a)(t),[e])}))}})},secondaryHeaders:[{label:"Tiles Count",property:"tiles"}]},{label:"Price",icon:Object(T.jsx)(S.a,{}),property:"price",align:"flex-end",width:"110px",row:function(e){return Object(T.jsx)(z,{row:e})},secondaryHeaders:[{label:"Currency",property:"currency"}]},{icon:Object(T.jsx)(k.a,{}),align:"flex-end",tooltip:"Actions for entries",noSort:!0,noSearch:!0,row:function(e){return Object(T.jsx)(F,{row:e})},width:"1fr",noHightlight:!0}],de=function(e){return r(function(e){return 0===e?[]:new Array(e).fill().map((function(e,t){var n=we.sort((function(){return.5-Math.random()})).slice(0,Math.floor(10*Math.random()+2));return{uuid:"uuid_".concat(t),name:"".concat(Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,5),".").concat(t+1),surname:"".concat(Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,5),".").concat(t+1),nickname:"n1_".concat(Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,3)).concat(t+1),streetname:"n2_".concat(t+1,"_").concat(Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,3)),description:"".concat(["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Donec pulvinar nisi pulvinar metus cursus, eget malesuada nunc auctor.","Maecenas vitae suscipit elit, ut varius diam.","Duis consectetur a erat non tempus.","Sed molestie at nibh ut ullamcorper.","Mauris hendrerit egestas quam, vitae dictum tellus condimentum ut.","Suspendisse in lorem pharetra, ornare leo id, condimentum neque. ","Vestibulum odio justo, efficitur at dictum sed, pharetra ac nisi.","Vivamus vel eleifend massa.","Aenean est nunc, iaculis a maximus ut, blandit eget lorem.","Proin et porta arcu.","Curabitur ornare est nulla, in interdum dui lacinia id.","Praesent et nunc eget ipsum blandit venenatis et et est.","Sed bibendum auctor ullamcorper.","Integer at ligula ac neque accumsan tincidunt."][Math.floor(14*Math.random())]," ").concat(Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,3)),tiles:n,tilesHash:n.map((function(e){return e.name})).sort().join(""),price:"".concat(t+1,".0").concat(Math.floor(100*Math.random())),currency:ve[Math.floor(Math.random()*ve.length)]}}))}(e))};return Object(a.useEffect)((function(){return de(50)}),[]),Object(a.useEffect)((function(){M.length>0?m((function(e){return e.filter((function(e){return!($.length>0)||$.some((function(t){return B?e[t].includes(M):e[t].toLowerCase().includes(M.toLowerCase())}))}))})):m(n)}),[M,n,$,B]),Object(a.useEffect)((function(){J.length>0?C(c.filter((function(e){return J.filter((function(t){return e.tiles.some((function(e){return e.id===t}))})).length===J.length}))):C(c)}),[J,c]),Object(T.jsx)(x.a,{theme:ce,children:Object(T.jsxs)("div",{className:le.wrapper,children:[Object(T.jsxs)("div",{className:"".concat(le.actions," ").concat(le.bigContainer),children:[Object(T.jsxs)("div",{className:le.actions,children:[Object(T.jsx)(d.a,{color:"textPrimary",variant:"h3",children:"\ud83d\udc40 \ud83d\uddde\ufe0f"}),Object(T.jsx)(d.a,{color:"textPrimary",style:{border:"2px dotted #CCC",padding:"4px 12px",borderRadius:"8px",userSelect:"all",backgroundColor:"#effdef"},variant:"h6",children:"npm i react-observable-grid"})]}),Object(T.jsxs)("div",{className:le.actions,children:[Object(T.jsx)(u.a,{variant:"outlined",label:"Search Rows: ".concat(w.length)}),Object(T.jsx)(u.a,{onClick:function(){return ne(!te)},variant:"outlined",label:"Debugging: ".concat(te?"ON":"OFF")}),Object(T.jsx)(u.a,{onClick:function(){return oe(!ie)},variant:"outlined",label:"Env: ".concat(ie?"PROD":"DEV")})]}),Object(T.jsx)("div",{className:"".concat(le.actions," ").concat(le.smallActions),children:[0,2,30,40,50,100,1500,65e3].map((function(e){return Object(T.jsx)(p.a,{disableElevation:!0,style:{minWidth:"unset",padding:"5px 12px"},color:e===n.length?"primary":"default",variant:e!==n.length?"outlined":"contained",onClick:function(){return de(e)},children:e},e)}))}),Object(T.jsxs)("div",{className:"".concat(le.actions," ").concat(le.smallActions),children:[Object(T.jsx)(b.a,{title:"Open NPM link ...",onClick:function(){return window.open("https://www.npmjs.com/package/react-observable-grid")},children:Object(T.jsx)(Oe.a,{})}),Object(T.jsx)(b.a,{title:"Open Github link ...",onClick:function(){return window.open("https://github.com/rand0mC0d3r/react-observable-grid")},children:Object(T.jsx)(y.a,{})})]})]}),Object(T.jsxs)("div",{className:"".concat(le.actions," ").concat(le.bigContainer),children:[Object(T.jsxs)("div",{className:le.actions,children:[Object(T.jsx)(f.a,{placeholder:"Search in ".concat($.join(", "),"..."),value:M,disabled:0===$.length,onChange:function(e){return R(e.target.value)},variant:"outlined",InputProps:{startAdornment:Object(T.jsx)(h.a,{position:"start",children:"\ud83d\udd0d"}),endAdornment:Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(he.a,{style:{cursor:"pointer"},onClick:function(){return U(!B)},color:B?"primary":"disabled"}),M.length>0&&Object(T.jsx)(h.a,{onClick:function(){return R("")},position:"end",children:Object(T.jsx)(D.a,{style:{cursor:"pointer"}})})]})},style:{width:"400px"},size:"small"}),Object(T.jsx)("div",{className:"".concat(le.actions," ").concat(le.smallActions),children:se.filter((function(e){return!e.noSearch})).map((function(e){var t=$.some((function(t){return t===e.property}));return Object(T.jsx)(u.a,{color:t?"primary":"default",variant:"outlined",onClick:function(){$.includes(e.property)?Q($.filter((function(t){return t!==e.property}))):Q([].concat(Object(l.a)($),[e.property]))},icon:t?void 0:Object(T.jsx)(Ce.a,{}),onDelete:t?function(){Q($.filter((function(t){return t!==e.property})))}:void 0,label:e.label},e.property)}))})]}),Object(T.jsx)("div",{className:"".concat(le.actions," ").concat(le.smallActions),children:J.map((function(e){return Object(T.jsx)(u.a,{label:e},e)}))})]}),Object(T.jsx)("div",{className:le.container,style:{height:"850px"},children:ie?Object(T.jsx)(q.a,{headers:se,rows:w,isEmpty:0===w.length,emptyElement:Object(T.jsx)("div",{children:"No data found ..."})}):Object(T.jsx)(xe,{isDebugging:te,headers:se,uniqueId:"fakeEntries",rowOptions:{padding:"8px 16px"},headerOptions:{padding:"16px 16px"},rows:w,emptyElement:Object(T.jsx)(d.a,{variant:"caption",color:"textSecondary",children:"No data found ..."})})})]})})},Ie=(n(119),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,163)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),i(e),o(e)}))}),Ee=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function _e(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(Object(T.jsx)(i.a.StrictMode,{children:Object(T.jsx)(r.b,{children:Object(T.jsx)(Ne,{})})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");Ee?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):_e(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):_e(t,e)}))}}(),Ie()}},[[120,1,2]]]);
//# sourceMappingURL=main.b4683613.chunk.js.map