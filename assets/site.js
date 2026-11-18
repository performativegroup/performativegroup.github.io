// Shared by every page: the nav's hairline when you scroll, the phone menu, and gentle reveals.
(() => {
  const nav = document.querySelector("nav.top");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    const btn = nav.querySelector(".menu-btn");
    if (btn) {
      btn.addEventListener("click", () => { const open = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", open); });
      nav.querySelectorAll(".sheet a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
    }
  }
  const items = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    items.forEach(el => io.observe(el));
  } else items.forEach(el => el.classList.add("in"));
  const y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
  // Long legal pages: an "On this page" list built from their section headings, the one you're reading in black.
  const doc = document.querySelector("main.doc[data-toc]");
  const heads = doc ? [...doc.querySelectorAll(":scope > h2[id]")] : [];
  if (heads.length >= 5) {
    const toc = document.createElement("nav");
    toc.className = "toc"; toc.setAttribute("aria-label", "On this page");
    toc.innerHTML = '<div class="eyebrow">On this page</div>';
    heads.forEach(h => { const a = document.createElement("a"); a.href = "#" + h.id; a.textContent = h.textContent; toc.appendChild(a); });
    doc.prepend(toc); doc.classList.add("has-toc");
    const links = new Map([...toc.querySelectorAll("a")].map(a => [a.hash.slice(1), a]));
    if ("IntersectionObserver" in window) {
      const seen = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(a => a.classList.remove("on")); links.get(e.target.id)?.classList.add("on");
      }), { rootMargin: "-20% 0px -70% 0px" });
      heads.forEach(h => seen.observe(h));
    }
  }
})();
