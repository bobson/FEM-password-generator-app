const Store = {
  length: 0,
  options: [],
  password: "",
  passwordStrength: 0,
  strengthLabel: "",
};

export function generatePassword() {
  const chars = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*",
  };

  // Build character pool AND track which types are selected
  let pool = "";

  Store.options.forEach((option) => {
    pool += chars[option];
  });

  if (!pool) return;

  // Start by adding one guaranteed character from each selected type
  let password = "";
  Store.options.forEach((option) => {
    password += chars[option][Math.floor(Math.random() * chars[option].length)];
  });

  // If password is already longer than requested length, truncate it
  if (password.length > Store.length) {
    return password.slice(0, length);
  }

  // Fill the rest with random characters from the pool
  for (let i = password.length; i < Store.length; i++) {
    password += pool[Math.floor(Math.random() * pool.length)];
  }

  return (proxiedStore.password = shuffleString(password));
}

// Helper function to shuffle the password
function shuffleString(str) {
  const arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

function getPasswordStrength(password) {
  const length = password.length;

  // 0 = too weak
  let criteria = 0;
  let score = 0;

  if (/[a-z]/.test(password)) criteria++; // lowercase
  if (/[A-Z]/.test(password)) criteria++; // uppercase
  if (/[0-9]/.test(password)) criteria++; // number
  if (/[^A-Za-z0-9]/.test(password)) criteria++; // symbol

  if (criteria < 2) score = 0; // too weak
  if (criteria === 2) score = length >= 12 ? 2 : 1; // medium or weak
  if (criteria === 3) score = length >= 12 ? 3 : 2; // strong or medium
  if (criteria === 4) score = length >= 12 ? 3 : 2; // strong or medium
  if (length < 6) score = 0;
  Store.passwordStrength = score;
}

function getStrengthLabel(score) {
  const labels = ["TOO WEAK!", "WEAK", "MEDIUM", "STRONG"];
  Store.strengthLabel = labels[score] || "";
}

const proxiedStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;

    if (property == "length" || property == "options") {
      window.dispatchEvent(new Event("storechange"));
    }
    if (property == "password") {
      getPasswordStrength(Store.password);
      getStrengthLabel(Store.passwordStrength);
      window.dispatchEvent(new Event("passwordchange"));
    }
    return true;
  },
  get(target, property) {
    return target[property];
  },
});

window.app = {};
app.store = proxiedStore;
app.generatePassword = generatePassword;
