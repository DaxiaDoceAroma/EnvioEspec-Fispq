function setTitle(title) {
  try {
    const $pageTitle = document.querySelector('.pageTitle');

    const $container = $pageTitle.closest('div');
    $container.classList.add('fluig-style-guide');

    const $pageHeader = document.createElement('div');
    $pageHeader.classList.add('page-header');

    const $pageTitleH1 = document.createElement('h1');
    $pageTitleH1.innerText = title;
    $pageTitleH1.classList.add('pageTitle');
    $pageTitleH1.classList.add('text-center');
    $pageTitleH1.setAttribute('title', title);

    $pageHeader.append($pageTitleH1);
    $container.append($pageHeader);

    $pageTitle.remove();
  } catch (error) {}
  
  FLUIGC.backToTop();
}
