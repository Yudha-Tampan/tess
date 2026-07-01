var siteData = null;
var activePackageName = "";

function buildPaymentCard(pkg, badgeText, botImage) {
  var card = document.createElement("div");
  card.className = "glass-card pay-card pkg-card";

  var tagHtml = "";
  if (pkg.hemat) {
    tagHtml = '<span class="pkg-tag">hemat ' + pkg.hemat + "</span>";
  } else {
    tagHtml = '<span class="pkg-tag">' + badgeText + "</span>";
  }

  card.innerHTML =
    tagHtml +
    '<div class="pkg-icon"><img src="' + botImage + '" alt="' + pkg.nama + '" loading="lazy"></div>' +
    '<div class="pay-name">' + pkg.nama + "</div>" +
    '<div class="pay-duration">' + pkg.durasi + "</div>" +
    '<div class="pay-price">' + pkg.harga + "</div>" +
    '<button class="btn-bayar" data-pkg-name="' + pkg.nama + " (" + pkg.durasi + ')">Bayar</button>';

  return card;
}

function renderPaymentCarousel(containerId, packages, badgeText, botImage) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  packages.forEach(function (pkg) {
    container.appendChild(buildPaymentCard(pkg, badgeText, botImage));
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
      openPaymentModal();
    });
  });
}

function openPaymentModal() {
  var modal = document.getElementById("payment-modal");
  var title = document.getElementById("modal-package-name");
  if (title) title.textContent = "Bayar: " + activePackageName;
  if (modal) modal.classList.add("open");
  document.body.style.overflow = "hidden";
  closeAllDetailPanels();
}

function closePaymentModal() {
  var modal = document.getElementById("payment-modal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
  closeAllDetailPanels();
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
        copyToClipboard(target.textContent.trim(), "Nomor berhasil disalin.");
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

document.addEventListener("DOMContentLoaded", function () {
  loadSiteData(function (data) {
    siteData = data;
    renderPaymentCarousel("basic-payment-carousel", data.paket_basic, "basic", data.bot.gambar);
    renderPaymentCarousel("vip-payment-carousel", data.paket_vip, "vip", data.bot.gambar);
    applyPaymentNumbers(data.pembayaran);

    initPaymentCarouselControls();
    initBayarButtons();
    initModalClose();
    initPaymentMethods();
    initCopyButtons();
    initQrisPopup();
    attachRippleToAll(".btn-bayar");
  });
});
