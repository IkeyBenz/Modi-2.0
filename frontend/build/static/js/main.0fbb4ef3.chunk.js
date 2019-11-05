(window.webpackJsonpfrontend=window.webpackJsonpfrontend||[]).push([[0],{49:function(e,a,t){e.exports=t(94)},55:function(e,a,t){},85:function(e,a){},94:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(43),o=t.n(c),s=t(46),l=t(8);t(54),t(55),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i,m=function(){var e=localStorage.getItem("modi-username");return e&&""!==e||(e=prompt("Enter a username:"))&&localStorage.setItem("modi-username",e),r.a.createElement("div",{className:"container-fluid"},r.a.createElement("h1",{className:"text-center"},"Modi"),r.a.createElement("div",{className:"white-line"}),r.a.createElement("div",{className:"my-5"}),r.a.createElement("div",{className:"d-flex justify-content-around"},r.a.createElement("a",{className:"btn btn-secondary",href:"/create-lobby"},"Create Lobby"),r.a.createElement("a",{className:"btn btn-primary",href:"/lobbies"},"Join Lobby")))},u=t(6),d=t.n(u),b=t(11),p=t(12),f=t(18),E=t.n(f),h=t(44),v=t(45),y=t(14),N=t.n(y),g=function(){var e=Object(b.a)(d.a.mark((function e(a,t){var n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=N.a.join("/","lobbies",a,"make-game"),r={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({connectionId:t})},e.next=4,fetch(n,r);case 4:return e.next=6,e.sent.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}();var w,j=function(e){var a=e.match,t=Object(n.useState)({}),c=Object(p.a)(t,2),o=c[0],s=c[1],l=o.lobbyName,m=o.players,u=o.creator,f=a.params.id;sessionStorage.getItem("modi-".concat(f,"-username"))||sessionStorage.setItem("modi-".concat(f,"-username"),prompt("Enter your username:")),!i&&(i=E()("/lobbies/".concat(f))),i.on("connect",(function(){i.emit("join-attempt",sessionStorage.getItem("modi-".concat(f,"-username"))),i.on("updated-lobby",s),i.on("player-id",(function(e){sessionStorage.setItem("modi-".concat(f,"-playerId"),e),window.location.replace("/games/".concat(f))}))}));var y=i.id===u,N=function(){var e=Object(b.a)(d.a.mark((function e(){var a,t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y){e.next=2;break}return e.abrupt("return",alert("You are not the lobby admin!"));case 2:return e.next=4,g(f,i.id);case 4:a=e.sent,t=a.error,a.gameId,t&&alert(t);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card mt-3"},r.a.createElement("div",{className:"card-header"},l&&r.a.createElement("h3",{className:"card-title"},l)),r.a.createElement("div",{className:"card-body"},r.a.createElement("ul",{className:"list-group"},m&&Object.keys(m).map((function(e){return r.a.createElement("li",{key:e,className:"list-group-item"},e===u&&r.a.createElement(h.a,{icon:v.a})," ",m[e])})))),r.a.createElement("div",{className:"card-footer d-flex justify-content-between"},r.a.createElement("a",{className:"btn btn-danger",href:"/lobbies"},"\u2190 Back"),y&&r.a.createElement("button",{className:"btn btn-primary",onClick:N},"Start \u2192"))))};var x=function(){var e=Object(n.useState)([]),a=Object(p.a)(e,2),t=a[0],c=a[1];return!w&&(w=E()("localhost:5000/lobbies")),w.on("connect",(function(){w.on("lobbies-changed",c)})),r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card mt-3"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h3",{className:"card-title"},"Join Lobby:")),r.a.createElement("div",{className:"card-body"},r.a.createElement("ol",{className:"list-group"},t.map((function(e,a){var t=e.id,n=e.name;return r.a.createElement("li",{key:t,className:"list-group-item d-flex justify-content-between"},a+1,") ",n,r.a.createElement("a",{className:"btn btn-primary",href:"/lobbies/".concat(t)},"Join \u2192"))})),!t.length&&r.a.createElement("h6",{className:"text-muted"},"There are no lobbies available to join. ",r.a.createElement("a",{href:"/create-lobby"},"Create One")))),r.a.createElement("div",{className:"card-footer"},r.a.createElement("a",{className:"btn btn-danger",href:"/"},"\u2190 Back"))))},k=function(e){var a=N.a.join("/","create-lobby"),t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({lobbyName:e})};return fetch(a,t).then((function(e){return e.json()}))},O=function(){var e=Object(n.useState)(""),a=Object(p.a)(e,2),t=a[0],c=a[1],o=function(){var e=Object(b.a)(d.a.mark((function e(){var a,n,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k(t);case 2:if(a=e.sent,a.success,n=a.error,r=a.lobbyId,!n){e.next=8;break}return e.abrupt("return",alert("Error: ".concat(n)));case 8:window.location.replace("/lobbies/".concat(r));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"container-fluid"},r.a.createElement("div",{className:"card mt-3"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h3",{className:"card-title"},"Create Lobby:")),r.a.createElement("div",{className:"card-body"},r.a.createElement("div",{className:"input-group"},r.a.createElement("input",{className:"form-control",type:"text",value:t,placeholder:"Enter lobby name...",onChange:function(e){return c(e.target.value)}}),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{className:"btn btn-primary",onClick:o,disabled:""===t},"Create \u2192"))),r.a.createElement("div",{className:"card-footer"},r.a.createElement("a",{className:"btn btn-danger",href:"/"},"\u2190 Back")))))};o.a.render(r.a.createElement(s.a,null,r.a.createElement(l.a,{exact:!0,path:"/",component:m}),r.a.createElement(l.a,{exact:!0,path:"/create-lobby",component:O}),r.a.createElement(l.a,{exact:!0,path:"/lobbies",component:x}),r.a.createElement(l.a,{path:"/lobbies/:id",component:j})),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[49,1,2]]]);
//# sourceMappingURL=main.0fbb4ef3.chunk.js.map