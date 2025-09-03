document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("bookingForm");
  const confirmation = document.getElementById("confirmation");
  const languageSelector = document.getElementById("languageSelector");

  const API_BASE = (function() {
    // Use environment config if available
    if (window.ENV && window.ENV.API_BASE) {
      return window.ENV.API_BASE.replace(/\/$/, '');
    }
    // Fallback for local development
    const origin = window.location.origin;
    if (origin === 'null' || origin.startsWith('file:')) return 'http://localhost:3001';
    return '';
  })();

  const textContent = {
    en: {
      title: "GROPATShift – Shift Booking",
      welcome: "Book your work shift easily — No login required.",
      name: "Full Name",
      email: "Email",
      date: "Shift Date",
      time: "Shift Time",
      submit: "Book Shift",
      success: (n, d, t) => `Thanks ${n}. Your shift on ${d} (${t}) was booked.`,
      footer: "GROPATShift © 2025 | Region: Germany, Europe",
    },
    de: {
      title: "GROPATShift – Schichtbuchung",
      welcome: "Buchen Sie Ihre Arbeitsschicht ganz einfach — Kein Login erforderlich.",
      name: "Vollständiger Name",
      email: "E-Mail",
      date: "Schichtdatum",
      time: "Schichtzeit",
      submit: "Schicht buchen",
      success: (n, d, t) => `Danke ${n}. Ihre Schicht am ${d} (${t}) wurde gebucht.`,
      footer: "GROPATShift © 2025 | Region: Deutschland, Europa",
    },
  };

  function applyLanguage(lang) {
    const txt = textContent[lang];
    document.querySelector("header h1").textContent = txt.title;
    document.querySelector("header p").textContent = txt.welcome;
    document.querySelector("label[for='name']").textContent = `👤 ${txt.name}:`;
    document.querySelector("label[for='email']").textContent = `📧 ${txt.email}:`;
    document.querySelector("label[for='date']").textContent = `📅 ${txt.date}:`;
    document.querySelector("label[for='time']").textContent = `🕒 ${txt.time}:`;
    document.querySelector("button[type='submit']").textContent = txt.submit;
    document.querySelector("footer p").textContent = txt.footer;
  }

  // initialize language from selector on load
  applyLanguage(languageSelector.value || "en");

  // Language switcher
  languageSelector.addEventListener("change", function () {
    applyLanguage(this.value);
  });

  // Form submit handler
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Basic client-side validation
    if (!name || !email || !date || !time) {
      confirmation.textContent = "Please complete all required fields.";
      confirmation.classList.remove("hidden");
      confirmation.classList.add("confirmation");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, date, time })
      });

      const lang = languageSelector.value || "en";

      if (res.ok) {
        const msg = textContent[lang].success(name, date, time);
        confirmation.textContent = msg;
        confirmation.classList.remove("hidden");
        confirmation.classList.add("confirmation");
        form.reset();
        applyLanguage(lang);
      } else {
        const data = await res.json().catch(() => ({}));
        let errorMsg = data.message || "Booking failed. Please try again.";
        
        // Handle specific conflict message
        if (res.status === 409) {
          errorMsg = lang === 'de' 
            ? "Diese Schichtzeit ist bereits gebucht. Bitte wählen Sie eine andere Zeit."
            : "This shift time is already booked. Please choose a different time.";
        }
        
        confirmation.textContent = errorMsg;
        confirmation.classList.remove("hidden");
        confirmation.classList.add("confirmation");
      }
    } catch (err) {
      const lang = languageSelector.value || "en";
      const errorMsg = lang === 'de' 
        ? "Netzwerkfehler. Bitte versuchen Sie es erneut."
        : "Network error. Please try again.";
      confirmation.textContent = errorMsg;
      confirmation.classList.remove("hidden");
      confirmation.classList.add("confirmation");
    }
  });
});
