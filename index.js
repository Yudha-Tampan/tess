var indexSiteData = null;

function buildPackageCard(pkg, botImage, lang) {
  var card = document.createElement("div");
  card.className = "glass-card pkg-card";

  var tagHtml = "";
  if (pkg.hemat) {
    tagHtml = '<span class="pkg-tag">' + t("footer.hemat", lang) + " " + pkg.hemat + "</span>";
  }

  card.innerHTML =
    tagHtml +
    '<div class="pkg-icon"><img src="' + botImage + '" alt="' + pkg.nama + '" loading="lazy"></div>' +
    '<div class="pkg-name">' + pkg.nama + "</div>" +
    '<div class="pkg-duration">' + getLang(pkg, "durasi", lang) + "</div>" +
    '<div class="pkg-price-old">' + pkg.harga_lama + "</div>" +
    '<div class="pkg-price-new">' + pkg.harga + "</div>";

  return card;
}

function renderCarousel(containerId, packages, botImage, lang) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  packages.forEach(function (pkg) {
    container.appendChild(buildPackageCard(pkg, botImage, lang));
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

function renderHero(bot, lang) {
  var descEl = document.getElementById("hero-desc");
  var slogan = getLang(bot, "slogan", lang);
  if (descEl && slogan) {
    descEl.textContent = slogan + t("hero.desc.suffix", lang);
  }
}

function buildPriceDiffList(packages, lang) {
  var html = '<ul class="price-diff-list">';
  packages.forEach(function (pkg) {
    var durasi = getLang(pkg, "durasi", lang);
    html += '<li><span class="plabel">' + pkg.nama + " (" + durasi + ')</span><span class="pvalue">' +
      '<span class="old-price">' + pkg.harga_lama + "</span>" +
      '<span class="new-price">' + pkg.harga + "</span>";
    if (pkg.hemat) {
      html += '<span class="save-tag">' + t("footer.hemat", lang) + " " + pkg.hemat + "</span>";
    }
    html += "</span></li>";
  });
  html += "</ul>";
  return html;
}

function renderAnnouncement(data, lang) {
  var eyebrowEl = document.getElementById("announcement-eyebrow");
  var titleEl = document.getElementById("announcement-title");
  var bodyEl = document.getElementById("announcement-body");
  var p = data.pengumuman;
  if (!p || !bodyEl) return;

  if (eyebrowEl) eyebrowEl.textContent = getLang(p, "eyebrow", lang);
  if (titleEl) titleEl.textContent = getLang(p, "judul", lang);

  var catatanList = lang === "en" && p.catatan_en ? p.catatan_en : p.catatan;

  var html = "";
  html += "<p>" + getLang(p, "salam", lang) + "</p>";
  html += "<p>" + getLang(p, "paragraf1", lang) + "</p>";
  html += "<h3>" + getLang(p, "subjudul1", lang) + "</h3>";
  html += "<p>" + getLang(p, "paragraf2", lang) + "</p>";
  html += "<h3>" + getLang(p, "subjudul_basic", lang) + "</h3>";
  html += buildPriceDiffList(data.paket_basic, lang);
  html += "<h3>" + getLang(p, "subjudul_vip", lang) + "</h3>";
  html += buildPriceDiffList(data.paket_vip, lang);

  html += '<div class="note-box"><strong>' + getLang(p, "catatan_judul", lang) + "</strong><br><br>";
  if (catatanList && catatanList.length) {
    html += catatanList.join("<br><br>");
  }
  html += "</div>";

  bodyEl.innerHTML = html;
}

function renderIndexPage(data, lang) {
  renderHero(data.bot, lang);
  renderAnnouncement(data, lang);
  renderCarousel("basic-carousel", data.paket_basic, data.bot.gambar, lang);
  renderCarousel("vip-carousel", data.paket_vip, data.bot.gambar, lang);
}

document.addEventListener("DOMContentLoaded", function () {
  loadSiteData(function (data) {
    indexSiteData = data;
    renderIndexPage(data, getStoredLang());
    initCarouselControls();
  });
});

document.addEventListener("langchange", function (e) {
  if (indexSiteData) {
    renderIndexPage(indexSiteData, e.detail.lang);
  }
});
