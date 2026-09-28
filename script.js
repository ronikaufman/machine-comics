const COMIC_PAGES = Array.from(
  { length: 96 },
  (_, i) => `./images/2570000${i.toString().padStart(2, "0")}.png`,
);

let comicPageEl,
  pageNumberEl,
  leftArrow,
  rightArrow,
  galleryViewToggleEl,
  pageContentEl,
  galleryGridEl,
  aboutToggleEl,
  aboutTextEl;
let currentPageIndex,
  galleryViewIsOn = false,
  aboutIsOn = false;

function init() {
  currentPageIndex = Math.floor(Math.random() * COMIC_PAGES.length);

  comicPageEl = document.getElementById("comic-page");
  pageNumberEl = document.getElementById("number");
  leftArrow = document.getElementById("left-arrow");
  rightArrow = document.getElementById("right-arrow");
  galleryViewToggleEl = document.getElementById("gallery-view");
  pageContentEl = document.getElementById("page-content");
  galleryGridEl = document.getElementById("gallery-grid");
  aboutToggleEl = document.getElementById("about");
  aboutTextEl = document.getElementById("about-text");

  leftArrow.addEventListener("click", goToPreviousPage);
  rightArrow.addEventListener("click", goToNextPage);
  galleryViewToggleEl.addEventListener("click", toggleGalleryView);
  aboutToggleEl.addEventListener("click", toggleAboutView);

  updatePage();
  populateGrid();
}

function updatePage() {
  comicPageEl.src = COMIC_PAGES[currentPageIndex];
  comicPageEl.alt = `Machine Comics #${currentPageIndex}`;
  pageNumberEl.textContent = `#${currentPageIndex}`;

  leftArrow.disabled = currentPageIndex === 0;
  rightArrow.disabled = currentPageIndex === COMIC_PAGES.length - 1;
}

function populateGrid() {
  const galleryGrid = document.getElementById("gallery-grid");

  COMIC_PAGES.forEach((page, index) => {
    const img = document.createElement("img");
    img.src = page;
    img.alt = `Machine Comics #${index}`;
    img.loading = "lazy";

    const galleryItem = document.createElement("a");
    galleryItem.classList.add("gallery-item");
    galleryItem.setAttribute("href", "#");
    galleryItem.addEventListener("click", () => {
      currentPageIndex = index;
      updatePage();
      toggleGalleryView();
    });

    const pageNumber = document.createElement("p");
    pageNumber.textContent = `#${index}`;

    galleryItem.appendChild(img);
    galleryItem.appendChild(pageNumber);
    galleryGrid.appendChild(galleryItem);
  });
}

function toggleGalleryView() {
  if (galleryViewIsOn) {
    galleryViewToggleEl.innerHTML = "Gallery view";
    galleryGridEl.style.display = "none";
    pageContentEl.style.display = "flex";
    pageNumberEl.style.display = "block";
  } else {
    galleryViewToggleEl.innerHTML = "Page view";
    galleryGridEl.style.display = "grid";
    pageContentEl.style.display = "none";
    pageNumberEl.style.display = "none";
  }
  if (aboutIsOn) {
    aboutTextEl.style.display = "none";
  }

  galleryViewIsOn = !galleryViewIsOn;
}

function toggleAboutView() {
  if (aboutIsOn) {
    // gallery and page are hidden
    aboutTextEl.style.display = "none";
    if (galleryViewIsOn) {
      // return to gallery view
      galleryGridEl.style.display = "none";
      galleryGridEl.style.display = "grid";
    } else {
      // return to page view
      pageContentEl.style.display = "flex";
      pageNumberEl.style.display = "block";
    }
  } else {
    // about text is hidden, either gallery or page are not
    aboutTextEl.style.display = "block";
    if (galleryViewIsOn) {
      // hide gallery
      galleryGridEl.style.display = "none";
    } else {
      // hide page
      pageContentEl.style.display = "none";
      pageNumberEl.style.display = "none";
    }
  }

  aboutIsOn = !aboutIsOn;
}

function goToPreviousPage() {
  if (currentPageIndex > 0) {
    currentPageIndex--;
    updatePage();
  }
}

function goToNextPage() {
  if (currentPageIndex < COMIC_PAGES.length - 1) {
    currentPageIndex++;
    updatePage();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
