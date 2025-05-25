document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("shiftForm");
  const confirmation = document.getElementById("confirmation");
  const languageSelector = document.getElementById("languageSelector");

  const textContent = {
    en: {
      title: "GROPATShift – Shift Booking",
      welcome: "Book your work shift easily – No login required.",
      name: "Full Name",
      date: "Shift Date",
      time: "Shift Time",
      location: "Location",
      submit: "Book Shift",
      success: "Your shift has been booked successfully!",
      footer: "GROPATShift © 2025 | Region: Germany, Europe",
    },
    de: {
      title: "GROPATShift – Schichtbuchung",
      welcome: "Buchen Sie Ihre Arbeitsschicht ganz einfach – Kein Login erforderlich.",
      name: "Vollständiger Name",
      date: "Schichtdatum",
      time: "Schichtzeit",
      location: "Ort",
      submit: "Schicht buchen",
      success: "Ihre Schicht wurde erfolgreich gebucht!",
      footer: "GROPATShift © 2025 | Region: Deutschland, Europa",
    },
  };

  // Language switcher
  languageSelector.addEventListener("change", function () {
    const lang = this.value;
    document.querySelector("header h1").textContent = textContent[lang].title;
    document.querySelector("header p").textContent = textContent[lang].welcome;
    document.querySelector("label[for='name']").textContent = textContent[lang].name;
    document.querySelector("label[for='date']").textContent = textContent[lang].date;
    document.querySelector("label[for='time']").textContent = textContent[lang].time;
    document.querySelector("label[for='location']").textContent = textContent[lang].location;
    document.querySelector("button").textContent = textContent[lang].submit;
    document.querySelector("footer").textContent = textContent[lang].footer;
  });

  // Form submit handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Here, you'd send data to a backend if connected
    confirmation.classList.remove("hidden");
    form.reset();
  });
});
