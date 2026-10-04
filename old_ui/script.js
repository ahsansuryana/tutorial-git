// Konfigurasi demo (simulasi autentikasi sisi klien)
const DEMO_USER = {
    email: "admin@example.com",
    password: "123456",
};

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const togglePasswordBtn = document.getElementById("toggle-password");
const submitBtn = document.getElementById("btn-submit");
const alertBox = document.getElementById("alert");

// ----- Toggle tampil/sembunyi password -----
togglePasswordBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePasswordBtn.setAttribute(
        "aria-label",
        isHidden ? "Sembunyikan password" : "Tampilkan password"
    );
});

// ----- Validasi -----
function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
        setError(emailInput, emailError, "Email wajib diisi.");
        return false;
    }
    if (!emailRegex.test(value)) {
        setError(emailInput, emailError, "Format email tidak valid.");
        return false;
    }
    clearError(emailInput, emailError);
    return true;
}

function validatePassword() {
    const value = passwordInput.value;

    if (!value) {
        setError(passwordInput, passwordError, "Password wajib diisi.");
        return false;
    }
    if (value.length < 6) {
        setError(passwordInput, passwordError, "Password minimal 6 karakter.");
        return false;
    }
    clearError(passwordInput, passwordError);
    return true;
}

function setError(input, errorEl, message) {
    input.closest(".form-group").classList.add("invalid");
    errorEl.textContent = message;
}

function clearError(input, errorEl) {
    input.closest(".form-group").classList.remove("invalid");
    errorEl.textContent = "";
}

emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);

// ----- Submit -----
form.addEventListener("submit", (e) => {
    e.preventDefault();
    hideAlert();

    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Memproses...";

    // Simulasi delay request ke server
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Masuk";

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (email === DEMO_USER.email && password === DEMO_USER.password) {
            showAlert("Login berhasil! Mengalihkan...", "success");
            // Simulasi redirect setelah login sukses
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            showAlert("Email atau password salah. Coba lagi.", "error");
        }
    }, 800);
});

function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = `alert ${type}`;
    alertBox.hidden = false;
}

function hideAlert() {
    alertBox.hidden = true;
    alertBox.textContent = "";
}
