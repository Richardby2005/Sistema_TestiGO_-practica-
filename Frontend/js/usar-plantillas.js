async function AgregarHTML(clase, url) {
  const container = document.querySelector(clase);
  const res = await fetch(url);
  container.innerHTML = await res.text();
}

window.addEventListener('DOMContentLoaded', () => {
  AgregarHTML('header.page-header', 'Reutilizables/header.html');
  AgregarHTML('footer.page-footer', 'Reutilizables/footer.html');
  AgregarHTML('aside.opciones-usuario', '../Reutilizables/aside-user.html');
});
