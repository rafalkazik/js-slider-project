const init = function () {
  const imagesList = document.querySelectorAll(".gallery__item");
  imagesList.forEach((img) => {
    img.dataset.sliderGroupName = Math.random() > 0.5 ? "nice" : "good";
  });

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

  const navNext = sliderRootElement.querySelector(".js-slider__nav--next");
  navNext.addEventListener("click", function (e) {
    fireCustomEvent(navNext, "js-slider-img-next");
  });

  const navPrev = sliderRootElement.querySelector(".js-slider__nav--prev");

  navPrev.addEventListener("click", function (e) {
    fireCustomEvent(navNext, "js-slider-img-prev");
  });

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

        const niceGroupPrototype = document.createElement("figure");
        niceGroupPrototype.classList.add("js-slider__thumbs-item");

        const niceGroupNewImg = document.createElement("img");
        niceGroupNewImg.setAttribute("src", niceGroupImg);
        sliderPrototype.appendChild(niceGroupPrototype);
        niceGroupPrototype.appendChild(niceGroupNewImg);

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

        const goodGroupPrototype = document.createElement("figure");
        goodGroupPrototype.classList.add("js-slider__thumbs-item");

        const goodGroupNewImg = document.createElement("img");
        goodGroupNewImg.setAttribute("src", goodGroupImg);
        sliderPrototype.appendChild(goodGroupPrototype);
        goodGroupPrototype.appendChild(goodGroupNewImg);

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
  const currentElement = document.querySelector(
    ".js-slider__thumbs-image--current"
  );

  const currentElementParent = currentElement.parentElement;

  let nextElementFigure = currentElementParent.nextElementSibling;
  if (nextElementFigure === null) {
    const prototypeElement = document.querySelector(
      ".js-slider__thumbs-item--prototype"
    );
    nextElementFigure = prototypeElement.nextElementSibling;
  }

  const nextElementImage = nextElementFigure.querySelector("img");

  const src = nextElementImage.getAttribute("src");
  document.querySelector(".js-slider__image").setAttribute("src", src);

  currentElement.classList.remove("js-slider__thumbs-image--current");
  nextElementImage.classList.add("js-slider__thumbs-image--current");
};

const onImagePrev = function (event) {
  const currentElement = document.querySelector(
    ".js-slider__thumbs-image--current"
  );

  const currentElementParent = currentElement.parentElement;

  const prototypeElement = document.querySelector(
    ".js-slider__thumbs-item--prototype"
  );

  let prevElementFigure = currentElementParent.previousElementSibling;
  if (
    prevElementFigure.className.includes("js-slider__thumbs-item--prototype")
  ) {
    const mainSliderElement = document.querySelector(".js-slider__thumbs");
    prevElementFigure = mainSliderElement.lastElementChild;
  }

  const prevElementImage = prevElementFigure.querySelector("img");

  const src = prevElementImage.getAttribute("src");
  document.querySelector(".js-slider__image").setAttribute("src", src);

  currentElement.classList.remove("js-slider__thumbs-image--current");
  prevElementImage.classList.add("js-slider__thumbs-image--current");
};

const onClose = function (event) {
  const sliderRootSelector = ".js-slider";
  const sliderRootElement = document.querySelector(sliderRootSelector);
  sliderRootElement.classList.remove("js-slider--active");

  const removeSliderImages = function () {
    const sliderPrototype = document.querySelectorAll(
      ".js-slider__thumbs-item"
    );
    sliderPrototype.forEach(function (item) {
      if (!item.className.includes("js-slider__thumbs-item--prototype")) {
        item.remove();
      }
    });
  };
  removeSliderImages();
};
