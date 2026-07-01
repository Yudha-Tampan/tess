function buildPackageCard(pkg, botImage) {
  var card = document.createElement("div");
  card.className = "glass-card pkg-card";

  var tagHtml = "";
  if (pkg.hemat) {
    tagHtml = '<span class="pkg-tag">hemat ' + pkg.hemat + "</span>";
  }

  card.innerHTML =
    tagHtml +
    '<div class="pkg-icon"><img src="' + botImage + '" alt="' + pkg.nama + '" loading="lazy"></div>' +
    '<div class="pkg-name">' + pkg.nama + "</div>" +
    '<div class="pkg-duration">' + pkg.durasi + "</div>" +
    '<div class="pkg-price-old">' + pkg.harga_lama + "</div>" +
    '<div class="pkg-price-new">' + pkg.harga + "</div>";

  return card;
}

function renderCarousel(containerId, packages, botImage) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  packages.forEach(function (pkg) {
    container.appendChild(buildPackageCard(pkg, botImage));
  });
}

function initCarouselControls() {
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

document.addEventListener("DOMContentLoaded", function () {
  loadSiteData(function (data) {
    renderCarousel("basic-carousel", data.paket_basic, data.bot.gambar);
    renderCarousel("vip-carousel", data.paket_vip, data.bot.gambar);
    initCarouselControls();
  });
});
