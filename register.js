// Konfigurasi demo (simulasi registrasi sisi klien)
const form = document.getElementById("register-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const termsInput = document.getElementById("terms");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmError = document.getElementById("confirm-error");
const termsError = document.getElementById("terms-error");

const submitBtn = document.getElementById("btn-submit");
const alertBox = document.getElementById("alert");
const strengthBar = document.getElementById("strength-bar");
const strengthLabel = document.getElementById("strength-label");

// ----- Helper tampil/hapus error -----
function setError(input, errorEl, message) {
    if (input) input.closest(".form-group").classList.add("invalid");
    errorEl.textContent = message;
}

function clearError(input, errorEl) {
    if (input) input.closest(".form-group").classList.remove("invalid");
    errorEl.textContent = "";
}

// ----- Toggle tampil/sembunyi password -----
document.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.addEventListener("click", () => {
        const input = btn.parentElement.querySelector("input");
        const isHidden = input.type === "password";
        input.type = isHidden ? "text" : "password";
        btn.setAttribute(
            "aria-label",
            isHidden ? "Sembunyikan password" : "Tampilkan password"
        );
    });
});

// ----- Validasi -----
function validateName() {
    const value = nameInput.value.trim();
    if (!value) {
        setError(nameInput, nameError, "Nama lengkap wajib diisi.");
        return false;
    }
    if (value.length < 3) {
        setError(nameInput, nameError, "Nama minimal 3 karakter.");
        return false;
    }
    clearError(nameInput, nameError);
    return true;
}

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

function validateConfirm() {
    const value = confirmInput.value;
    if (!value) {
        setError(confirmInput, confirmError, "Konfirmasi password wajib diisi.");
        return false;
    }
    if (value !== passwordInput.value) {
        setError(confirmInput, confirmError, "Konfirmasi password tidak sama.");
        return false;
    }
    clearError(confirmInput, confirmError);
    return true;
}

function validateTerms() {
    if (!termsInput.checked) {
        setError(null, termsError, "Anda harus menyetujui Syarat & Ketentuan.");
        return false;
    }
    clearError(null, termsError);
    return true;
}

// ----- Indikator kekuatan password -----
function checkStrength(value) {
    let score = 0;
    if (value.length >= 6) score++;
    if (value.length >= 10) score++;
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (value.length === 0) return null;
    if (score <= 2) return "weak";
    if (score <= 3) return "medium";
    return "strong";
}

passwordInput.addEventListener("input", () => {
    const level = checkStrength(passwordInput.value);
    strengthBar.className = "strength-bar";
    strengthLabel.textContent = "";

    if (level) {
        strengthBar.classList.add(level);
        const labels = { weak: "Lemah", medium: "Sedang", strong: "Kuat" };
        strengthLabel.textContent = `Kekuatan password: ${labels[level]}`;
    }

    validatePassword();
    if (confirmInput.value) validateConfirm();
});

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
confirmInput.addEventListener("input", validateConfirm);
termsInput.addEventListener("change", validateTerms);

// ----- Submit -----
form.addEventListener("submit", (e) => {
    e.preventDefault();
    hideAlert();

    const isValid =
        validateName() &
        validateEmail() &
        validatePassword() &
        validateConfirm() &
        validateTerms();

    if (!isValid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Memproses...";

    // Simulasi delay request ke server
    setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Daftar";

        showAlert("Pendaftaran berhasil! Mengalihkan ke halaman masuk...", "success");

        // Simulasi redirect setelah registrasi sukses
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
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
