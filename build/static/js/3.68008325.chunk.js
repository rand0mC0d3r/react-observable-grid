(this.webpackJsonpsample=this.webpackJsonpsample||[]).push([[3],{201:function(e,t,i){"use strict";i.r(t);var l=i(80),n=i(22),o=i(37),r=i(39),c=i.n(r),a=i(3),s=i(0),d=i(1),p=function(e){var t=e.selectedIndex,i=e.isAtTop,o=e.customActions,r=e.total,p=e.filtered,u=Object(n.a)(),x=b(u),f=[{id:"first",onClick:function(){return m("first")},title:"Scroll to beginning",label:"\u2191",visible:i},{id:"selected",onClick:function(){return m("selected")},title:"Scroll to item: ".concat(t+1),label:"\u2192 ".concat(t+1),visible:t},{id:"filtered",title:"Filtered rows: ".concat(p),label:Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(c.a,{style:{fontSize:"18px"}})," ",p]}),visible:p!==r&&r>0},{id:"total",title:"Total rows: ".concat(r),label:r,visible:r>0}],m=function(e){var t=document.getElementById(e);t&&t.scrollIntoView({behavior:"smooth",block:"center"})};return Object(d.jsxs)("div",{className:x.root,children:[f.filter((function(e){return e.visible})).map((function(e){var t=e.id,i=e.label,n=e.title,o=e.onClick;return Object(s.createElement)(l.a,{title:n,key:t,arrow:!0},Object(d.jsx)("div",{onClick:o&&o,className:Object(a.a)([x.item,o&&x.actionItem]),children:i}))})),o]})},b=Object(o.a)((function(e){return{root:{position:"absolute",bottom:e.spacing(2),right:e.spacing(2),display:"flex",gap:"8px",zIndex:"1",alignItems:"flex-end"},actionItem:{cursor:"pointer"},item:{fontWeight:"bold",border:"1px solid ".concat(e.palette.divider),padding:"10px 16px",display:"flex",alignItems:"center",borderRadius:e.shape.borderRadius,backdropFilter:"blur(4px)",lineHeight:"16px",gap:e.spacing(.5),userSelect:"none","&:hover":{backdropFilter:"blur(4px) brightness(1.05)",boxShadow:"inset 0px 0px 0px 1px ".concat(e.palette.divider)}}}}));p.defaultProps={total:0,filtered:0},t.default=p}}]);
//# sourceMappingURL=3.68008325.chunk.js.map