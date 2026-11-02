(function () {
  var root = document.documentElement;
  var LANGS = ["uk", "en"];

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = "uk";
    root.setAttribute("lang", lang);
    try { localStorage.setItem("cu-lang", lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem("cu-lang"); } catch (e) {}
  var fromUrl = new URLSearchParams(location.search).get("lang");
  // First visit: Ukrainian/Russian browsers get Ukrainian, everyone else English.
  var nav = (navigator.languages && navigator.languages[0]) || navigator.language || "";
  var auto = /^(uk|ru)/i.test(nav) ? "uk" : "en";
  setLang(fromUrl || saved || auto);

  document.querySelectorAll(".lang [data-set]").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-set")); });
  });

  // mobile menu
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  // reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();
