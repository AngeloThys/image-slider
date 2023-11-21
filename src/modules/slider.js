export function showImages() {
  const imageUrlList = getImageUrls(4, "./images/");
  const imageElementList = createImageElementList(imageUrlList);
  const display = document.querySelector(".slider-image");
  const prevArrow = document.querySelector(".slider-prev-arrow");
  const nextArrow = document.querySelector(".slider-next-arrow");

  prevArrow.addEventListener("click", prevSlide);
  nextArrow.addEventListener("click", nextSlide);

  generateNavCircles(imageUrlList.length);
  autoSlide();

  display.replaceChildren(imageElementList[0]);
}

function autoSlide() {
  setTimeout(nextSlide, 4999);
  setTimeout(autoSlide, 5000);
}

function nextSlide() {
  const currentImageNumber =
    document.querySelector(".slider-image img").dataset.imageNumber;
  const imageUrlList = getImageUrls(4, "./images/");
  const imageElementList = createImageElementList(imageUrlList);
  const display = document.querySelector(".slider-image");

  switch (currentImageNumber) {
    case "0":
      display.replaceChildren(imageElementList[1]);
      removeActiveClasses();
      setActiveNavCircle(1);
      break;
    case "1":
      display.replaceChildren(imageElementList[2]);
      removeActiveClasses();
      setActiveNavCircle(2);
      break;
    case "2":
      display.replaceChildren(imageElementList[3]);
      removeActiveClasses();
      setActiveNavCircle(3);
      break;
    case "3":
      display.replaceChildren(imageElementList[0]);
      removeActiveClasses();
      setActiveNavCircle(0);
      break;
  }
}

function prevSlide() {
  const currentImageNumber =
    document.querySelector(".slider-image img").dataset.imageNumber;
    const imageUrlList = getImageUrls(4, "./images/");
    const imageElementList = createImageElementList(imageUrlList);
  const display = document.querySelector(".slider-image");

  switch (currentImageNumber) {
    case "0":
      display.replaceChildren(imageElementList[3]);
      removeActiveClasses();
      setActiveNavCircle(3);
      break;
    case "1":
      display.replaceChildren(imageElementList[0]);
      removeActiveClasses();
      setActiveNavCircle(0);
      break;
    case "2":
      display.replaceChildren(imageElementList[1]);
      removeActiveClasses();
      setActiveNavCircle(1);
      break;
    case "3":
      display.replaceChildren(imageElementList[2]);
      removeActiveClasses();
      setActiveNavCircle(2);
      break;
  }
}

function generateNavCircles(amountOfImages) {
  const navCirclesContainer = document.querySelector(".slider-nav-circles");
  const navCirclesList = [];

  for (let i = 0; i < amountOfImages; i++) {
    const navCircle = document.createElement("span");

    navCircle.className = "nav-circle";
    navCircle.setAttribute("data-image-number", i);
    navCircle.addEventListener("click", () => {
      setSliderImage(i);
      removeActiveClasses();
      setActiveNavCircle(i);
    });

    navCirclesList.push(navCircle);
  }

  navCirclesContainer.style.right = `calc(50% - ${amountOfImages} * 26px / 2 - (${amountOfImages} - 1) * 4px / 2)`;
  navCirclesContainer.replaceChildren(...navCirclesList);
}

function setSliderImage(imageNumber) {
  const imageUrlList = getImageUrls(4, "./images/");
  const imageElementList = createImageElementList(imageUrlList);

  const display = document.querySelector(".slider-image");

  display.replaceChildren(imageElementList[imageNumber]);
}

function removeActiveClasses() {
  const navCircleElementList = document.querySelectorAll(".nav-circle");

  navCircleElementList.forEach((navCircleElement) => {
    navCircleElement.classList.remove("active");
  });
}

function setActiveNavCircle(imageNumber) {
  const navCircleElementList = document.querySelectorAll(".nav-circle");

  navCircleElementList.forEach((navCircleElement) => {
    if (parseInt(navCircleElement.dataset.imageNumber) === imageNumber) {
      navCircleElement.classList.add("active");
    }
  });
}

function getImageUrls(amountOfImages, folderUrl) {
  const imageUrlList = [];

  for (let i = 0; i < amountOfImages; i++) {
    imageUrlList.push(`${folderUrl}${i}.jpeg`);
  }

  return imageUrlList;
}

function createImageElementList(imageUrlList) {
  const imageList = [];

  imageUrlList.forEach((imageUrl, index) => {
    imageList.push(createImage(imageUrl, index));
  });

  return imageList;
}

function createImage(imageUrl, imageNumber) {
  const image = document.createElement("img");

  image.src = imageUrl;
  image.setAttribute("data-image-number", imageNumber);

  return image;
}
