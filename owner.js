function renderOwner(owner) {
  var photo = document.getElementById("owner-photo");
  var name = document.getElementById("owner-name");
  var desc = document.getElementById("owner-desc");
  var waBtn = document.getElementById("owner-wa-btn");

  if (photo && owner.foto) photo.src = owner.foto;
  if (name && owner.nama) name.textContent = owner.nama;
  if (desc && owner.deskripsi) desc.textContent = owner.deskripsi;
  if (waBtn && owner.whatsapp) {
    waBtn.href = "https://wa.me/" + owner.whatsapp;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadSiteData(function (data) {
    renderOwner(data.owner);
  });
});
