document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     1️⃣ FIRST COUNTDOWN (Merged)
  =============================== */

  const countdown = () => {
    const targetDate = new Date("March 7, 2026 09:30:00").getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const dayEl = document.querySelector('[data-unit="days"]');
    const hourEl = document.querySelector('[data-unit="hours"]');
    const minEl = document.querySelector('[data-unit="minutes"]');
    const secEl = document.querySelector('[data-unit="seconds"]');

    if (dayEl) dayEl.innerText = d < 10 ? '0' + d : d;
    if (hourEl) hourEl.innerText = h < 10 ? '0' + h : h;
    if (minEl) minEl.innerText = m < 10 ? '0' + m : m;
    if (secEl) secEl.innerText = s < 10 ? '0' + s : s;
  };

  countdown();
  setInterval(countdown, 1000);


  /* ===============================
     2️⃣ EXISTING LOGIC (UNCHANGED)
  =============================== */

  const revealTargets = document.querySelectorAll("[data-reveal]");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const eventCards = document.querySelectorAll("[data-category]");
  const scrollLinks = document.querySelectorAll("[data-scroll]");
  const countdownEl = document.querySelector("#countdown");
  const sectionDividers = document.querySelectorAll(".section-divider");

  // Reveal animations
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
    }
  );

  revealTargets.forEach((el) => observer.observe(el));

  // Category filters
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

        sectionDividers.forEach((divider) => {
          if (filter === "all") {
            divider.style.display = "block";
          } else {
            divider.style.display = "none";
          }
        });
      });
    });
  }

  // Smooth scroll
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

  // Existing countdown (UNCHANGED)
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

