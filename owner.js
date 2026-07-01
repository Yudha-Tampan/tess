var ownerSiteData = null;

function formatDisplayNumber(number) {
  if (!number) return "-";
  var cleaned = number.replace(/^0/, "62");
  return "+" + cleaned;
}

function renderOwner(owner, lang) {
  var photo = document.getElementById("owner-photo");
  var name = document.getElementById("owner-name");
  var numberEl = document.getElementById("owner-number");
  var desc = document.getElementById("owner-desc");
  var waBtn = document.getElementById("owner-wa-btn");

  if (photo && owner.foto) photo.src = owner.foto;
  if (name && owner.nama) name.textContent = owner.nama;
  if (numberEl && owner.whatsapp) numberEl.textContent = formatDisplayNumber(owner.whatsapp);
  if (desc) desc.textContent = getLang(owner, "deskripsi", lang);
  if (waBtn && owner.whatsapp) {
    waBtn.href = "https://wa.me/" + owner.whatsapp;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadSiteData(function (data) {
    ownerSiteData = data;
    renderOwner(data.owner, getStoredLang());
  });
});

document.addEventListener("langchange", function (e) {
  if (ownerSiteData) {
    renderOwner(ownerSiteData.owner, e.detail.lang);
  }
});
