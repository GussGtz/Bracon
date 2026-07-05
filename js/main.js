// ============================================
// GRUPO BRACON — Interacciones del sitio
// ============================================

// --- Config central: edita aquí tu número y datos de contacto ---
const BRACON = {
  whatsappNumber: "529999999999", // <-- reemplaza con tu número real (formato: 52 + 10 dígitos)
  defaultMessage: "Hola Grupo Bracon, me gustaría solicitar información sobre sus servicios."
};

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initHeaderScroll();
  initMobileNav();
  initActiveLink();
  initReveal();
  initWhatsAppLinks();
  initContactForm();
  initHeroSliders();
  initBrandsCarousel();
  initParallax();
  initCounters();
  initPortfolioFilter();
  initPortfolioTouch();
  initLightbox();
});

function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.classList.toggle("active");
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
}

function initActiveLink() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current) a.classList.add("active");
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0 }
  );
  items.forEach((i, idx) => {
    i.style.setProperty("--i", idx % 6);
    observer.observe(i);
  });
}

function buildWaLink(message) {
  const text = encodeURIComponent(message || BRACON.defaultMessage);
  return `https://wa.me/${BRACON.whatsappNumber}?text=${text}`;
}

function initWhatsAppLinks() {
  document.querySelectorAll("[data-wa-link]").forEach((el) => {
    const customMsg = el.getAttribute("data-wa-message");
    el.setAttribute("href", buildWaLink(customMsg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });
}

function initHeroSliders() {
  document.querySelectorAll(".hero-slider").forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll(".hero-slide"));
    if (slides.length < 2) return;

    const hero = slider.closest(".hero");
    const dotsWrap = hero.querySelector(".hero-dots");
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll("button")) : [];
    let current = slides.findIndex((s) => s.classList.contains("active"));
    if (current < 0) current = 0;
    let timer = null;

    const show = (index) => {
      slides[current].classList.remove("active");
      dots[current] && dots[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      dots[current] && dots[current].classList.add("active");
    };

    const next = () => show(current + 1);
    const prev = () => show(current - 1);

    const restart = () => {
      clearInterval(timer);
      timer = setInterval(next, 5500);
    };

    const nextBtn = hero.querySelector(".hero-arrow.next");
    const prevBtn = hero.querySelector(".hero-arrow.prev");
    if (nextBtn) nextBtn.addEventListener("click", () => { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restart(); });
    dots.forEach((dot, i) =>
      dot.addEventListener("click", () => { show(i); restart(); })
    );

    restart();
  });
}

function initLightbox() {
  const links = Array.from(document.querySelectorAll(".gallery-grid a"));
  if (!links.length) return;

  const sources = links.map((a) => {
    const img = a.querySelector("img");
    return { src: img.src, alt: img.alt };
  });
  const total = sources.length;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Cerrar"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg></button>
    <button class="lightbox-arrow prev" aria-label="Foto anterior"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg></button>
    <button class="lightbox-arrow next" aria-label="Foto siguiente"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg></button>
    <div class="lightbox-book">
      <div class="lightbox-page lightbox-page-under"><img alt=""></div>
      <div class="lightbox-page lightbox-page-over"><img alt=""></div>
    </div>
    <div class="lightbox-counter"></div>
  `;
  document.body.appendChild(lightbox);

  const book = lightbox.querySelector(".lightbox-book");
  const pageUnder = lightbox.querySelector(".lightbox-page-under img");
  const pageOver = lightbox.querySelector(".lightbox-page-over");
  const pageOverImg = pageOver.querySelector("img");
  const counter = lightbox.querySelector(".lightbox-counter");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-arrow.prev");
  const nextBtn = lightbox.querySelector(".lightbox-arrow.next");

  let current = 0;
  let animating = false;

  const setOver = (index) => {
    pageOverImg.src = sources[index].src;
    pageOverImg.alt = sources[index].alt;
  };
  const setUnder = (index) => {
    pageUnder.src = sources[index].src;
    pageUnder.alt = sources[index].alt;
  };
  const updateCounter = () => {
    counter.textContent = `${current + 1} / ${total}`;
  };

  const resetPage = () => {
    pageOver.style.transition = "none";
    pageOver.classList.remove("turning-next", "turning-prev");
    pageOver.style.transform = "rotateY(0deg)";
    pageOver.style.transformOrigin = "left center";
    pageOver.style.removeProperty("--shadow-opacity");
    void pageOver.offsetWidth; // forzar reflow antes de reactivar la transición
    pageOver.style.transition = "";
  };

  const open = (index) => {
    current = index;
    setOver(current);
    setUnder((current + 1) % total);
    resetPage();
    updateCounter();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  const turn = (direction) => {
    if (animating || total < 2) return;
    animating = true;
    const targetIndex = (current + direction + total) % total;
    setUnder(targetIndex);
    pageOver.style.transformOrigin = direction === 1 ? "left center" : "right center";
    void pageOver.offsetWidth;
    pageOver.classList.add(direction === 1 ? "turning-next" : "turning-prev");
    pageOver.style.transform = direction === 1 ? "rotateY(-180deg)" : "rotateY(180deg)";

    const onEnd = () => {
      pageOver.removeEventListener("transitionend", onEnd);
      current = targetIndex;
      setOver(current);
      setUnder((current + 1) % total);
      resetPage();
      updateCounter();
      animating = false;
    };
    pageOver.addEventListener("transitionend", onEnd);
  };
  const next = () => turn(1);
  const prev = () => turn(-1);

  links.forEach((a, i) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      open(i);
    });
  });

  closeBtn.addEventListener("click", close);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // Arrastrar la hoja para pasar de página, como un libro real
  let startX = 0;
  let dragging = false;
  let dragDir = 0;

  const dragStart = (x) => {
    if (animating) return;
    dragging = true;
    dragDir = 0;
    startX = x;
    book.classList.add("grabbing");
    pageOver.style.transition = "none";
  };
  const dragMove = (x) => {
    if (!dragging) return;
    const delta = x - startX;
    const dir = delta < 0 ? 1 : -1;
    if (dragDir !== dir) {
      dragDir = dir;
      setUnder((current + dragDir + total) % total);
      pageOver.style.transformOrigin = dragDir === 1 ? "left center" : "right center";
    }
    const width = book.offsetWidth || 1;
    const progress = Math.min(Math.abs(delta) / width, 1);
    const angle = dragDir === 1 ? -progress * 180 : progress * 180;
    pageOver.style.transform = `rotateY(${angle}deg)`;
    pageOver.style.setProperty("--shadow-opacity", String(Math.min(progress * 1.6, 1)));
  };
  const dragEnd = () => {
    if (!dragging) return;
    dragging = false;
    book.classList.remove("grabbing");
    const m = /rotateY\((-?[0-9.]+)deg\)/.exec(pageOver.style.transform || "");
    const angle = m ? parseFloat(m[1]) : 0;
    pageOver.style.transition = "";
    if (Math.abs(angle) > 60 && dragDir !== 0) {
      animating = true;
      const finishDir = dragDir;
      pageOver.classList.add(finishDir === 1 ? "turning-next" : "turning-prev");
      pageOver.style.transform = finishDir === 1 ? "rotateY(-180deg)" : "rotateY(180deg)";
      const onEnd = () => {
        pageOver.removeEventListener("transitionend", onEnd);
        current = (current + finishDir + total) % total;
        setOver(current);
        setUnder((current + 1) % total);
        resetPage();
        updateCounter();
        animating = false;
      };
      pageOver.addEventListener("transitionend", onEnd);
    } else {
      pageOver.style.transform = "rotateY(0deg)";
      pageOver.style.setProperty("--shadow-opacity", "0");
      const onEnd = () => {
        pageOver.removeEventListener("transitionend", onEnd);
        resetPage();
      };
      pageOver.addEventListener("transitionend", onEnd);
    }
    dragDir = 0;
  };

  book.addEventListener("mousedown", (e) => { e.preventDefault(); dragStart(e.clientX); });
  window.addEventListener("mousemove", (e) => dragMove(e.clientX));
  window.addEventListener("mouseup", dragEnd);
  book.addEventListener("touchstart", (e) => dragStart(e.touches[0].clientX), { passive: true });
  book.addEventListener("touchmove", (e) => dragMove(e.touches[0].clientX), { passive: true });
  book.addEventListener("touchend", dragEnd);

  // Scroll del mouse/trackpad para pasar de página
  let wheelLock = false;
  lightbox.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (wheelLock || animating) return;
    if (e.deltaY > 15) { next(); wheelLock = true; }
    else if (e.deltaY < -15) { prev(); wheelLock = true; }
    if (wheelLock) setTimeout(() => { wheelLock = false; }, 500);
  }, { passive: false });
}

function initPortfolioFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".portfolio-item");
  if (!buttons.length || !items.length) return;

  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  const applyFilter = (filter) => {
    const perCategoryCount = {};
    items.forEach((item) => {
      const category = item.getAttribute("data-category");
      let match = filter === "all" || category === filter;
      if (match && filter === "all" && isMobile()) {
        perCategoryCount[category] = (perCategoryCount[category] || 0) + 1;
        if (perCategoryCount[category] > 2) match = false;
      }
      if (match) {
        item.style.display = "";
        requestAnimationFrame(() => item.classList.remove("is-hidden"));
      } else {
        item.classList.add("is-hidden");
        setTimeout(() => {
          if (item.classList.contains("is-hidden")) item.style.display = "none";
        }, 350);
      }
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) return;
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  const initialFilter = document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "all";
  applyFilter(initialFilter);

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const current = document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "all";
      if (current === "all") applyFilter(current);
    }, 200);
  });
}

function initPortfolioTouch() {
  if (!window.matchMedia("(hover: none)").matches) return;
  const items = document.querySelectorAll(".portfolio-item.portfolio-more");
  if (!items.length) return;

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (!item.classList.contains("touched")) {
        e.preventDefault();
        items.forEach((other) => other.classList.remove("touched"));
        item.classList.add("touched");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".portfolio-item.portfolio-more")) {
      items.forEach((item) => item.classList.remove("touched"));
    }
  });
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count-to]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute("data-count-to"), 10) || 0;
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${prefix}${value.toLocaleString("es-MX")}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => observer.observe(el));
}

function initParallax() {
  const els = Array.from(document.querySelectorAll("[data-parallax]"));
  if (!els.length) return;

  let ticking = false;

  const update = () => {
    const viewportH = window.innerHeight;
    els.forEach((el) => {
      const parent = el.parentElement;
      const rect = parent.getBoundingClientRect();
      const speed = parseFloat(el.getAttribute("data-parallax")) || 0.25;
      const centerOffset = rect.top + rect.height / 2 - viewportH / 2;
      el.style.transform = `translateY(${(-centerOffset * speed).toFixed(1)}px)`;
    });
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

function initBrandsCarousel() {
  document.querySelectorAll(".brands-carousel").forEach((carousel) => {
    const track = carousel.querySelector("[data-brands-track]");
    const wrap = carousel.querySelector(".brands-track-wrap");
    if (!track || !wrap) return;
    const cards = Array.from(track.children);
    if (!cards.length) return;

    const prevBtn = carousel.querySelector(".brands-arrow.prev");
    const nextBtn = carousel.querySelector(".brands-arrow.next");
    let index = 0;

    const cardStep = () => cards[0].getBoundingClientRect().width + 20;
    const visibleCount = () => Math.max(1, Math.floor(wrap.offsetWidth / cardStep()));
    const maxIndex = () => Math.max(0, cards.length - visibleCount());

    const render = () => {
      index = Math.min(Math.max(index, 0), maxIndex());
      track.style.transform = `translateX(-${index * cardStep()}px)`;
    };

    nextBtn && nextBtn.addEventListener("click", () => {
      index = index >= maxIndex() ? 0 : index + 1;
      render();
    });
    prevBtn && prevBtn.addEventListener("click", () => {
      index = index <= 0 ? maxIndex() : index - 1;
      render();
    });
    window.addEventListener("resize", render);
    render();
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = data.get("nombre") || "";
    const telefono = data.get("telefono") || "";
    const servicio = data.get("servicio") || "";
    const mensaje = data.get("mensaje") || "";

    const texto =
      `Hola Grupo Bracon, soy ${nombre}.\n` +
      `Teléfono: ${telefono}\n` +
      `Servicio de interés: ${servicio}\n` +
      `Mensaje: ${mensaje}`;

    window.open(buildWaLink(texto), "_blank", "noopener");
  });
}
