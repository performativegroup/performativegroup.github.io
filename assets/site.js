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
})();
