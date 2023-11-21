export function showImages() {
  const prevArrow = document.querySelector(".slider-prev-arrow");
  const nextArrow = document.querySelector(".slider-next-arrow");

  prevArrow.addEventListener("click", prevSlide);
  nextArrow.addEventListener("click", nextSlide);

  generateNavCircles(4);
  autoSlide();
  setSlide(0);
}

function autoSlide() {
  setTimeout(nextSlide, 4999);
  setTimeout(autoSlide, 5000);
}

function nextSlide() {
  const currentImageNumber = parseInt(
    document.querySelector(".slider-image img").dataset.imageNumber,
  );
  let nextSlide;

  if (currentImageNumber === 3) {
    nextSlide = 0;
  } else {
    nextSlide = currentImageNumber + 1;
  }

  setSlide(nextSlide);
}

function prevSlide() {
  const currentImageNumber = parseInt(
    document.querySelector(".slider-image img").dataset.imageNumber,
  );
  let prevSlide;

  if (currentImageNumber === 0) {
    prevSlide = 3;
  } else {
    prevSlide = currentImageNumber - 1;
  }

  setSlide(prevSlide);
}

function setSlide(imageNumber) {
  setSliderImage(imageNumber);
  removeActiveClasses();
  setActiveNavCircle(imageNumber);
}

function generateNavCircles(amountOfImages) {
  const navCirclesContainer = document.querySelector(".slider-nav-circles");
  const navCirclesList = [];

  navCirclesContainer.addEventListener("click", (event) => {
    const navCircleImageNumber = event.target.dataset.imageNumber;

    setSliderImage(navCircleImageNumber);
    removeActiveClasses();
    setActiveNavCircle(navCircleImageNumber);
  });

  for (let i = 0; i < amountOfImages; i++) {
    const navCircle = document.createElement("span");

    navCircle.className = "nav-circle";
    navCircle.setAttribute("data-image-number", i);

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
    if (
      parseInt(navCircleElement.dataset.imageNumber) === parseInt(imageNumber)
    ) {
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
