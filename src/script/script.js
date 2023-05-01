const scrollUpContainer = document.getElementById("scroll-up");
let burgerCheckbox = document.getElementById("burger-checkbox");
let burgerMenu = document.getElementById("header-menu");

const configScrollToSection = [
  {
    id: "menu",
    button: document.getElementById("our-menu"),
    toSection: document.getElementById("menu"),
  },
  {
    id: "seeAllDishes",
    button: document.getElementById("see-all-dishes"),
    toSection: document.getElementById("menu"),
  },
  {
    id: "welcomeButton",
    button: document.getElementById("welcome-button"),
    toSection: document.getElementById("popular-dishes"),
  },
  {
    id: "home",
    button: document.getElementById("home"),
    toSection: document.getElementById("welcome"),
  },
  {
    id: "aboutUs",
    button: document.getElementById("about-us"),
    toSection: document.getElementById("about-us-section"),
  },
  {
    id: "pages",
    button: document.getElementById("pages"),
    toSection: document.getElementById("great-services"),
  },
  {
    id: "blog",
    button: document.getElementById("blog"),
    toSection: document.getElementById("blog-section"),
  },
  {
    id: "reservation",
    button: document.getElementById("reservation-btn"),
    toSection: document.getElementById("reservation"),
  },
  {
    id: "contactUs",
    button: document.getElementById("contact-us"),
    toSection: document.getElementById("footer"),
  },
];

const getHeaderHeight = () => {
  return document.getElementById("header").clientHeight;
};

configScrollToSection.forEach((item) => {
  item.button.addEventListener("click", () => {
    if (window.screen.width < 1091) {
      item.toSection.style.scrollMarginTop = `${getHeaderHeight()}px`;
    }
    item.toSection.scrollIntoView({ block: "start", behavior: "smooth" });
    if (burgerCheckbox.checked) {
      setTimeout(() => {
        burgerCheckbox.checked = false;
        burgerMenu.classList.remove("header-menu--burger");
      }, 400);
    }
  });
});

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

burgerCheckbox.addEventListener("click", (event) => {
  event.target.checked
    ? burgerMenu.classList.add("header-menu--burger")
    : burgerMenu.classList.remove("header-menu--burger");
});

window.addEventListener("load", () => {
  document.body.style.display = "block";
});

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
