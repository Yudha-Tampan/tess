var siteData = null;
var activePackageName = "";
var activePackageNameEn = "";

function buildPaymentCard(pkg, badgeText, botImage, lang) {
  var card = document.createElement("div");
  card.className = "glass-card pay-card pkg-card";

  var tagHtml = "";
  if (pkg.hemat) {
    tagHtml = '<span class="pkg-tag">' + t("footer.hemat", lang) + " " + pkg.hemat + "</span>";
  } else {
    tagHtml = '<span class="pkg-tag">' + badgeText + "</span>";
  }

  var durasi = getLang(pkg, "durasi", lang);
  var durasiId = pkg.durasi;

  card.innerHTML =
    tagHtml +
    '<div class="pkg-icon"><img src="' + botImage + '" alt="' + pkg.nama + '" loading="lazy"></div>' +
    '<div class="pay-name">' + pkg.nama + "</div>" +
    '<div class="pay-duration">' + durasi + "</div>" +
    '<div class="pay-price">' + pkg.harga + "</div>" +
    '<button class="btn-bayar" data-pkg-name="' + pkg.nama + " (" + durasiId + ')" data-pkg-name-en="' + pkg.nama + " (" + (pkg.durasi_en || pkg.durasi) + ')">' + t("pay.button", lang) + "</button>";

  return card;
}

function renderPaymentCarousel(containerId, packages, badgeText, botImage, lang) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  packages.forEach(function (pkg) {
    container.appendChild(buildPaymentCard(pkg, badgeText, botImage, lang));
  });
}

function initPaymentCarouselControls() {
  var buttons = document.querySelectorAll(".carousel-btn");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.getAttribute("data-target");
      var dir = parseInt(btn.getAttribute("data-dir"), 10);
      var track = document.getElementById(targetId);
      if (!track) return;
      track.scrollBy({ left: dir * 210, behavior: "smooth" });
    });
  });
}

function initBayarButtons() {
  var buttons = document.querySelectorAll(".btn-bayar");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      createRipple(event);
      activePackageName = btn.getAttribute("data-pkg-name");
      activePackageNameEn = btn.getAttribute("data-pkg-name-en") || activePackageName;
      openPaymentModal();
    });
  });
}

function openPaymentModal() {
  var modal = document.getElementById("payment-modal");
  var title = document.getElementById("modal-package-name");
  var lang = getStoredLang();
  var name = lang === "en" ? activePackageNameEn : activePackageName;
  if (title) title.textContent = t("pay.modal.title.prefix", lang) + name;
  if (modal) modal.classList.add("open");
  document.body.style.overflow = "hidden";
  closeAllDetailPanels();
}

function closePaymentModal() {
  var modal = document.getElementById("payment-modal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
  closeAllDetailPanels();

  var title = document.getElementById("modal-package-name");
  if (title) title.textContent = t("pay.modal.title", getStoredLang());
}

function closeAllDetailPanels() {
  document.querySelectorAll(".detail-panel").forEach(function (panel) {
    panel.classList.remove("show");
  });
}

function initModalClose() {
  var closeBtn = document.getElementById("modal-close");
  var modal = document.getElementById("payment-modal");
  if (closeBtn) closeBtn.addEventListener("click", closePaymentModal);
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closePaymentModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePaymentModal();
      closeQrisPopup();
    }
  });
}

function initPaymentMethods() {
  var items = document.querySelectorAll(".pay-method-item");
  items.forEach(function (item) {
    item.addEventListener("click", function () {
      var method = item.getAttribute("data-method");

      if (method === "qris") {
        openQrisPopup();
        return;
      }

      var panel = document.getElementById("detail-" + method);
      var isOpen = panel.classList.contains("show");
      closeAllDetailPanels();
      if (!isOpen) panel.classList.add("show");
    });
  });
}

function initCopyButtons() {
  document.querySelectorAll(".btn-copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.getAttribute("data-copy-target");
      var target = document.getElementById(targetId);
      if (target) {
        copyToClipboard(target.textContent.trim(), t("pay.copied", getStoredLang()));
      }
    });
  });
}

function openQrisPopup() {
  var popup = document.getElementById("qris-popup");
  if (popup) popup.classList.add("open");
}

function closeQrisPopup() {
  var popup = document.getElementById("qris-popup");
  if (popup) popup.classList.remove("open");
}

function initQrisPopup() {
  var closeBtn = document.getElementById("qris-close");
  var popup = document.getElementById("qris-popup");
  if (closeBtn) closeBtn.addEventListener("click", closeQrisPopup);
  if (popup) {
    popup.addEventListener("click", function (e) {
      if (e.target === popup) closeQrisPopup();
    });
  }
}

function applyPaymentNumbers(pembayaran) {
  var danaEl = document.getElementById("number-dana");
  var ovoEl = document.getElementById("number-ovo");
  var gopayEl = document.getElementById("number-gopay");
  var qrisImg = document.getElementById("qris-image");

  if (danaEl && pembayaran.dana) danaEl.textContent = pembayaran.dana;
  if (ovoEl && pembayaran.ovo) ovoEl.textContent = pembayaran.ovo;
  if (gopayEl && pembayaran.gopay) gopayEl.textContent = pembayaran.gopay;
  if (qrisImg && pembayaran.qris) qrisImg.src = pembayaran.qris;
}

function renderPembayaranPage(data, lang) {
  renderPaymentCarousel("basic-payment-carousel", data.paket_basic, "basic", data.bot.gambar, lang);
  renderPaymentCarousel("vip-payment-carousel", data.paket_vip, "vip", data.bot.gambar, lang);
  initBayarButtons();
  attachRippleToAll(".btn-bayar");

  var title = document.getElementById("modal-package-name");
  var modal = document.getElementById("payment-modal");
  if (title && (!modal || !modal.classList.contains("open"))) {
    title.textContent = t("pay.modal.title", lang);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadSiteData(function (data) {
    siteData = data;
    renderPembayaranPage(data, getStoredLang());
    applyPaymentNumbers(data.pembayaran);

    initPaymentCarouselControls();
    initModalClose();
    initPaymentMethods();
    initCopyButtons();
    initQrisPopup();
  });
});

document.addEventListener("langchange", function (e) {
  if (siteData) {
    renderPembayaranPage(siteData, e.detail.lang);
  }
});
