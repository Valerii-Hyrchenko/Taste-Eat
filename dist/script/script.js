const scrollUpContainer = document.getElementById("scroll-up");

$(".feedback-slider").slick({
  arrows: false,
  dots: true,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  adaptiveHeight: true,
  slidesToShow: 2,
  responsive: [
    {
      breakpoint: 1091,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

const showBurgerMenu = () => {
  let checkbox = document.getElementById("burger-checkbox");
  let menu = document.getElementById("header-menu");
  checkbox.addEventListener("click", (event) => {
    event.target.checked
      ? menu.classList.add("header-menu--burger")
      : menu.classList.remove("header-menu--burger");
  });
};
showBurgerMenu();

const createScrollUp = () => {
  const scrollUpHtml = `
    <div id="scroll-up-wrapper">
      <img src="./img/icons/scroll_arrow.svg" alt="scroll-up-icon" />
    </div>
  `;
  scrollUpContainer.classList.add("scroll-up-container");
  scrollUpContainer.innerHTML = scrollUpHtml;
  scrollUpContainer.addEventListener("click", () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
};

document.addEventListener("scroll", (event) => {
  let scrollLevel = event.target.documentElement.scrollTop;
  const scrollUpWrapper = document.getElementById("scroll-up-wrapper");

  if (!scrollUpWrapper && scrollLevel > 500) {
    createScrollUp();
  } else if (scrollUpWrapper && scrollLevel < 200) {
    scrollUpContainer.classList.remove("scroll-up-container");
    scrollUpWrapper.remove();
  }
});

const scrollToMenu = () => {
  document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
};

document.getElementById("our-menu").addEventListener("click", scrollToMenu);

document
  .getElementById("see-all-dishes")
  .addEventListener("click", scrollToMenu);

document.getElementById("welcome-button").addEventListener("click", () => {
  document
    .getElementById("popular-dishes")
    .scrollIntoView({ behavior: "smooth" });
});

document.getElementById("home").addEventListener("click", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});

document.getElementById("about-us").addEventListener("click", () => {
  document
    .getElementById("about-us-section")
    .scrollIntoView({ behavior: "smooth" });
});

document.getElementById("pages").addEventListener("click", () => {
  document
    .getElementById("great-services")
    .scrollIntoView({ behavior: "smooth" });
});

document.getElementById("blog").addEventListener("click", () => {
  document
    .getElementById("blog-section")
    .scrollIntoView({ behavior: "smooth" });
});

document.getElementById("reservation-btn").addEventListener("click", () => {
  document.getElementById("reservation").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("contact-us").addEventListener("click", () => {
  document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
});
