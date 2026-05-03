document.documentElement.classList.add("js");

const year = document.querySelector("[data-year]");
if (year) {
  year.textContent = new Date().getFullYear();
}

const bars = [
  ["end", "top"],
  ["side", "top", "left"],
  ["side", "top", "right"],
  ["middle"],
  ["side", "bottom", "left"],
  ["side", "bottom", "right"],
  ["end", "bottom"]
];

const countdownRoot = document.querySelector("[data-countdown]");
const countdownText = document.querySelector("[data-countdown-text]");
const START_DATE = new Date("2026-05-04T09:40:00+03:00");
const END_DATE = new Date("2030-05-04T09:40:00+03:00");

const createDigitGroup = (number, padding = 2) => {
  const group = document.createElement("div");
  group.classList.add("group");

  const digits = [...`${number}`.padStart(padding, "0").slice(-padding)].map((digit) => {
    const figure = document.createElement("figure");
    figure.classList.add("digit");
    figure.setAttribute("data-digit", digit);
    figure.setAttribute("aria-hidden", "true");

    bars.forEach((classes) => {
      const span = document.createElement("span");
      span.classList.add(...classes);
      figure.append(span);
    });

    return figure;
  });

  group.append(...digits);

  return {
    element: group,
    set number(val) {
      const value = `${Math.max(0, val)}`.padStart(padding, "0").slice(-padding);
      [...value].forEach((digit, index) => {
        digits[index].setAttribute("data-digit", digit);
      });
    }
  };
};

const addDigits = (number, padding = 2) => {
  if (!countdownRoot) return null;

  const digitsWrap = document.createElement("div");
  digitsWrap.classList.add("digits");

  const group = createDigitGroup(number, padding);
  const shadow1 = createDigitGroup(number, padding);
  const shadow2 = createDigitGroup(number, padding);

  shadow1.element.classList.add("shadow", "shadow1");
  shadow2.element.classList.add("shadow", "shadow2");

  digitsWrap.append(group.element, shadow1.element, shadow2.element);
  countdownRoot.append(digitsWrap);

  return {
    set number(val) {
      group.number = val;
      shadow1.number = val;
      shadow2.number = val;
    }
  };
};

const addColon = () => {
  if (!countdownRoot) return;

  const colonGroup = document.createElement("div");
  colonGroup.classList.add("colon-group");

  ["", "shadow shadow1", "shadow shadow2"].forEach((className) => {
    const colon = document.createElement("figure");
    colon.className = className ? `colon ${className}` : "colon";
    colon.setAttribute("aria-hidden", "true");
    colon.append(document.createElement("span"));
    colonGroup.append(colon);
  });

  countdownRoot.append(colonGroup);
};

const getCountdownParts = () => {
  const now = new Date();
  const diff = now < START_DATE ? END_DATE - START_DATE : Math.max(0, END_DATE - now);
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
};

const initCountdown = () => {
  if (!countdownRoot) return;

  countdownRoot.innerHTML = "";
  const initial = getCountdownParts();

  const days = addDigits(initial.days, 4);
  addColon();
  const hours = addDigits(initial.hours, 2);
  addColon();
  const minutes = addDigits(initial.minutes, 2);
  addColon();
  const seconds = addDigits(initial.seconds, 2);

  const update = () => {
    const countdown = getCountdownParts();
    days.number = countdown.days;
    hours.number = countdown.hours;
    minutes.number = countdown.minutes;
    seconds.number = countdown.seconds;

    if (countdownText) {
      countdownText.textContent = `${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes, and ${countdown.seconds} seconds remain in the five-year clock.`;
    }
  };

  update();
  window.setInterval(update, 1000);
};

class CollapsibleTimeline {
  constructor(selector) {
    this.el = document.querySelector(selector);
    if (!this.el) return;
    this.el.querySelectorAll(".timeline__arrow").forEach((button) => {
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        this.setItem(button, expanded);
      });
    });

    this.el.querySelectorAll("[data-action]").forEach((button) => {
      button.addEventListener("click", () => {
        this.groupAction(button.getAttribute("data-action"));
      });
    });
  }

  setItem(button, shouldCollapse) {
    const item = button.getAttribute("data-item");
    const body = this.el.querySelector(`#item${item}-ctrld`);
    if (!body) return;

    const content = body.firstElementChild;
    const contentHeight = content ? content.offsetHeight : 0;

    button.setAttribute("aria-expanded", shouldCollapse ? "false" : "true");
    body.setAttribute("aria-hidden", shouldCollapse ? "true" : "false");

    body.classList.toggle("timeline__item-body--expanded", !shouldCollapse);

    if (typeof body.animate === "function") {
      body.animate(
        shouldCollapse
          ? [{ height: `${contentHeight}px` }, { height: "0px" }]
          : [{ height: "0px" }, { height: `${contentHeight}px` }],
        {
          duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 350,
          easing: "cubic-bezier(0.65,0,0.35,1)"
        }
      ).addEventListener("finish", () => {
        body.style.height = "";
      });
    }
  }

  groupAction(action) {
    const buttons = [...this.el.querySelectorAll(".timeline__arrow")];

    buttons.forEach((button) => {
      const expanded = button.getAttribute("aria-expanded") === "true";

      if (action === "expand" && !expanded) {
        this.setItem(button, false);
      }

      if (action === "collapse" && expanded) {
        this.setItem(button, true);
      }
    });
  }
}

let siteInitialized = false;

const initSite = () => {
  if (siteInitialized) return;
  siteInitialized = true;

  if (/^(?:(?!chrome|android)[\s\S])*(?:safari|iPad|iPhone|iPod)/i.test(navigator.userAgent)) {
    document.body.classList.add("safari");
  }

  initCountdown();
  new CollapsibleTimeline("#timeline");
};

initSite();
window.addEventListener("DOMContentLoaded", initSite);
