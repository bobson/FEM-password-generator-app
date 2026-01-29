// import { generatePassword } from "../../store";

export default class CheckboxInputs extends HTMLElement {
  #checkboxes;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<slot></slot>`;

    const styles = document.createElement("style");
    this.appendChild(styles);

    async function loadCss() {
      const res = await fetch("../../components/checkbox-input/checkbox.css");
      const css = await res.text();
      styles.textContent = css;
    }

    loadCss();
  }

  connectedCallback() {
    // Prevent re-render if reconnected
    if (this._initialized) return;
    this._initialized = true;

    this.#checkboxes = this.querySelectorAll(".sr-only");

    this.#checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", this.handleChange);
      checkbox.checked = false;
    });
  }

  handleChange(e) {
    const { name, checked } = e.target;
    const { options } = app.store;
    if (checked) {
      if (!options.includes(name)) {
        app.store.options = [...app.store.options, name];
      }
    } else {
      if (options.includes(name)) {
        const newOptions = app.store.options.filter((option) => name != option);
        app.store.options = newOptions;
      }
    }
    // app.generatePassword();
  }
}

customElements.define("checkbox-inputs", CheckboxInputs);
