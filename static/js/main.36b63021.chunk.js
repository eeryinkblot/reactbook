(this.webpackJsonpreactbook=this.webpackJsonpreactbook||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n(1),i=n.n(r),s=n(3),o=n.n(s),c=(n(13),n(14),n(4)),l=n(5),d=n(7),h=n(6),u=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).preSearchData=void 0,a.log=void 0,a.isReplay=void 0,a.toggleSearch=function(e){a.state.search?a.setState({search:!1,data:a.preSearchData}):(a.preSearchData=a.state.data,a.setState({search:!0}))},a.search=function(e){var t=e.target.value.toLowerCase();t||a.setState({data:a.preSearchData});var n=e.target.dataset.index,r=a.preSearchData.filter((function(e){return e[n].toLowerCase().indexOf(t)>-1}));a.setState({data:r})},a.sort=function(e){var t=e.target.cellIndex,n=Array.from(a.state.data),r=a.state.sortBy===t&&!a.state.descending,i=n.sort((function(e,n){return r?e[t]<n[t]?1:-1:e[t]>n[t]?1:-1}));a.setState({data:i,sortBy:t,descending:r})},a.showEditor=function(e){a.setState({edit:{row:parseInt(e.target.dataset.row,10),column:e.target.cellIndex}})},a.save=function(e){e.preventDefault();var t=e.target.firstChild,n=Array.from(a.state.data);a.state.edit&&(n[a.state.edit.row][a.state.edit.column]=t.value),a.setState({data:n,edit:null})},a.state={data:e.initialData,sortBy:null,descending:!1,edit:null,search:!1},a.preSearchData=null,a.log=[a.state],a.isReplay=!1,a}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;document.onkeydown=function(t){t.altKey&&t.shiftKey&&82===t.keyCode&&e.replay()}}},{key:"render",value:function(){return Object(a.jsxs)("div",{children:[this.renderToolbar(),this.renderTable()]})}},{key:"renderToolbar",value:function(){return Object(a.jsx)("button",{onClick:this.toggleSearch,className:"toolbar",children:this.state.search?"Suche beenden":"Suchen"})}},{key:"renderSearch",value:function(){return Object(a.jsx)("tr",{onChange:this.search,children:this.props.headers.map((function(e,t){return Object(a.jsx)("td",{children:Object(a.jsx)("input",{type:"text","data-index":t})},t)}))})}},{key:"renderTable",value:function(){var e=this,t=this.props.headers,n=this.state.data,r=this.state.edit,i=null;i=this.state.descending?" \u2193":" \u2191";var s=t.map((function(t,n){return Object(a.jsxs)("th",{children:[t,e.state.sortBy===n&&i]},n)}));return Object(a.jsxs)("table",{children:[Object(a.jsx)("thead",{onClick:this.sort,children:Object(a.jsx)("tr",{children:s})}),Object(a.jsxs)("tbody",{onDoubleClick:this.showEditor,children:[this.state.search&&this.renderSearch(),n.map((function(t,n){return Object(a.jsx)("tr",{children:t.map((function(t,i){return Object(a.jsxs)("td",{"data-row":n,children:[r&&r.row===n&&r.column===i&&Object(a.jsx)("form",{onSubmit:e.save,children:Object(a.jsx)("input",{type:"text",defaultValue:t})}),r&&(r.row!==n||r.column!==i)&&t,!r&&t]},i)}))},n)}))]})]})}},{key:"shouldComponentUpdate",value:function(e,t,n){return this.isReplay||this.log.push(t),console.log(this.log),!0}},{key:"replay",value:function(){var e=this,t=Array.from(this.log);if(0!==t.length){this.isReplay=!0;var n=-1,a=setInterval((function(){n++,e.setState(t[n]),n===t.length-1&&(clearInterval(a),e.isReplay=!1)}),1e3)}else console.log("Noch kein Status zur Wiedergabe")}}]),n}(i.a.Component),f=[["Buch","Autor","Sprache","ver\xf6ffentlicht","Verk\xe4ufe"],[["Der Herr der Ringe","J. R. R. Tolkien","Englisch","1954-1955","150 Millionen"],["Der kleine Prinz","Antoine de Saint-Exup\xe9ry","Franz\xf6sisch","1943","140 Millionen"],["Harry Potter und der Stein der Weisen","J. K. Rowling","Englisch","1997","107 Millionen"],["Und dann gabs keines mehr","Agatha Christie","Englisch","1939","100 Millionen"],["Der Traum der roten Kammer","C\xe1o Xu\xe8q\xedn","Chinesisch","1754-1791","100 Millionen"],["Der Hobbit","J. R. R. Tolkien","Englisch","1937","100 Millionen"],["Sie","H. Rider Haggard","Englisch","1887","100 Millionen"]]];var b=function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(u,{headers:f[0],initialData:f[1]})})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),i(e),s(e)}))};o.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(b,{})}),document.getElementById("root")),g()}},[[15,1,2]]]);
//# sourceMappingURL=main.36b63021.chunk.js.map