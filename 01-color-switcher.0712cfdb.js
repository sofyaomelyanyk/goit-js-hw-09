!function(){var t=document.querySelector("body"),e=document.querySelector("button[data-start]"),r=document.querySelector("button[data-stop]");e.addEventListener("click",(function(){n=setInterval((function(){var e="#".concat(Math.floor(16777215*Math.random()).toString(16));t.style.background=e}),1e3),e.setAttribute("disabled",!0),r.removeAttribute("disabled")})),r.addEventListener("click",(function(){clearInterval(n),e.removeAttribute("disabled"),r.setAttribute("disabled",!0)}));var n=null}();
//# sourceMappingURL=01-color-switcher.0712cfdb.js.map