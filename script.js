document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll("[data-reveal]");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const eventCards = document.querySelectorAll("[data-category]");
  const scrollLinks = document.querySelectorAll("[data-scroll]");
  const countdownEl = document.querySelector("#countdown");

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

  // Countdown timer for the main hero
  if (countdownEl) {
    const targetTime = new Date("2026-03-07T09:30:00+05:30").getTime();
    const unitMap = {
      days: countdownEl.querySelector('[data-unit="days"]'),
      hours: countdownEl.querySelector('[data-unit="hours"]'),
      minutes: countdownEl.querySelector('[data-unit="minutes"]'),
      seconds: countdownEl.querySelector('[data-unit="seconds"]'),
    };

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      if (unitMap.days)
        unitMap.days.textContent = String(days).padStart(2, "0");
      if (unitMap.hours)
        unitMap.hours.textContent = String(hours).padStart(2, "0");
      if (unitMap.minutes)
        unitMap.minutes.textContent = String(minutes).padStart(2, "0");
      if (unitMap.seconds)
        unitMap.seconds.textContent = String(seconds).padStart(2, "0");
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
});
