const init = function () {
  const imagesList = document.querySelectorAll(".gallery__item");
  imagesList.forEach((img) => {
    img.dataset.sliderGroupName = Math.random() > 0.5 ? "nice" : "good";
  }); // za każdym przeładowaniem strony przydzielaj inną nazwę grupy dla zdjęcia

  runJSSlider();
};

document.addEventListener("DOMContentLoaded", init);

const runJSSlider = function () {
  const imagesSelector = ".gallery__item";
  const sliderRootSelector = ".js-slider";

  const imagesList = document.querySelectorAll(imagesSelector);
  const sliderRootElement = document.querySelector(sliderRootSelector);

  initEvents(imagesList, sliderRootElement);
  initCustomEvents(imagesList, sliderRootElement, imagesSelector);
};

const initEvents = function (imagesList, sliderRootElement) {
  imagesList.forEach(function (item) {
    item.addEventListener("click", function (e) {
      fireCustomEvent(e.currentTarget, "js-slider-img-click");
    });
  });

  // todo:
  // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-next]
  // na elemencie [.js-slider__nav--next]
  const navNext = sliderRootElement.querySelector(".js-slider__nav--next");
  navNext.addEventListener("click", function (e) {
    fireCustomEvent(navNext, "js-slider-img-next");
  });

  // todo:
  // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-img-prev]
  // na elemencie [.js-slider__nav--prev]
  const navPrev = sliderRootElement.querySelector(".js-slider__nav--prev");

  navPrev.addEventListener("click", function (e) {
    fireCustomEvent(navNext, "js-slider-img-prev");
  });

  // todo:
  // utwórz nasłuchiwanie eventu o nazwie [click], który ma uruchomić event [js-slider-close]
  // tylko wtedy, gdy użytkownik kliknie w [.js-slider__zoom]
  const zoom = sliderRootElement.querySelector(".js-slider__zoom");

  zoom.addEventListener("click", function (e) {
    if (e.target === zoom) {
      fireCustomEvent(zoom, "js-slider-close");
    }
  });
};

const fireCustomEvent = function (element, name) {
  console.log(element.className, "=>", name);

  const event = new CustomEvent(name, {
    bubbles: true,
  });

  element.dispatchEvent(event);
};

const initCustomEvents = function (
  imagesList,
  sliderRootElement,
  imagesSelector
) {
  imagesList.forEach(function (img) {
    img.addEventListener("js-slider-img-click", function (event) {
      onImageClick(event, sliderRootElement, imagesSelector);
    });
  });

  sliderRootElement.addEventListener("js-slider-img-next", onImageNext);
  sliderRootElement.addEventListener("js-slider-img-prev", onImagePrev);
  sliderRootElement.addEventListener("js-slider-close", onClose);
};

const onImageClick = function (event, sliderRootElement, imagesSelector) {
  // todo:
  // 1. dodać klasę [.js-slider--active], aby pokazać całą sekcję
  // 2. wyszukać ściężkę (atrybut [src]) do klikniętego elementu i wstawić do [.js-slider__image]
  // 3. pobrać nazwę grupy zapisaną w dataset klikniętego elementu
  // 4. wyszukać wszystkie zdjęcia należące do danej grupy, które wykorzystasz do osadzenia w dolnym pasku
  // 5. utworzyć na podstawie elementu [.js-slider__thumbs-item--prototype] zawartość dla [.js-slider__thumbs]
  // 6. zaznaczyć przy pomocy klasy [.js-slider__thumbs-image--current], który element jest aktualnie wyświetlany

  sliderRootElement.classList.add("js-slider--active");

  const clickedImgSrc =
    event.currentTarget.firstElementChild.getAttribute("src");

  const sliderImgElement = document
    .querySelector(".js-slider__image")
    .setAttribute("src", clickedImgSrc);

  const groupOfClickedImg = event.currentTarget.dataset.sliderGroupName;

  const niceGroup = document.querySelectorAll(
    '[data-slider-group-name="nice"]'
  );
  const niceGroupArr = [...niceGroup];
  const goodGroup = document.querySelectorAll(
    '[data-slider-group-name="good"]'
  );
  const goodGroupArr = [...goodGroup];

  //nice or good group check
  const isNiceOrGoodGroup = function () {
    const sliderPrototype = document.querySelector(".js-slider__thumbs");
    const currentMainImgSrc = document
      .querySelector(".js-slider__image")
      .getAttribute("src");

    if (event.currentTarget.dataset.sliderGroupName === "nice") {
      niceGroup.forEach(function (item, index) {
        const niceGroupImg = item.firstElementChild.getAttribute("src");
        const niceGroupNewImg = document.createElement("img");
        niceGroupNewImg.setAttribute("src", niceGroupImg);
        sliderPrototype.appendChild(niceGroupNewImg);
        niceGroupNewImg.classList.add("js-slider__thumbs-image");
        if (currentMainImgSrc === niceGroupImg) {
          niceGroupNewImg.classList.add("js-slider__thumbs-image--current");
        } else if (currentMainImgSrc !== niceGroupImg) {
          niceGroupNewImg.classList.remove("js-slider__thumbs-image--current");
        }
      });
    } else if (event.currentTarget.dataset.sliderGroupName === "good") {
      goodGroup.forEach(function (item, index) {
        const goodGroupImg = item.firstElementChild.getAttribute("src");
        const goodGroupNewImg = document.createElement("img");
        goodGroupNewImg.setAttribute("src", goodGroupImg);
        sliderPrototype.appendChild(goodGroupNewImg);
        goodGroupNewImg.classList.add("js-slider__thumbs-image");
        if (currentMainImgSrc === goodGroupImg) {
          goodGroupNewImg.classList.add("js-slider__thumbs-image--current");
        } else if (currentMainImgSrc !== goodGroupImg) {
          goodGroupNewImg.classList.remove("js-slider__thumbs-image--current");
        }
      });
    }
  };

  isNiceOrGoodGroup();
};

const onImageNext = function (event) {
  console.log(this, "onImageNext");
  // [this] wskazuje na element [.js-slider]

  // todo:
  // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
  // 2. znaleźć element następny do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
  // 3. sprawdzić czy ten element istnieje - jeśli nie to [.nextElementSibling] zwróci [null]
  // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
  // 5. podmienić atrybut o nazwie [src] dla [.js-slider__image]
  const currentElement = document.querySelector(
    ".js-slider__thumbs-image--current"
  );
  const siblingOfCurrentElement = currentElement.nextElementSibling;
  const prototypeElement = document.querySelector(
    ".js-slider__thumbs-item--prototype"
  );
  const prototypeElementSibling = prototypeElement.nextElementSibling;

  if (siblingOfCurrentElement !== null) {
    const siblingSrcAtt = siblingOfCurrentElement.getAttribute("src");
    const sliderImage = document
      .querySelector(".js-slider__image")
      .setAttribute("src", siblingSrcAtt);

    currentElement.classList.remove("js-slider__thumbs-image--current");
    siblingOfCurrentElement.classList.add("js-slider__thumbs-image--current");
  } else if (siblingOfCurrentElement === null) {
    const firstImgSlider = prototypeElementSibling;
    const siblingSrcAtt = prototypeElementSibling.getAttribute("src");
    const sliderImage = document
      .querySelector(".js-slider__image")
      .setAttribute("src", siblingSrcAtt);
    currentElement.classList.remove("js-slider__thumbs-image--current");
    firstImgSlider.classList.add("js-slider__thumbs-image--current");
  }
};

const onImagePrev = function (event) {
  console.log(this, "onImagePrev");
  // [this] wskazuje na element [.js-slider]

  // todo:
  // 1. wyszukać aktualny wyświetlany element przy pomocy [.js-slider__thumbs-image--current]
  // 2. znaleźć element poprzedni do wyświetlenie względem drzewa DOM dla [.js-slider__thumbs]
  // 3. sprawdzić czy ten element istnieje i czy nie posiada klasy [.js-slider__thumbs-item--prototype]
  // 4. przełączyć klasę [.js-slider__thumbs-image--current] do odpowiedniego elementu
  // 5. podmienić atrybut [src] dla [.js-slider__image]

  const currentElement = document.querySelector(
    ".js-slider__thumbs-image--current"
  );
  const prevSiblingOfCurrentElement = currentElement.previousElementSibling;
  const prototypeElement = document.querySelector(
    ".js-slider__thumbs-item--prototype"
  );

  if (
    prevSiblingOfCurrentElement &&
    prevSiblingOfCurrentElement.className !==
      "js-slider__thumbs-item--prototype"
  ) {
    const siblingSrcAtt = prevSiblingOfCurrentElement.getAttribute("src");
    const sliderImage = document
      .querySelector(".js-slider__image")
      .setAttribute("src", siblingSrcAtt);

    currentElement.classList.remove("js-slider__thumbs-image--current");
    prevSiblingOfCurrentElement.classList.add(
      "js-slider__thumbs-image--current"
    );
  } else if (prevSiblingOfCurrentElement === null) {
    // const siblingSrcAtt = prevPrototypeElementSibling.getAttribute("src");
    const lastImgSrcAtt = document
      .querySelector(".js-slider__thumbs")
      .lastElementChild.getAttribute("src");
    const sliderImage = document
      .querySelector(".js-slider__image")
      .setAttribute("src", lastImgSrcAtt);

    const parentOfCurrentElement = currentElement.parentElement;
    const lastImgSlider = parentOfCurrentElement.lastElementChild;
    currentElement.classList.remove("js-slider__thumbs-image--current");
    lastImgSlider.classList.add("js-slider__thumbs-image--current");
  }
};

const onClose = function (event) {
  // todo:
  // 1. należy usunać klasę [js-slider--active] dla [.js-slider]
  // 2. należy usunać wszystkie dzieci dla [.js-slider__thumbs] pomijając [.js-slider__thumbs-item--prototype]
  const sliderRootSelector = ".js-slider";
  const sliderRootElement = document.querySelector(sliderRootSelector);
  sliderRootElement.classList.remove("js-slider--active");

  const removeSliderImages = function () {
    const sliderPrototype = document.querySelectorAll(
      ".js-slider__thumbs-image"
    );
    sliderPrototype.forEach(function (item) {
      item.remove();
    });
  };
  removeSliderImages();
};
