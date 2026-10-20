/* L'expérience verticale — comportements du site (sans dépendance) */
(function () {
  "use strict";

  /* Header sticky : apparaît après 70px de défilement, à partir de 992px de large */
  function initStickyHeader() {
    var header = document.querySelector(".oxy-sticky-header");
    if (!header) return;
    var SCROLL_OFFSET = 70;
    var MIN_WIDTH = 992;
    var body = document.body;

    function update() {
      if (body.classList.contains("oxy-nav-menu-prevent-overflow")) return;
      var absolute = getComputedStyle(header).position === "absolute";
      if (window.pageYOffset > SCROLL_OFFSET) {
        if (window.innerWidth >= MIN_WIDTH && !header.classList.contains("oxy-sticky-header-active")) {
          if (!absolute) body.style.marginTop = header.offsetHeight + "px";
          header.classList.add("oxy-sticky-header-active", "oxy-sticky-header-fade-in");
        }
      } else {
        header.classList.remove("oxy-sticky-header-fade-in", "oxy-sticky-header-active");
        if (!absolute) body.style.marginTop = "";
      }
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* Menu mobile (hamburger) */
  function initMobileMenu() {
    document.addEventListener("click", function (e) {
      var toggle = e.target.closest(".oxy-menu-toggle");
      if (toggle) {
        toggle.parentElement.classList.toggle("oxy-nav-menu-open");
        document.body.classList.toggle("oxy-nav-menu-prevent-overflow");
        document.documentElement.classList.toggle("oxy-nav-menu-prevent-overflow");
        return;
      }
      if (e.target.closest(".oxy-nav-menu-open .oxy-nav-menu-list a[href*='#']")) {
        document.querySelectorAll(".oxy-nav-menu-open").forEach(function (n) {
          n.classList.remove("oxy-nav-menu-open");
        });
        document.body.classList.remove("oxy-nav-menu-prevent-overflow");
        document.documentElement.classList.remove("oxy-nav-menu-prevent-overflow");
      }
    });
  }

  /* Blocs dépliables (« toggle » Oxygen) */
  function initToggles() {
    var toggles = document.querySelectorAll(".oxy-toggle");
    function target(t) {
      var sel = t.getAttribute("data-oxy-toggle-target");
      return sel ? document.querySelector(sel) : t.nextElementSibling;
    }
    toggles.forEach(function (t) {
      var active = t.getAttribute("data-oxy-toggle-active-class");
      var icon = t.querySelector(":scope > .oxy-expand-collapse-icon");
      if (t.getAttribute("data-oxy-toggle-initial-state") === "closed") {
        var el = target(t);
        if (el) el.hidden = true;
        if (icon) icon.classList.add("oxy-eci-collapsed");
        if (active) t.classList.remove(active);
      } else if (active) {
        t.classList.add(active);
      }
      t.addEventListener("click", function () {
        var el = target(t);
        if (active) t.classList.toggle(active);
        if (icon) icon.classList.toggle("oxy-eci-collapsed");
        if (el) el.hidden = !el.hidden;
      });
    });
  }

  /* Slider « Nos références » : fondu, 5 s par slide, transition 750 ms */
  function initSliders() {
    var DELAY = 5000;
    var SPEED = 750;
    document.querySelectorAll(".oxygen-unslider-container").forEach(function (container) {
      var list = container.querySelector("ul");
      var slides = list ? Array.prototype.slice.call(list.children) : [];
      if (slides.length < 2) return;

      var wrapper = document.createElement("div");
      wrapper.className = "unslider";
      container.parentNode.insertBefore(wrapper, container);
      wrapper.appendChild(container);
      container.classList.add("unslider-fade");
      list.classList.add("unslider-wrap");
      list.style.position = "relative";

      slides.forEach(function (li, i) {
        li.style.transition = "opacity " + SPEED + "ms ease";
        li.style.opacity = i === 0 ? "1" : "0";
        if (i === 0) {
          li.classList.add("unslider-active");
          li.style.position = "relative";
        }
      });

      var current = 0;
      var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      setInterval(function () {
        var prev = slides[current];
        current = (current + 1) % slides.length;
        var next = slides[current];
        prev.classList.remove("unslider-active");
        prev.style.opacity = "0";
        prev.style.position = "";
        next.classList.add("unslider-active");
        next.style.position = "relative";
        next.style.opacity = "1";
      }, DELAY);
    });
  }

  initStickyHeader();
  initMobileMenu();
  initToggles();
  initSliders();
})();
