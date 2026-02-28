document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll("[data-reveal]");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const eventCards = document.querySelectorAll("[data-category]");
  const scrollLinks = document.querySelectorAll("[data-scroll]");

  // Reveal animations using Intersection Observer
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  revealTargets.forEach((el) => observer.observe(el));

  // Category filters on events page
  if (filterButtons.length && eventCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");

        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        eventCards.forEach((card) => {
          const category = card.getAttribute("data-category");
          const show = filter === "all" || category === filter;
          card.style.display = show ? "flex" : "none";
        });
      });
    });
  }

  // Smooth scroll for in-page register buttons
  if (scrollLinks.length) {
    scrollLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (!targetId || !targetId.startsWith("#")) return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }
});
