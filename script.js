document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("bookingForm");
  const confirmation = document.getElementById("confirmation");
  const languageSelector = document.getElementById("languageSelector");

  const textContent = {
    en: {
      title: "GROPATShift 1 Shift Booking",
      welcome: "Book your work shift easily — No login required.",
      name: "Full Name",
      email: "Email",
      date: "Shift Date",
      time: "Shift Time",
      location: "Location",
      submit: "Book Shift",
      success: (n, d, t, l) => `Thanks ${n}. Your shift on ${d} (${t}) at ${l} was booked.`,
      footer: "GROPATShift © 2025 | Region: Germany, Europe",
    },
    de: {
      title: "GROPATShift 1 Schichtbuchung",
      welcome: "Buchen Sie Ihre Arbeitsschicht ganz einfach — Kein Login erforderlich.",
      name: "Vollständiger Name",
      email: "E-Mail",
      date: "Schichtdatum",
      time: "Schichtzeit",
      location: "Ort",
      submit: "Schicht buchen",
      success: (n, d, t, l) => `Danke ${n}. Ihre Schicht am ${d} (${t}) in ${l} wurde gebucht.`,
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
    document.querySelector("label[for='location']").textContent = `📍 ${txt.location}:`;
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
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value;

    // Basic client-side validation
    if (!name || !email || !date || !time || !location) {
      confirmation.textContent = "Please complete all required fields.";
      confirmation.classList.remove("hidden");
      return;
    }

    // TODO: send data to backend here (fetch/post)

    // Show localized confirmation
    const lang = languageSelector.value || "en";
    const msg = textContent[lang].success(name, date, time, location);
    confirmation.textContent = msg;
    confirmation.classList.remove("hidden");

    form.reset();
    applyLanguage(lang); // reset labels to current language after reset
  });
});
