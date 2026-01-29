import { sliderCss } from "./sliderCss.js";

export default class SliderInput extends HTMLElement {
  #slider;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <slot></slot>
    `;
    const styles = document.createElement("style");
    this.appendChild(styles);
    styles.textContent = sliderCss;

    // async function loadCss() {
    //   const req = await fetch("../../components/slider-input/slider.css");
    //   const css = await req.text();
    //   styles.textContent = css;
    // }
    // loadCss();
  }

  get output() {
    return this.querySelector("#length-value");
  }

  connectedCallback() {
    // Prevent re-render if reconnected
    if (this._initialized) return;
    this._initialized = true;

    this.#slider = this.querySelector("#password-length");
    this.#slider.value = 10;

    this.#slider.addEventListener("change", this.updateSliderGradient);
    this.#slider.addEventListener("input", this.updateSliderGradient);

    this.updateSliderGradient();
  }

  updateSliderGradient = () => {
    const value = parseInt(this.#slider.value);
    const min = parseInt(this.#slider.min);
    const max = parseInt(this.#slider.max);
    const percentage = ((value - min) / (max - min)) * 100;
    this.output.textContent = value;
    app.store.length = value;

    // Update CSS variable
    this.#slider.style.setProperty("--percentage", `${percentage}%`);
  };
}

customElements.define("slider-input", SliderInput);

class MyComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Prevent re-render if reconnected
    if (this._initialized) return;
    this._initialized = true;

    const template = document.getElementById("my-component-template");
    const content = template.content.cloneNode(true);

    this.appendChild(content);
  }
}

customElements.define("my-component", MyComponent);
