function renderAboutInfo(bot) {
  var img = document.getElementById("about-bot-img");
  var name = document.getElementById("about-bot-name");
  var desc = document.getElementById("about-bot-desc");

  if (img && bot.gambar) img.src = bot.gambar;
  if (name && bot.nama) name.textContent = "Tentang " + bot.nama;
  if (desc && bot.deskripsi) desc.textContent = bot.deskripsi;
}

function renderFeatures(fitur) {
  var grid = document.getElementById("feature-grid");
  if (!grid) return;
  grid.innerHTML = "";

  fitur.forEach(function (item) {
    var card = document.createElement("div");
    card.className = "glass-card feature-card";
    card.innerHTML =
      '<div class="feature-icon"><i class="' + item.icon + '"></i></div>' +
      '<div class="feature-name">' + item.nama + "</div>";
    grid.appendChild(card);
  });
}

function renderFaq(faqList) {
  var container = document.getElementById("faq-list");
  if (!container) return;
  container.innerHTML = "";

  faqList.forEach(function (item, index) {
    var faqItem = document.createElement("div");
    faqItem.className = "glass-card faq-item";

    var question = document.createElement("button");
    question.className = "faq-question";
    question.innerHTML = "<span>" + item.pertanyaan + '</span><i class="fa-solid fa-chevron-down"></i>';

    var answer = document.createElement("div");
    answer.className = "faq-answer";
    answer.innerHTML = "<p>" + item.jawaban + "</p>";

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

document.addEventListener("DOMContentLoaded", function () {
  loadSiteData(function (data) {
    renderAboutInfo(data.bot);
    renderFeatures(data.fitur);
    renderFaq(data.faq);
  });
});
