/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/unfetch";
exports.ids = ["vendor-chunks/unfetch"];
exports.modules = {

/***/ "(ssr)/./node_modules/unfetch/dist/unfetch.js":
/*!**********************************************!*\
  !*** ./node_modules/unfetch/dist/unfetch.js ***!
  \**********************************************/
/***/ ((module) => {

eval("module.exports=function(e,n){return n=n||{},new Promise(function(t,r){var s=new XMLHttpRequest,o=[],u=[],i={},a=function(){return{ok:2==(s.status/100|0),statusText:s.statusText,status:s.status,url:s.responseURL,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},clone:a,headers:{keys:function(){return o},entries:function(){return u},get:function(e){return i[e.toLowerCase()]},has:function(e){return e.toLowerCase()in i}}}};for(var l in s.open(n.method||\"get\",e,!0),s.onload=function(){s.getAllResponseHeaders().replace(/^(.*?):[^\\S\\n]*([\\s\\S]*?)$/gm,function(e,n,t){o.push(n=n.toLowerCase()),u.push([n,t]),i[n]=i[n]?i[n]+\",\"+t:t}),t(a())},s.onerror=r,s.withCredentials=\"include\"==n.credentials,n.headers)s.setRequestHeader(l,n.headers[l]);s.send(n.body||null)})};\n//# sourceMappingURL=unfetch.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdW5mZXRjaC9kaXN0L3VuZmV0Y2guanMiLCJtYXBwaW5ncyI6IkFBQUEsNkJBQTZCLGNBQWMsMkJBQTJCLHVDQUF1QyxjQUFjLE9BQU8saUdBQWlHLHVDQUF1QyxpQkFBaUIsd0RBQXdELGlCQUFpQiwrQ0FBK0Msa0JBQWtCLGdCQUFnQixTQUFTLG9CQUFvQixTQUFTLGlCQUFpQiwwQkFBMEIsaUJBQWlCLCtCQUErQiw4REFBOEQsaUZBQWlGLCtEQUErRCxTQUFTLHFHQUFxRyxxQkFBcUI7QUFDdjRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQtbmV4dC8uL25vZGVfbW9kdWxlcy91bmZldGNoL2Rpc3QvdW5mZXRjaC5qcz8xNzZjIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKGUsbil7cmV0dXJuIG49bnx8e30sbmV3IFByb21pc2UoZnVuY3Rpb24odCxyKXt2YXIgcz1uZXcgWE1MSHR0cFJlcXVlc3Qsbz1bXSx1PVtdLGk9e30sYT1mdW5jdGlvbigpe3JldHVybntvazoyPT0ocy5zdGF0dXMvMTAwfDApLHN0YXR1c1RleHQ6cy5zdGF0dXNUZXh0LHN0YXR1czpzLnN0YXR1cyx1cmw6cy5yZXNwb25zZVVSTCx0ZXh0OmZ1bmN0aW9uKCl7cmV0dXJuIFByb21pc2UucmVzb2x2ZShzLnJlc3BvbnNlVGV4dCl9LGpzb246ZnVuY3Rpb24oKXtyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHMucmVzcG9uc2VUZXh0KS50aGVuKEpTT04ucGFyc2UpfSxibG9iOmZ1bmN0aW9uKCl7cmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbcy5yZXNwb25zZV0pKX0sY2xvbmU6YSxoZWFkZXJzOntrZXlzOmZ1bmN0aW9uKCl7cmV0dXJuIG99LGVudHJpZXM6ZnVuY3Rpb24oKXtyZXR1cm4gdX0sZ2V0OmZ1bmN0aW9uKGUpe3JldHVybiBpW2UudG9Mb3dlckNhc2UoKV19LGhhczpmdW5jdGlvbihlKXtyZXR1cm4gZS50b0xvd2VyQ2FzZSgpaW4gaX19fX07Zm9yKHZhciBsIGluIHMub3BlbihuLm1ldGhvZHx8XCJnZXRcIixlLCEwKSxzLm9ubG9hZD1mdW5jdGlvbigpe3MuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkucmVwbGFjZSgvXiguKj8pOlteXFxTXFxuXSooW1xcc1xcU10qPykkL2dtLGZ1bmN0aW9uKGUsbix0KXtvLnB1c2gobj1uLnRvTG93ZXJDYXNlKCkpLHUucHVzaChbbix0XSksaVtuXT1pW25dP2lbbl0rXCIsXCIrdDp0fSksdChhKCkpfSxzLm9uZXJyb3I9cixzLndpdGhDcmVkZW50aWFscz1cImluY2x1ZGVcIj09bi5jcmVkZW50aWFscyxuLmhlYWRlcnMpcy5zZXRSZXF1ZXN0SGVhZGVyKGwsbi5oZWFkZXJzW2xdKTtzLnNlbmQobi5ib2R5fHxudWxsKX0pfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVuZmV0Y2guanMubWFwXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/unfetch/dist/unfetch.js\n");

/***/ })

};
;