/* ===========================================================
   i18n.js
   Modul pusat untuk:
   - Toggle tema gelap/terang (disimpan di localStorage)
   - Toggle bahasa Indonesia/Inggris (disimpan di localStorage)
   - Kamus terjemahan untuk semua label UI statis
   - Helper untuk mengambil field berbahasa dari data.json
     (contoh: getLang(item, "jawaban") -> otomatis pilih
     "jawaban" atau "jawaban_en" sesuai bahasa aktif)
   =========================================================== */

var THEME_KEY = "neoxr_theme";
var LANG_KEY = "neoxr_lang";

/* -----------------------------------------------------------
   Kamus terjemahan label UI statis (bukan dari data.json)
   Key harus sama persis dengan attribute data-i18n di HTML.
   ----------------------------------------------------------- */
var I18N_DICT = {
  id: {
    "nav.group.main": "Utama",
    "nav.group.layanan": "Layanan",
    "nav.group.info": "Informasi",
    "nav.beranda": "Beranda",
    "nav.fitur": "Fitur Bot",
    "nav.faq": "Tanya Jawab",
    "nav.paket": "Paket Harga",
    "nav.owner": "Owner",
    "nav.tentang": "Tentang Bot",
    "nav.lang": "Indonesia",
    "nav.theme": "Gelap",
    "nav.theme.light": "Terang",
    "nav.join": "Gabung Channel",
    "hero.badge": "Bot WhatsApp Multifungsi & Mudah",
    "hero.title.line1": "Bot WhatsApp",
    "hero.explore": "Jelajahi Fitur",
    "hero.premium": "Paket Premium",
    "hero.owner": "Owner",
    "hero.desc.suffix": ". Tersedia fitur gratis dan premium yang terjangkau.",
    "section.basic": "Paket BASIC",
    "section.vip": "Paket VIP",
    "carousel.left": "Geser kiri",
    "carousel.right": "Geser kanan",
    "footer.hemat": "hemat",
    "about.title.prefix": "Tentang ",
    "about.loading": "Memuat deskripsi bot...",
    "about.feature.heading": "Fitur Unggulan",
    "about.faq.heading": "Pertanyaan Umum",
    "pay.title": "Pembayaran",
    "pay.desc": "Pilih paket sesuai kebutuhanmu, lalu selesaikan pembayaran melalui metode yang tersedia.",
    "pay.button": "Bayar",
    "pay.modal.title": "Pilih Metode Pembayaran",
    "pay.modal.title.prefix": "Bayar: ",
    "pay.dana.name": "Dana",
    "pay.dana.desc": "Transfer ke nomor Dana",
    "pay.ovo.name": "OVO",
    "pay.ovo.desc": "Transfer ke nomor OVO",
    "pay.gopay.name": "GoPay",
    "pay.gopay.desc": "Transfer ke nomor GoPay",
    "pay.qris.name": "QRIS",
    "pay.qris.desc": "Scan kode QR untuk membayar",
    "pay.copy": "Salin Nomor",
    "pay.qris.scan": "scan untuk bayar",
    "pay.copied": "Nomor berhasil disalin.",
    "pay.copy.failed": "Gagal menyalin nomor.",
    "owner.badge": "Tim Kami",
    "owner.title": "Hubungi Owner &<br>Sub-Owner",
    "owner.desc": "Tim dukungan kami siap membantu Anda dengan berbagai pertanyaan dan permasalahan.",
    "owner.section": "Owner",
    "owner.role": "Owner Resmi",
    "owner.loading": "Memuat deskripsi owner...",
    "owner.contact": "Hubungi via WhatsApp",
    "loader.text": "booting neoxr_ai",
    "modal.close": "Tutup",
    "nav.menu.close": "Tutup menu",
    "back.to.top": "Kembali ke atas",
    "title.index": "NEOXR AI - WhatsApp Bot Assistant",
    "title.tentang": "Tentang - NEOXR AI",
    "title.owner": "Owner - NEOXR AI",
    "title.pembayaran": "Pembayaran - NEOXR AI"
  },
  en: {
    "nav.group.main": "Main",
    "nav.group.layanan": "Services",
    "nav.group.info": "Information",
    "nav.beranda": "Home",
    "nav.fitur": "Bot Features",
    "nav.faq": "FAQ",
    "nav.paket": "Pricing",
    "nav.owner": "Owner",
    "nav.tentang": "About Bot",
    "nav.lang": "English",
    "nav.theme": "Dark",
    "nav.theme.light": "Light",
    "nav.join": "Join Channel",
    "hero.badge": "Multifunctional & Easy WhatsApp Bot",
    "hero.title.line1": "WhatsApp Bot",
    "hero.explore": "Explore Features",
    "hero.premium": "Premium Plans",
    "hero.owner": "Owner",
    "hero.desc.suffix": ". Free and affordable premium features available.",
    "section.basic": "BASIC Plans",
    "section.vip": "VIP Plans",
    "carousel.left": "Scroll left",
    "carousel.right": "Scroll right",
    "footer.hemat": "save",
    "about.title.prefix": "About ",
    "about.loading": "Loading bot description...",
    "about.feature.heading": "Key Features",
    "about.faq.heading": "Frequently Asked Questions",
    "pay.title": "Payment",
    "pay.desc": "Choose a plan that fits your needs, then complete payment using one of the available methods.",
    "pay.button": "Pay",
    "pay.modal.title": "Choose a Payment Method",
    "pay.modal.title.prefix": "Pay: ",
    "pay.dana.name": "Dana",
    "pay.dana.desc": "Transfer to Dana number",
    "pay.ovo.name": "OVO",
    "pay.ovo.desc": "Transfer to OVO number",
    "pay.gopay.name": "GoPay",
    "pay.gopay.desc": "Transfer to GoPay number",
    "pay.qris.name": "QRIS",
    "pay.qris.desc": "Scan the QR code to pay",
    "pay.copy": "Copy Number",
    "pay.qris.scan": "scan to pay",
    "pay.copied": "Number copied successfully.",
    "pay.copy.failed": "Failed to copy number.",
    "owner.badge": "Our Team",
    "owner.title": "Contact Owner &<br>Sub-Owner",
    "owner.desc": "Our support team is ready to help you with any questions or issues.",
    "owner.section": "Owner",
    "owner.role": "Official Owner",
    "owner.loading": "Loading owner description...",
    "owner.contact": "Contact via WhatsApp",
    "loader.text": "booting neoxr_ai",
    "modal.close": "Close",
    "nav.menu.close": "Close menu",
    "back.to.top": "Back to top",
    "title.index": "NEOXR AI - WhatsApp Bot Assistant",
    "title.tentang": "About - NEOXR AI",
    "title.owner": "Owner - NEOXR AI",
    "title.pembayaran": "Payment - NEOXR AI"
  }
};

/* -----------------------------------------------------------
   Tema
   ----------------------------------------------------------- */
function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || "dark";
  } catch (e) {
    return "dark";
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {}
}

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  updateThemeButtons(theme);
}

function updateThemeButtons(theme) {
  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    var icon = btn.querySelector("i");
    var label = btn.querySelector("span");
    var lang = getStoredLang();
    if (theme === "light") {
      if (icon) icon.className = "fa-solid fa-sun";
      if (label) label.textContent = t("nav.theme.light", lang);
      btn.classList.add("is-active");
    } else {
      if (icon) icon.className = "fa-solid fa-moon";
      if (label) label.textContent = t("nav.theme", lang);
      btn.classList.remove("is-active");
    }
  });
}

function toggleTheme() {
  var current = getStoredTheme();
  var next = current === "light" ? "dark" : "light";
  setStoredTheme(next);
  applyTheme(next);
}

/* -----------------------------------------------------------
   Bahasa
   ----------------------------------------------------------- */
function getStoredLang() {
  try {
    return localStorage.getItem(LANG_KEY) || "id";
  } catch (e) {
    return "id";
  }
}

function setStoredLang(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {}
}

function t(key, lang) {
  lang = lang || getStoredLang();
  var dict = I18N_DICT[lang] || I18N_DICT.id;
  return dict[key] !== undefined ? dict[key] : (I18N_DICT.id[key] || key);
}

/* Ambil field berbahasa dari objek data.json.
   Contoh: getLang(faqItem, "jawaban") akan mengambil
   "jawaban_en" jika bahasa aktif english dan field itu ada,
   jika tidak fallback ke "jawaban". */
function getLang(obj, field, lang) {
  lang = lang || getStoredLang();
  if (!obj) return "";
  if (lang === "en") {
    var enField = field + "_en";
    if (obj[enField] !== undefined && obj[enField] !== "") return obj[enField];
  }
  return obj[field] !== undefined ? obj[field] : "";
}

function applyStaticTranslations(lang) {
  lang = lang || getStoredLang();
  document.documentElement.setAttribute("lang", lang === "en" ? "en" : "id");

  var titleKey = document.body.getAttribute("data-page-title");
  if (titleKey) {
    document.title = t(titleKey, lang);
  }

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    var value = t(key, lang);
    if (el.hasAttribute("data-i18n-html")) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    var key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key, lang));
  });

  document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
    var key = el.getAttribute("data-i18n-aria");
    el.setAttribute("aria-label", t(key, lang));
  });

  updateLangButtons(lang);
}

function updateLangButtons(lang) {
  document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
    var label = btn.querySelector("span");
    if (label) label.textContent = t("nav.lang", lang);
  });
}

/* Event dipicu setiap kali bahasa berubah, supaya halaman bisa
   render ulang konten dinamis (dari data.json) dalam bahasa baru. */
function toggleLang() {
  var current = getStoredLang();
  var next = current === "id" ? "en" : "id";
  setStoredLang(next);
  applyStaticTranslations(next);
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: next } }));
}

/* -----------------------------------------------------------
   Inisialisasi tombol-tombol preferensi (tema & bahasa)
   ----------------------------------------------------------- */
function initPrefButtons() {
  var buttons = document.querySelectorAll(".nav-pref-row .nav-pref-btn");
  if (buttons.length >= 2) {
    var langBtn = buttons[0];
    var themeBtn = buttons[1];

    langBtn.setAttribute("data-lang-toggle", "");
    themeBtn.setAttribute("data-theme-toggle", "");

    langBtn.addEventListener("click", toggleLang);
    themeBtn.addEventListener("click", toggleTheme);
  }

  applyTheme(getStoredTheme());
  updateLangButtons(getStoredLang());
}

/* Terapkan tema sesegera mungkin (sebelum DOMContentLoaded)
   supaya tidak ada "flash" tema gelap->terang saat load. */
(function initThemeEarly() {
  var theme = getStoredTheme();
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  applyStaticTranslations(getStoredLang());
  initPrefButtons();
});
