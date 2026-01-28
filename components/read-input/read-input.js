export default class ReadInput extends HTMLElement {
  #genPass;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<slot></slot>`;

    const styles = document.createElement("style");
    this.appendChild(styles);

    async function loadCss() {
      const res = await fetch("/components/read-input/read.css");
      const css = await res.text();
      styles.textContent = css;
    }

    loadCss();
  }

  get #copyBtn() {
    return this.querySelector(".copy-btn");
  }

  connectedCallback() {
    // Prevent re-render if reconnected
    if (this._initialized) return;
    this._initialized = true;

    this.#genPass = this.querySelector("input");

    this.#genPass.value = app.store.password;

    this.#copyBtn.addEventListener("click", async () => {
      if (this.#genPass.value) {
        try {
          await navigator.clipboard.writeText(this.#genPass.value);
          this.showToast();
        } catch (err) {
          console.log(err);
        }
      }
    });

    window.addEventListener("passwordchange", () => {
      this.#genPass.value = app.store.password;
    });
  }

  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard:", text);
      return true;
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  showToast() {
    const msg = document.createElement("span");
    msg.className = "copy-message";
    msg.textContent = "COPIED";
    msg.setAttribute("aria-live", "polite");

    this.insertBefore(msg, this.#copyBtn);

    setTimeout(() => {
      msg.remove();
    }, 5000);
  }
}

customElements.define("read-input", ReadInput);
