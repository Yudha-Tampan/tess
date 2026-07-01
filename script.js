function initLoadingScreen() {
  var screen = document.getElementById("loading-screen");
  if (!screen) return;
  window.addEventListener("load", function () {
    setTimeout(function () {
      screen.classList.add("hidden");
    }, 400);
  });
  setTimeout(function () {
    screen.classList.add("hidden");
  }, 2200);
}

function initNavbar() {
  var hamburger = document.getElementById("hamburger-btn");
  var menu = document.getElementById("nav-menu");
  var overlay = document.getElementById("nav-overlay");
  var closeBtn = document.getElementById("nav-close");

  if (!hamburger || !menu || !overlay) return;

  function openMenu() {
    menu.classList.add("open");
    overlay.classList.add("open");
    hamburger.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    menu.classList.remove("open");
    overlay.classList.remove("open");
    hamburger.classList.remove("active");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", function () {
    if (menu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener("click", closeMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
}

function initBackToTop() {
  var btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function showToast(message, iconClass) {
  var container = document.getElementById("toast-container");
  if (!container) return;

  var toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = '<i class="' + (iconClass || "fa-solid fa-circle-check") + '"></i><span>' + message + "</span>";
  container.appendChild(toast);

  setTimeout(function () {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 2600);
}

function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () {
      showToast(successMessage || "Nomor berhasil disalin.", "fa-solid fa-copy");
    }).catch(function () {
      fallbackCopy(text, successMessage);
    });
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  var input = document.createElement("textarea");
  input.value = text;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  try {
    document.execCommand("copy");
    showToast(successMessage || "Nomor berhasil disalin.", "fa-solid fa-copy");
  } catch (err) {
    showToast("Gagal menyalin nomor.", "fa-solid fa-circle-exclamation");
  }
  document.body.removeChild(input);
}

function createRipple(event) {
  var button = event.currentTarget;
  var rect = button.getBoundingClientRect();
  var size = Math.max(rect.width, rect.height);
  var ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.width = ripple.style.height = size + "px";
  ripple.style.left = (event.clientX - rect.left - size / 2) + "px";
  ripple.style.top = (event.clientY - rect.top - size / 2) + "px";
  button.appendChild(ripple);
  setTimeout(function () {
    if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
  }, 650);
}

function attachRippleToAll(selector) {
  var elements = document.querySelectorAll(selector);
  elements.forEach(function (el) {
    el.style.position = el.style.position || "relative";
    el.style.overflow = "hidden";
    el.addEventListener("click", createRipple);
  });
}

function loadSiteData(callback) {
  fetch("data.json")
    .then(function (response) {
      if (!response.ok) throw new Error("Gagal memuat data.json");
      return response.json();
    })
    .then(function (data) {
      applyGlobalData(data);
      callback(data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function applyGlobalData(data) {
  var navLogo = document.getElementById("nav-logo");
  var navTitle = document.getElementById("nav-title");
  var menuLogo = document.getElementById("nav-menu-logo");
  var menuName = document.getElementById("nav-menu-name");
  var footerText = document.getElementById("footer-text");
  var footerYear = document.getElementById("footer-year");

  if (navLogo && data.bot && data.bot.logo) navLogo.src = data.bot.logo;
  if (navTitle && data.bot && data.bot.nama) navTitle.textContent = data.bot.nama;
  if (menuLogo && data.bot && data.bot.logo) menuLogo.src = data.bot.logo;
  if (menuName && data.bot && data.bot.nama) menuName.textContent = data.bot.nama;
  if (footerText && data.footer && data.footer.teks) footerText.textContent = data.footer.teks;
  if (footerYear && data.footer && data.footer.tahun) footerYear.textContent = "© " + data.footer.tahun;
}

document.addEventListener("DOMContentLoaded", function () {
  initLoadingScreen();
  initNavbar();
  initBackToTop();
});
