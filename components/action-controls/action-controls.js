export default class ActionContols extends HTMLElement {
  #generateBtn;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<slot></slot>`;

    const styles = document.createElement("style");
    this.appendChild(styles);

    async function loadCss() {
      const res = await fetch("/components/action-controls/actions.css");
      const css = await res.text();
      styles.textContent = css;
    }

    loadCss();
  }

  connectedCallback() {
    // Prevent re-render if reconnected
    if (this._initialized) return;
    this._initialized = true;

    this.#generateBtn = this.querySelector("button");

    this.#generateBtn.disabled =
      app.store.length == 0 || app.store.options.length == 0;

    window.addEventListener("storechange", () => {
      this.#generateBtn.disabled =
        app.store.length == 0 || app.store.options.length == 0;
    });

    window.addEventListener("passwordchange", () => {
      this.renderStrength();
    });

    this.#generateBtn.addEventListener("click", () => {
      app.generatePassword();
    });
  }

  renderStrength() {
    const lists = this.querySelectorAll("li");
    const text = this.querySelector(".strength-label");
    const score = app.store.passwordStrength;

    lists.forEach((list) => {
      list.style.backgroundColor = "transparent";
      list.style.borderColor = "var(--grey-200)";
    });

    const labelColors = [
      "var(--red-500)",
      "var(--orange-400)",
      "var(--yellow-300)",
      "var(--green-200)",
    ];

    for (let i = 0; i <= score; i++) {
      lists[i].style.backgroundColor = labelColors[score];
      lists[i].style.borderColor = labelColors[score];
    }

    text.textContent = app.store.strengthLabel;
  }
}

customElements.define("action-contols", ActionContols);
