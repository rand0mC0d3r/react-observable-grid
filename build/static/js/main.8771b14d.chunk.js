(this.webpackJsonpsample=this.webpackJsonpsample||[]).push([[0],{116:function(e,t,n){},117:function(e,t,n){"use strict";n.r(t);var r=n(162),a=n(0),o=n.n(a),i=n(12),c=n.n(i),l=n(66),s=n(10),d=n(46),u=n(163),p=n(159),b=n(157),f=n(161),j=n(160),x=n(87),m=n(158),h=n(58),g=n(86),v=n.n(g),O=n(57),y=n.n(O),w=n(84),C=n.n(w),S=n(83),k=n.n(S),I=n(65),N=n.n(I),_=n(85),E=n.n(_),D=n(63),R=n(13),M=n(21),P=n(80),H=n(64),A=n.n(H),T=n(2),F=function(e){var t=e.children,n=e.isAlternating,r=e.isScrollable,a=Object(M.a)(),o=W(a);return Object(T.jsx)("div",{className:o.wrapper,children:Object(T.jsx)("div",{id:"Container-root",className:[o.container,o.anyItem,n&&o.alternatingItem,r&&o.isScrollable].join(" "),children:t})})},W=Object(h.a)((function(e){return{wrapper:{flex:"1 0 auto",position:"relative",alignSelf:"stretch","@media print":{height:"auto",overflow:"auto"}},container:{"&::-webkit-scrollbar":{display:"none"},"@media print":{height:"auto",overflow:"auto",position:"initial"}},anyItem:{"& > *":{minHeight:"44px",paddingLeft:"2px",paddingRight:"2px"},"& > *:hover":{backgroundColor:"#88888844"}},alternatingItem:{"& > *:nth-child(even)":{backgroundColor:"#88888811"}},isScrollable:{overflow:"visible scroll",position:"absolute",width:"100%",height:"100%"}}}));F.defaultProps={isScrollable:!0,isAlternating:!0};var L=F,B=function(e){var t=e.items;return Object(T.jsx)("div",{style:{flex:"1 0 auto",display:"flex",justifyContent:"flex-start",flexWrap:"wrap",alignItems:"center",position:"absolute",bottom:"20px",gap:"4px",left:"20px",zIndex:"1",width:"1000px"},children:t.map((function(e){var t=e.label,n=e.value;return Object(T.jsx)("div",{style:{color:"white",fontSize:"12px",backgroundColor:"#333",borderRadius:"8px",padding:"8px 12px"},children:"".concat(t.toUpperCase(),": ").concat(n)},"".concat(t,": ").concat(n))}))})};B.defaultProps={items:[]};var z=B,U=function(e){var t=e.children;return Object(T.jsx)("div",{style:{flex:"1 0 auto",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"},children:t||Object(T.jsx)(d.a,{variant:"caption",color:"textSecondary",children:"No rows ..."})})},G=n(119),q=n(121),V="\u25b2",J="\u25bc",Y="10px 20px",K=Object(h.a)((function(e){return{root:{width:"100%"},wrapper:{display:"grid",fontSize:"12px",minHeight:"56px",alignItems:"stretch",gridColumnGap:"16px",gridRowGap:"16px",boxShadow:"0px 5px 3px -5px #00000029",borderBottom:"1px solid ".concat(e.palette.divider)},arrowColor:{color:e.palette.primary.main},flexbox:{display:"flex",alignItems:"center",flexWrap:"nowrap",gap:"4px"},miniFlexbox:{gap:"2px"},maxiFlexbox:{gap:"8px"},secondaryHeaders:{display:"flex",alignItems:"center",flexWrap:"nowrap",gap:"8px"},headersSelectable:{"&:hover":{backgroundColor:"rgba(0,0,0,0.1)"}},headers:{display:"flex",alignItems:"center",flexWrap:"nowrap",flexDirection:"column",alignSelf:"stretch",gap:"4px"},flipped:{transform:"rotate(180deg)"}}})),X=function(e){var t=e.gridTemplateColumns,n=e.headers,r=void 0===n?[]:n,o=e.setHeaders,i=e.options,c=i.ascArrow,l=i.descArrow,u=i.padding,p=e.order,b=e.onSelect,f=void 0===b?function(){}:b,j=e.orderBy,x=e.handleRequestSort,m=e.handleResetSort,h=(e.rowOptions,Object(M.a)()),g=K(h),v=Object(a.useState)(null),O=Object(s.a)(v,2),y=O[0],w=O[1],C=Boolean(y),S=C?"simple-popover":void 0,k=function(){w(null)},I=function(e){var t=e.property,n=e.label;return j===(t||(null===n||void 0===n?void 0:n.toLowerCase()))},N=function(e){var t=e.property,n=e.label,r=e.align,o=e.secondary,i=void 0!==o&&o;return I({property:t,label:n})&&Object(T.jsx)("div",{className:g.arrowColor,style:{transform:"scaleY(0.5) scaleX(0.85)",order:r?-1:1,fontSize:"13px",opacity:i?.75:1},children:void 0===c&&void 0===l?"asc"===p?V:J:Object(a.cloneElement)(Object(T.jsx)(T.Fragment,{children:"asc"===p?c:l}))})},_=function(e){return Object(T.jsx)("div",{className:g.secondaryHeaders,children:e.map((function(e){var t=e.label,n=e.property,r=e.noSort,a=e.icon;return E({noSort:r,property:n,label:t,icon:a})}))})},E=function(e){var t=e.noSort,n=e.property,r=e.label,o=e.icon,i=e.align;return Object(T.jsxs)("div",{className:g.flexbox,onClick:function(){return!t&&x(n||r.toLowerCase())},onDoubleClick:function(){return!t&&m()},style:{cursor:t?"default":"pointer",justifyContent:i?"flex-end":"flex-start",flexDirection:"right"===i?"row-reverse":"row"},children:[o&&Object(a.cloneElement)(o,{style:{fontSize:16}}),Object(T.jsx)(d.a,{variant:"subtitle2",color:I({property:n,label:r})?"primary":"textSecondary",style:{lineHeight:"16px",flexOrder:0,userSelect:"none",fontWeight:I({property:n,label:r})?"bold":"normal"},children:r}),N({property:n,label:r,align:i})]},"".concat(n,"_").concat(r,"_").concat(i))};return Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(G.a,{id:S,open:C,anchorEl:y,onClose:k,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},children:Object(T.jsx)("div",{children:r.map((function(e){return Object(T.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"4px 12px"},children:[Object(T.jsx)(q.a,{color:"primary",checked:e.visible,onChange:function(){return t=e.property,e.label,void o(r.map((function(e){return e.property===t?Object(R.a)(Object(R.a)({},e),{},{visible:!e.visible}):e})));var t}}),e.icon,Object(T.jsxs)(d.a,{color:"textSecondary",children:[e.label," (property: ",e.property,")"]})]},"".concat(e.property,"_").concat(e.label))}))})}),Object(T.jsx)("div",{id:"Header-root",className:g.root,children:Object(T.jsx)("div",{id:"Header-wrapper",onContextMenu:function(e){e.preventDefault(),w(e.currentTarget)},className:g.wrapper,style:{padding:u||Y,paddingTop:"0px",paddingBottom:"0px",gridTemplateColumns:t},children:null===r||void 0===r?void 0:r.filter((function(e){return e.visible})).map((function(e){var t=e.noHightlight,n=e.align,r=e.label,a=e.icon,o=e.property,i=e.secondaryHeaders,c=e.preHeaders,l=e.postHeaders,s=e.noSort;return Object(T.jsxs)("div",{onDoubleClick:function(){return!t&&f(r)},id:"Header-header",className:"".concat(g.headers," ").concat(t?"":g.headersSelectable),style:{alignItems:n?"flex-end":"flex-start",margin:"0px -4px",padding:"0px 4px",alignSelf:"center",height:"100%",justifyContent:"center"},children:[Object(T.jsxs)("div",{className:"".concat(g.flexbox," ").concat(g.maxiFlexbox),children:[c&&Object(T.jsx)(T.Fragment,{children:_(c)}),E({noSort:s,property:o,label:r,icon:a,align:n}),l&&Object(T.jsx)(T.Fragment,{children:_(l)})]}),i&&Object(T.jsx)("div",{className:g.secondaryHeaders,children:i.map((function(e){var t=e.label,r=e.property,a=e.noSort;return Object(T.jsxs)("div",{className:"".concat(g.flexbox," ").concat(g.miniFlexbox),style:{cursor:a?"default":"pointer"},children:[Object(T.jsx)(d.a,{variant:"caption",color:I({property:r,label:t})?"primary":"textSecondary",style:{flexOrder:0,lineHeight:"1.5",userSelect:"none",fontWeight:I({property:r,label:t})?"bold":"normal"},onClick:function(){return!a&&x(r||t.toLowerCase())},onDoubleClick:function(){return!a&&m()},children:t}),N({property:r,label:t,align:n,secondary:!0})]},"".concat(t,"_subHeader"))}))})]},"".concat(r))}))})})]})},Z=n(56),$=function(e){var t,n,r=e.onLoadMore,o=void 0===r?function(){}:r,i=e.isPointing,c=void 0!==i&&i,l=(t=function(){return o()},n=750,Object(a.useCallback)(A()((function(){return t.apply(void 0,arguments)}),n),[n]));return Object(T.jsx)(Z.a,{as:"div",style:{position:"relative",height:"0px",padding:"0px",margin:"0px",width:"0px",top:c?"50%":"-25%",opacity:"0",float:"left"},onChange:function(e){return e&&l()},children:"."})};$.defaultProps={onLoadMore:function(){},isPointing:!1};var Q=$,ee=function(e){var t=e.id,n=e.forceRender,r=e.index,a=e.className,o=e.style,i=e.onClick,c=e.children,l=e.isRelevant,s=e.isScrollable;return l&&c?Object(T.jsx)(Z.a,{children:function(e){var l=e.inView,d=e.ref;return Object(T.jsx)("div",Object(R.a)(Object(R.a)({},Object(R.a)({ref:d,onClick:i,id:t,key:r},(!!n||l)&&{className:a,style:o})),{},{children:(!!n||l)&&s&&c}))}}):null};ee.defaultProps={isScrollable:!0,forceRender:!1,isSelected:!1,isRelevant:!1};var te=ee,ne=Object(h.a)((function(e){return{wrapper:{position:"absolute",bottom:"20px",right:"20px",display:"flex",gap:"8px",zIndex:"1"},container:{fontWeight:"bold",border:"1px solid ".concat(e.palette.augmentColor({main:e.palette.divider}).dark),backgroundColor:"".concat(e.palette.background.default),padding:"10px 16px",borderRadius:"8px","&:hover":{backgroundColor:"#CCC !important"}}}})),re=function(e){var t=e.selectedIndex,n=e.isAtTop,r=Object(M.a)(),a=ne(r);return Object(T.jsx)("div",{className:a.wrapper,children:[!!t&&{id:"selected",label:"\u2192 ".concat(t+1)},!!n&&{id:"first",label:"\u2191"}].filter((function(e){return!1!==e})).map((function(e){var t=e.id,n=e.label;return Object(T.jsx)("div",{onClick:function(){return function(e){var t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth",block:"center"})}(t)},className:a.container,children:n},t)}))})},ae=n(81),oe=n.n(ae),ie=function(e){var t=e.id,n=e.index,r=e.origIndex,i=e.children,c=Object(a.useState)(""),l=Object(s.a)(c,2),d=l[0],u=l[1],p=Object(a.useState)(!1),b=Object(s.a)(p,2),f=b[0],j=b[1],x=Object(a.useCallback)((function(e){var t=document.getElementById(e);t&&oe.a.toPng(t).then((function(e){u(e)})).catch((function(e){console.error("oops, something went wrong!",e)}))}),[]);return Object(a.useEffect)((function(){n!==r&&u("")}),[n,r,x,t]),Object(a.useEffect)((function(){x(t)}),[t,x]),Object(T.jsxs)(o.a.Fragment,{children:[d&&!f&&Object(T.jsx)("img",{onMouseOver:function(){return j(!0)},src:d}),(""===d||f)&&Object(T.jsx)("div",{onMouseLeave:function(){return j(!1)},id:t,children:i})]})},ce=Object(h.a)((function(){return{selectedColumn:{top:"0px",left:"0px",bottom:"0px",right:"0px",position:"absolute"},observableRow:{alignSelf:"stretch",breakInside:"avoid",fontSize:"12px",alignItems:"center",gridColumnGap:"16px",display:"grid"},observableRowSelected:{backgroundColor:"#4442"}}})),le=function(e){var t=e.headers,n=e.rows,r=void 0===n?[]:n,i=e.className,c=e.rowOptions,l=void 0===c?{padding:"20px",template:"repeat(1fr)"}:c,d=e.headerOptions,u=void 0===d?{}:d,p=e.emptyElement,b=e.pageSize,f=void 0===b?25:b,j=e.minRows,x=void 0===j?25:j,m=e.canvasDrawing,h=void 0!==m&&m,g=e.isClearingOnBlur,v=void 0===g||g,O=(e.isUpdatingUrl,e.isDebugging),y=void 0!==O&&O,w=e.isSelectable,C=void 0===w||w,S=e.isScrollable,k=void 0===S||S,I=e.isAlternating,N=void 0===I||I,_=(Object(M.a)(),ce()),E=Object(a.useState)("asc"),D=Object(s.a)(E,2),H=D[0],A=D[1],F=Object(a.useState)([]),W=Object(s.a)(F,2),B=W[0],G=W[1],q=Object(a.useState)([]),V=Object(s.a)(q,2),J=V[0],Y=V[1],K=Object(a.useState)(""),Z=Object(s.a)(K,2),$=Z[0],ee=Z[1],ne=Object(a.useState)(!1),ae=Object(s.a)(ne,2),oe=ae[0],le=ae[1],se=Object(a.useState)(null),de=Object(s.a)(se,2),ue=de[0],pe=de[1],be=Object(a.useState)(""),fe=Object(s.a)(be,2),je=fe[0],xe=fe[1],me=Object(a.useState)(null),he=Object(s.a)(me,2),ge=he[0],ve=he[1],Oe=Object(a.useState)([]),ye=Object(s.a)(Oe,2),we=ye[0],Ce=ye[1],Se=Object(a.useState)({start:-1,end:1}),ke=Object(s.a)(Se,2),Ie=ke[0],Ne=ke[1],_e=Object(a.useState)(50),Ee=Object(s.a)(_e,2),De=Ee[0],Re=Ee[1],Me=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"}),Pe=Object(P.a)({comparer:Me.compare});Object(a.useEffect)((function(){Y(t.map((function(e){return Object(R.a)(Object(R.a)({},e),{},{selected:!1,visible:e.visible||!0})})))}),[t]),Object(a.useEffect)((function(){G(r.map((function(e,t){return Object(R.a)(Object(R.a)({},e),{},{__origIndex:t})}))),ve(null)}),[r]),Object(a.useEffect)((function(){B.length>0&&(Ce(""===$?B.map((function(e,t){return Object(R.a)(Object(R.a)({},e),{},{__index:t})})):function(e,t){return"asc"===e?Pe(t).asc([function(e){return e[$]}]):Pe(t).desc([function(e){return e[$]}])}(H,B).map((function(e,t){return Object(R.a)(Object(R.a)({},e),{},{__index:t})}))),Ne({start:-1,end:1}),le(B.length-1>=De))}),[B,H,$]),Object(a.useEffect)((function(){var e=setInterval((function(){var e=Number(document.getElementsByTagName("*").length);e>=1e3&&(Re(De-.1*De),le(!0)),pe(e)}),1500);return function(){return clearInterval(e)}}),[]),Object(a.useEffect)((function(){if(t){var e=t.map((function(e){return e.width})).join(" ");xe(e),-1===e.indexOf("minmax")&&console.error("Current grid-template-columns map contains no minmax(). Please use one otherwise the header will not be able to expand.")}}),[t]),Object(a.useEffect)((function(){var e=J.filter((function(e){return e.visible})).map((function(e){return e.width})).join(" ");xe(e)}),[J]);var He=function(e){var t=null;return 0===e?t="first":e===ge&&(t="selected"),t};return Object(T.jsxs)("div",{className:i,onMouseLeave:function(){return v&&Y(J.map((function(e){return Object(R.a)(Object(R.a)({},e),{},{selected:!1})})))},style:{display:"flex",position:"absolute",width:"100%",height:"100%",flexDirection:"column"},children:[y&&Object(T.jsx)(z,{items:[{label:"throttling",value:oe},{label:"throttleLimit",value:De},{label:"order",value:H},{label:"orderBy",value:$},{label:"selectedIndex",value:ge},{label:"sortedRows",value:we.length},{label:"canvasDrawing",value:!oe&&h},{label:"rows",value:r.length},{label:"startEnd",value:JSON.stringify(Ie)},{label:"pageSize",value:f},{label:"totalElements",value:ue}]}),t&&Object(T.jsx)(X,{options:u,gridTemplateColumns:je,setHeaders:Y,headers:J,order:H,orderBy:$,onSelect:function(e){Y(J.map((function(t){return Object(R.a)(Object(R.a)({},t),{},{selected:t.label===e&&!t.selected})})))},handleRequestSort:function(e){A($===e&&"asc"===H?"desc":"asc"),ee(e)},handleResetSort:function(){ee(""),A("asc")},rowOptions:l}),we.length>0?Object(T.jsxs)(T.Fragment,{children:[-1!==J.findIndex((function(e){return e.selected}))&&Object(T.jsx)("div",{className:"".concat(_.observableRow," ").concat(_.selectedColumn),style:{alignItems:"unset",display:"grid",padding:l.padding,paddingTop:0,paddingBottom:0,gap:"16px",zIndex:-1,gridTemplateColumns:je},children:Object(T.jsx)("div",{style:{gridColumnStart:J.findIndex((function(e){return e.selected}))+1,backgroundColor:"#EEE",margin:"0px -4px"}})}),we&&Object(T.jsxs)(L,{isScrollable:k,isAlternating:N,children:[oe&&we.length>f&&Ie.end>0&&-1!==Ie.start&&Object(T.jsx)(Q,{isPointing:!0,onLoadMore:function(){Ne((function(){return{start:-1,end:1}}))}}),we.filter((function(e){return!oe||e.__index<=(null===ge?Ie.end*f:Math.max(ge,Ie.end*f))})).map((function(e){return Object(a.createElement)(te,{gridSpacing:je,minRows:x,rowOptions:l,isScrollable:k,key:e.__index,id:He(e.__index),style:{padding:l.padding,gridTemplateColumns:je},className:"".concat(_.observableRow," ").concat(C&&ge===e.__origIndex?"".concat(_.observableRowSelected," Row-isSelected"):""),index:e.__index,forceRender:!oe,isRelevant:!oe||e.__index<=(null===ge?Ie.end*f:Math.max(ge,Ie.end*f)),onClick:function(){return C&&ve(ge===e.__origIndex?null:e.__origIndex)}},J.filter((function(e){return e.visible})).map((function(t){return Object(T.jsx)(o.a.Fragment,{children:!oe&&h&&t.canCanvas?Object(T.jsx)(ie,{origIndex:e.__origIndex,index:e.__index,id:"".concat(e.__origIndex,"_").concat(t.property,"_").concat(t.label),children:t.row(e)}):t.row(e)},"".concat(t.property,"_").concat(t.label,"_").concat(t.tooltip,"_").concat(t.width))})))})),oe&&r.length>f&&f*Ie.end-1<r.length&&Object(T.jsx)(Q,{onLoadMore:function(){Ne((function(e){return{start:e.start+1,end:e.end+1}}))}})]}),(!!ge||r.length>f&&Ie.end>3)&&Object(T.jsx)(re,{selectedIndex:ge,isAtTop:r.length>f&&Ie.end>3})]}):Object(T.jsx)(U,{children:p})]})},se=["USD","EUR","GBP","JPY","CAD","AUD","CHF","SEK","NZD"],de=["pink","green","blue","yellow","orange","purple","brown","grey","black","white"],ue=["Chocolate","Vanilla","Strawberry","Mint","Coffee","Cinnamon","Peppermint","Lemon","Hazelnut","Coconut","Pistachio","Mocha","Toffee","Peanut","Almond","Honey","Cherry"].map((function(e,t){return{id:t,name:e,color:de[t%de.length]}})),pe=function(e){var t=performance.now(),n=function(e){return be(e)}(e),r=performance.now();return console.log("Generated ".concat(e," rows in ").concat(r-t," ms")),n},be=function(e){return 0===e?[]:new Array(e).fill().map((function(e,t){var n=ue.sort((function(){return.5-Math.random()})).slice(0,Math.floor(10*Math.random()+2)),r="".concat(Math.random().toString(36).substr(0,8),".").concat(t+1);return{uuid:"uuid_".concat(t),name:r,surname:r.split("").reverse().join(""),nickname:"n1_".concat(r.substr(4,8)),streetname:"n2_".concat(t+1),description:"".concat(["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Donec pulvinar nisi pulvinar metus cursus, eget malesuada nunc auctor.","Maecenas vitae suscipit elit, ut varius diam.","Duis consectetur a erat non tempus.","Sed molestie at nibh ut ullamcorper.","Mauris hendrerit egestas quam, vitae dictum tellus condimentum ut.","Suspendisse in lorem pharetra, ornare leo id, condimentum neque. ","Vestibulum odio justo, efficitur at dictum sed, pharetra ac nisi.","Vivamus vel eleifend massa.","Aenean est nunc, iaculis a maximus ut, blandit eget lorem.","Proin et porta arcu.","Curabitur ornare est nulla, in interdum dui lacinia id.","Praesent et nunc eget ipsum blandit venenatis et et est.","Sed bibendum auctor ullamcorper.","Integer at ligula ac neque accumsan tincidunt."][Math.floor(14*Math.random())]),tiles:n,tilesHash:n.map((function(e){return e.name})).sort().join(""),price:"".concat(t+1,".0").concat(Math.floor(100*Math.random())),currency:se[Math.floor(Math.random()*se.length)]}}))},fe=n(82),je=n.n(fe),xe=function(e){var t=e.row,n=t.name,r=t.surname,a=t.nickname,o=t.streetname;return Object(T.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[Object(T.jsxs)(d.a,{style:{cursor:"pointer"},variant:"subtitle2",children:[n," ",r]}),Object(T.jsxs)(d.a,{style:{cursor:"pointer"},variant:"caption",color:"textSecondary",children:[a," ",o]})]})},me=function(e){var t=e.row.description;return Object(T.jsx)(d.a,{variant:"body2",children:t})},he=function(e){var t=e.row.tiles,n=e.selectedTiles,r=e.onSelectTile,a=void 0===r?function(){}:r,o=Object(M.a)(),i=ye(o);return Object(T.jsx)("div",{style:{display:"flex",flexWrap:"wrap",flexDirection:"row",gap:"8px 8px",padding:"4px 0px"},children:t.map((function(e){var t=e.id,r=e.name;return Object(T.jsx)("div",{onClick:function(){return a(t)},className:[i.tile,n.some((function(e){return e===t}))&&i.selectedTile].join(" "),children:r},r)}))})},ge=function(e){var t=e.row,n=t.price,r=t.currency;return Object(T.jsxs)(d.a,{style:{display:"flex",justifyContent:"flex-end"},variant:"subtitle2",children:[n," ",r]})},ve=function(){var e=Object(M.a)(),t=Oe(e);return Object(T.jsxs)("div",{className:t.actionContainer,children:[Object(T.jsx)(je.a,{color:"primary"}),Object(T.jsx)(y.a,{color:"secondary"})]})},Oe=Object(h.a)((function(){return{actionContainer:{display:"flex",justifyContent:"flex-end",gap:"8px",flexWrap:"wrap",opacity:"0.3",filter:"grayscale(70%)","&:hover":{opacity:"1",filter:"grayscale(0%)"}}}})),ye=Object(h.a)((function(e){return{tile:{border:"2px solid ".concat(e.palette.divider),borderRadius:"12px",padding:"4px 8px","&:hover":{border:"2px solid ".concat(e.palette.primary.main)}},selectedTile:{backgroundColor:e.palette.primary.main,color:"white"}}})),we=Object(h.a)((function(){return{observableGrid:{"& #Header-wrapper":{boxShadow:"none"},"& #Row-root":{borderBottom:"1px solid #CCC"},"& #Container-root > *":{borderBottom:"1px solid #CCC"},"& #Container-root > *:hover":{backgroundColor:"#e0f0ff"},"& #Container-root .Row-isSelected":{backgroundColor:"red"}},wrapper:{display:"flex",width:"100%",height:"100%",minWidth:"850px",gap:"16px",flexDirection:"column",position:"absolute",alignContent:"stretch",justifyContent:"center",alignItems:"center"},wrapper2:{display:"flex",position:"absolute",width:"100%",height:"100%",flexDirection:"column"},actions:{display:"flex",justifyContent:"space-between",gap:"16px",alignItems:"center"},smallActions:{gap:"4px"},bigContainer:{width:"90%"},container:{minWidth:"850px",position:"relative",borderRadius:"4px",maxWidth:"95%",width:"90%",border:"2px solid #333",height:"80%"}}})),Ce=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],r=t[1],o=Object(a.useState)([]),i=Object(s.a)(o,2),c=i[0],h=i[1],g=Object(a.useState)([]),O=Object(s.a)(g,2),w=O[0],S=O[1],I=Object(a.useState)(0),_=Object(s.a)(I,2),R=_[0],M=_[1],P=Object(a.useState)(""),H=Object(s.a)(P,2),A=H[0],F=H[1],W=Object(a.useState)(!1),L=Object(s.a)(W,2),B=L[0],z=L[1],U=Object(a.useState)([]),G=Object(s.a)(U,2),q=G[0],V=G[1],J=Object(a.useState)(["name","description"]),Y=Object(s.a)(J,2),K=Y[0],X=Y[1],Z=Object(a.useState)(!0),$=Object(s.a)(Z,2),Q=$[0],ee=$[1],te=Object(a.useState)(!1),ne=Object(s.a)(te,2),re=ne[0],ae=ne[1],oe=Object(a.useState)(!1),ie=Object(s.a)(oe,2),ce=ie[0],se=ie[1],de=Object(a.useMemo)((function(){return Object(x.a)({palette:{type:"light"}})}),[]),ue=we(),be=[{label:"Name2",tooltip:"Filter users by name",property:"name",canCanvas:!0,width:"minmax(200px, 1fr)",row:function(e){return Object(T.jsx)(xe,{row:e})},preHeaders:[{label:"Surname",icon:Object(T.jsx)(N.a,{}),property:"surdname"}],postHeaders:[{label:"Surneame",icon:Object(T.jsx)(N.a,{}),property:"swurname"}]},{label:"Description",canCanvas:!0,property:"description",row:function(e){return Object(T.jsx)(me,{row:e})},width:"2fr"},{label:"Tiles",canCanvas:!0,property:"tilesHash",width:"minmax(100px, 2fr)",row:function(e){return Object(T.jsx)(he,{row:e,selectedTiles:q,onSelectTile:function(e){V((function(t){return t.some((function(t){return t===e}))?t.filter((function(t){return t!==e})):[].concat(Object(l.a)(t),[e])}))}})}},{label:"Price",canCanvas:!0,property:"price",align:"flex-end",width:"110px",row:function(e){return Object(T.jsx)(ge,{row:e})}},{align:"flex-end",tooltip:"Actions for entries",noSort:!0,noSearch:!0,row:function(e){return Object(T.jsx)(ve,{row:e})},width:"1fr",noHightlight:!0}],fe=function(e){var t=Date.now(),n=pe(e),a=Date.now();M(Math.round(a-t)),n&&r(n)};return Object(a.useEffect)((function(){return fe(30)}),[]),Object(a.useEffect)((function(){A.length>0?h((function(e){return e.filter((function(e){return!(K.length>0)||K.some((function(t){return B?e[t].includes(A):e[t].toLowerCase().includes(A.toLowerCase())}))}))})):h(n)}),[A,n,K,B]),Object(a.useEffect)((function(){q.length>0?S(c.filter((function(e){return q.filter((function(t){return e.tiles.some((function(e){return e.id===t}))})).length===q.length}))):S(c)}),[q,c]),Object(T.jsx)(m.a,{theme:de,children:Object(T.jsxs)("div",{className:ue.wrapper,children:[Object(T.jsxs)("div",{className:"".concat(ue.actions," ").concat(ue.bigContainer),children:[Object(T.jsxs)("div",{className:ue.actions,children:[Object(T.jsx)(d.a,{color:"textPrimary",variant:"h3",children:"\ud83d\udc40 \ud83d\uddde\ufe0f"}),Object(T.jsx)(d.a,{color:"textPrimary",style:{border:"2px dotted #CCC",padding:"4px 12px",borderRadius:"8px",userSelect:"all",backgroundColor:"#effdef"},variant:"h6",children:"npm i react-observable-grid"})]}),Object(T.jsxs)("div",{className:"".concat(ue.actions," ").concat(ue.smallActions),children:[Object(T.jsx)(u.a,{variant:"outlined",label:"Search Rows: ".concat(w.length)}),Object(T.jsx)(u.a,{onClick:function(){return ee(!Q)},variant:"outlined",label:"Debugging: ".concat(Q?"ON":"OFF")}),Object(T.jsx)(u.a,{variant:"outlined",label:"Performance: ".concat(R,"ms")}),Object(T.jsx)(u.a,{onClick:function(){return ae(!re)},variant:"outlined",label:"\ud83e\uddea Canvas Items: ".concat(re?"ON":"OFF")}),Object(T.jsx)(u.a,{onClick:function(){return se(!ce)},variant:"outlined",label:"Env: ".concat(ce?"PROD":"DEV")})]}),Object(T.jsx)("div",{className:"".concat(ue.actions," ").concat(ue.smallActions),children:[0,2,30,40,50,100,1500,65e3,1e6].map((function(e){return Object(T.jsx)(p.a,{disableElevation:!0,style:{minWidth:"unset",padding:"5px 12px"},color:e===n.length?"primary":"default",variant:e!==n.length?"outlined":"contained",onClick:function(){return fe(e)},children:e},e)}))}),Object(T.jsxs)("div",{className:"".concat(ue.actions," ").concat(ue.smallActions),children:[Object(T.jsx)(b.a,{title:"Open NPM link ...",onClick:function(){return window.open("https://www.npmjs.com/package/react-observable-grid")},children:Object(T.jsx)(k.a,{})}),Object(T.jsx)(b.a,{title:"Open Github link ...",onClick:function(){return window.open("https://github.com/rand0mC0d3r/react-observable-grid")},children:Object(T.jsx)(C.a,{})})]})]}),Object(T.jsxs)("div",{className:"".concat(ue.actions," ").concat(ue.bigContainer),children:[Object(T.jsxs)("div",{className:ue.actions,children:[Object(T.jsx)(f.a,{placeholder:"Search in ".concat(K.join(", "),"..."),value:A,disabled:0===K.length,onChange:function(e){return F(e.target.value)},variant:"outlined",InputProps:{startAdornment:Object(T.jsx)(j.a,{position:"start",children:"\ud83d\udd0d"}),endAdornment:Object(T.jsxs)(T.Fragment,{children:[Object(T.jsx)(E.a,{style:{cursor:"pointer"},onClick:function(){return z(!B)},color:B?"primary":"disabled"}),A.length>0&&Object(T.jsx)(j.a,{onClick:function(){return F("")},position:"end",children:Object(T.jsx)(y.a,{style:{cursor:"pointer"}})})]})},style:{width:"400px"},size:"small"}),Object(T.jsx)("div",{className:"".concat(ue.actions," ").concat(ue.smallActions),children:be.filter((function(e){return!e.noSearch})).map((function(e){var t=K.some((function(t){return t===e.property}));return Object(T.jsx)(u.a,{color:t?"primary":"default",variant:"outlined",onClick:function(){K.includes(e.property)?X(K.filter((function(t){return t!==e.property}))):X([].concat(Object(l.a)(K),[e.property]))},icon:t?void 0:Object(T.jsx)(v.a,{}),onDelete:t?function(){X(K.filter((function(t){return t!==e.property})))}:void 0,label:e.label},e.property)}))})]}),Object(T.jsx)("div",{className:"".concat(ue.actions," ").concat(ue.smallActions),children:q.map((function(e){return Object(T.jsx)(u.a,{label:e},e)}))})]}),Object(T.jsx)("div",{className:ue.container,style:{height:"850px"},children:ce?Object(T.jsx)(D.a,{isDebugging:Q,headers:be,canvasDrawing:re,uniqueId:"fakeEntries",rowOptions:{padding:"8px 16px"},headerOptions:{padding:"16px 16px"},rows:w,isEmpty:0===w.length,emptyElement:Object(T.jsx)(d.a,{variant:"caption",color:"textSecondary",children:"No data found ..."})}):Object(T.jsx)(le,{isDebugging:Q,headers:be,canvasDrawing:re,uniqueId:"fakeEntries",className:ue.observableGrid,isClearingOnBlur:!1,rowOptions:{padding:"8px 16px"},headerOptions:{padding:"8px 16px"},rows:w,emptyElement:Object(T.jsx)(d.a,{variant:"caption",color:"textSecondary",children:"No data found ..."})})})]})})},Se=(n(116),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,164)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),o(e),i(e)}))}),ke=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Ie(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(Object(T.jsx)(o.a.StrictMode,{children:Object(T.jsx)(r.b,{children:Object(T.jsx)(Ce,{})})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");ke?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Ie(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):Ie(t,e)}))}}(),Se()}},[[117,1,2]]]);
//# sourceMappingURL=main.8771b14d.chunk.js.map