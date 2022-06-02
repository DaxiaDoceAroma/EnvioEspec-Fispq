function main() {
  if (getFormMode() != 'VIEW') {
    const $btnZoomDiretorio = document.getElementById('btnZoomDiretorio');
    const $btnZoomTemplate = document.getElementById('btnZoomTemplate');

    $btnZoomDiretorio.addEventListener('click', () => openZoom('diretorio'));
    $btnZoomTemplate.addEventListener('click', () => openZoom('template'));
  }
}
