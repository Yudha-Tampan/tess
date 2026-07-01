var tentangSiteData = null;

function renderAboutInfo(bot, lang) {
  var img = document.getElementById("about-bot-img");
  var name = document.getElementById("about-bot-name");
  var desc = document.getElementById("about-bot-desc");

  if (img && bot.gambar) img.src = bot.gambar;
  if (name && bot.nama) name.textContent = t("about.title.prefix", lang) + bot.nama;
  if (desc) desc.textContent = getLang(bot, "deskripsi", lang);
}

function renderFeatures(fitur, lang) {
  var grid = document.getElementById("feature-grid");
  if (!grid) return;
  grid.innerHTML = "";

  fitur.forEach(function (item) {
    var card = document.createElement("div");
    card.className = "glass-card feature-card";
    card.innerHTML =
      '<div class="feature-icon"><i class="' + item.icon + '"></i></div>' +
      '<div class="feature-name">' + getLang(item, "nama", lang) + "</div>";
    grid.appendChild(card);
  });
}

function renderFaq(faqList, lang) {
  var container = document.getElementById("faq-list");
  if (!container) return;
  container.innerHTML = "";

  faqList.forEach(function (item) {
    var faqItem = document.createElement("div");
    faqItem.className = "glass-card faq-item";

    var question = document.createElement("button");
    question.className = "faq-question";
    question.innerHTML = "<span>" + getLang(item, "pertanyaan", lang) + '</span><i class="fa-solid fa-chevron-down"></i>';

    var answer = document.createElement("div");
    answer.className = "faq-answer";
    answer.innerHTML = "<p>" + getLang(item, "jawaban", lang) + "</p>";

    question.addEventListener("click", function () {
      var isOpen = faqItem.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        openItem.classList.remove("open");
      });
      if (!isOpen) {
        faqItem.classList.add("open");
      }
    });

    faqItem.appendChild(question);
    faqItem.appendChild(answer);
    container.appendChild(faqItem);
  });
}

function renderTentangPage(data, lang) {
  renderAboutInfo(data.bot, lang);
  renderFeatures(data.fitur, lang);
  renderFaq(data.faq, lang);
}

document.addEventListener("DOMContentLoaded", function () {
  loadSiteData(function (data) {
    tentangSiteData = data;
    renderTentangPage(data, getStoredLang());
  });
});

document.addEventListener("langchange", function (e) {
  if (tentangSiteData) {
    renderTentangPage(tentangSiteData, e.detail.lang);
  }
});
