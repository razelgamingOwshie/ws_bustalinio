// WS 301 - Student Registration Form
// Validates the form, shows field-specific error messages, manipulates CSS
// classes and HTML attributes, and handles the success and reset states.

const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");
const resetButton = document.getElementById("resetButton");

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const togglePasswordButton = document.getElementById("togglePassword");

// Show an error: add the .error class and write a specific message.
function showError(input, message) {
    const errorElement = document.getElementById(input.id + "Error");

    input.classList.add("error");
    input.setAttribute("aria-invalid", "true");

    if (errorElement) {
        // Fall back to the default message stored in the data-error attribute.
        errorElement.textContent = message || input.dataset.error || "This field is invalid.";
    }
}

// Clear an error: remove the .error class and empty the message.
function clearError(input) {
    const errorElement = document.getElementById(input.id + "Error");

    input.classList.remove("error");
    input.setAttribute("aria-invalid", "false");

    if (errorElement) {
        errorElement.textContent = "";
    }
}

// Remove unnecessary spaces, but only for fields marked with data-trim="true".
function getTrimmedValue(input) {
    if (input.dataset.trim === "true") {
        input.value = input.value.trim();
    }
    return input.value;
}

function validateStudentID() {
    const input = document.getElementById("studentId");
    const value = getTrimmedValue(input);

    if (!value) {
        showError(input, "Student ID is required.");
        return false;
    }

    if (!/^[A-Za-z0-9-]{4,20}$/.test(value)) {
        showError(input, "Student ID must be 4-20 characters and contain only letters, numbers, or hyphens.");
        return false;
    }

    clearError(input);
    return true;
}

function validateFullName() {
    const input = document.getElementById("fullName");
    const value = getTrimmedValue(input);

    if (!value) {
        showError(input, "Full name is required.");
        return false;
    }

    if (!/^[A-Za-zÀ-ÿ\s.'-]{2,100}$/.test(value)) {
        showError(input, "Enter a valid full name.");
        return false;
    }

    clearError(input);
    return true;
}

function validateEmail() {
    const input = document.getElementById("email");
    const value = getTrimmedValue(input);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!value) {
        showError(input, "Email address is required.");
        return false;
    }

    if (!emailPattern.test(value)) {
        showError(input, "Enter a valid email address, such as student@example.com.");
        return false;
    }

    clearError(input);
    return true;
}

function validatePhone() {
    const input = document.getElementById("phone");
    const value = getTrimmedValue(input);

    // Accepted format: 09XXXXXXXXX or +639XXXXXXXXX
    const phonePattern = /^(09\d{9}|\+639\d{9})$/;

    if (!value) {
        showError(input, "Phone number is required.");
        return false;
    }

    if (!phonePattern.test(value)) {
        showError(input, "Enter a valid Philippine mobile number (09XXXXXXXXX or +639XXXXXXXXX).");
        return false;
    }

    clearError(input);
    return true;
}

function validateDateOfBirth() {
    const input = document.getElementById("dob");
    const value = input.value;

    if (!value) {
        showError(input, "Date of birth is required.");
        return false;
    }

    const birthDate = new Date(value);
    const today = new Date();

    if (Number.isNaN(birthDate.getTime()) || birthDate > today) {
        showError(input, "Enter a valid date of birth that is not in the future.");
        return false;
    }

    clearError(input);
    return true;
}

function validateGender() {
    // The radio group lives inside the container with id="gender".
    const genderGroup = document.getElementById("gender");
    const selectedGender = form.querySelector('input[name="gender"]:checked');

    if (!selectedGender) {
        showError(genderGroup, "Please select your gender.");
        return false;
    }

    clearError(genderGroup);
    return true;
}

function validateProgram() {
    const input = document.getElementById("program");

    if (!input.value) {
        showError(input, "Please select your program.");
        return false;
    }

    clearError(input);
    return true;
}

function validateYearLevel() {
    const input = document.getElementById("yearLevel");

    if (!input.value) {
        showError(input, "Please select your year level.");
        return false;
    }

    clearError(input);
    return true;
}

function validatePassword() {
    const input = passwordInput;
    const value = input.value;

    if (!value) {
        showError(input, "Password is required.");
        return false;
    }

    if (value.length < 8) {
        showError(input, "Password must contain at least 8 characters.");
        return false;
    }

    clearError(input);
    return true;
}

function validateConfirmPassword() {
    const input = confirmPasswordInput;

    if (!input.value) {
        showError(input, "Please confirm your password.");
        return false;
    }

    if (input.value !== passwordInput.value) {
        showError(input, "Passwords do not match.");
        return false;
    }

    clearError(input);
    return true;
}

function validateAddress() {
    const input = document.getElementById("address");
    const value = getTrimmedValue(input);

    if (!value) {
        showError(input, "Address is required.");
        return false;
    }

    if (value.length < 5) {
        showError(input, "Address must contain at least 5 characters.");
        return false;
    }

    clearError(input);
    return true;
}

function validateAgreement() {
    const input = document.getElementById("agreement");

    if (!input.checked) {
        showError(input, "You must agree to the terms and conditions.");
        return false;
    }

    clearError(input);
    return true;
}

// Access custom data-* attributes using element.dataset.
const studentIdInput = document.getElementById("studentId");

if (studentIdInput) {
    // data-label provides an accessible name; data-hint provides a tooltip.
    const fieldLabel = studentIdInput.dataset.label;
    const fieldHint = studentIdInput.dataset.hint;

    if (fieldLabel) {
        studentIdInput.setAttribute("aria-label", fieldLabel);
    }

    if (fieldHint) {
        studentIdInput.title = fieldHint;
    }
}

// Manipulate the max attribute so users cannot pick a future date.
const dateInput = document.getElementById("dob");

if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.setAttribute("max", `${year}-${month}-${day}`);
}

// Show or hide the password using classList.toggle() and the data-target attribute.
if (togglePasswordButton && passwordInput && confirmPasswordInput) {
    togglePasswordButton.addEventListener("click", function () {
        // data-target names the field this button controls.
        const targetInput = document.getElementById(this.dataset.target);
        const isPasswordHidden = targetInput.type === "password";

        // Manipulate the type attribute to reveal or conceal the password text.
        targetInput.type = isPasswordHidden ? "text" : "password";
        confirmPasswordInput.type = isPasswordHidden ? "text" : "password";

        this.classList.toggle("is-visible", isPasswordHidden);
        this.textContent = isPasswordHidden ? "Hide" : "Show";
        this.setAttribute("aria-pressed", String(isPasswordHidden));
    });
}

// Handle form submission with the submit event and the event object.
form.addEventListener("submit", function (event) {
    // Stop the browser from submitting the form while validation runs.
    event.preventDefault();

    successMessage.textContent = "";
    successMessage.classList.remove("show");

    const isValid = [
        validateStudentID(),
        validateFullName(),
        validateEmail(),
        validatePhone(),
        validateDateOfBirth(),
        validateGender(),
        validateProgram(),
        validateYearLevel(),
        validatePassword(),
        validateConfirmPassword(),
        validateAddress(),
        validateAgreement()
    ].every(Boolean);

    if (isValid) {
        successMessage.textContent = "Registration successful! Your information has been validated.";
        successMessage.classList.add("show");

        // Clear any remaining validation errors.
        form.querySelectorAll(".error").forEach(function (element) {
            element.classList.remove("error");
        });

        form.querySelectorAll('[aria-invalid="true"]').forEach(function (element) {
            element.setAttribute("aria-invalid", "false");
        });

        form.querySelectorAll(".field-error").forEach(function (element) {
            element.textContent = "";
        });

        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
});

// Validate a field live as the user corrects it.
const fieldValidators = {
    studentId: validateStudentID,
    fullName: validateFullName,
    email: validateEmail,
    phone: validatePhone,
    dob: validateDateOfBirth,
    gender: validateGender,
    program: validateProgram,
    yearLevel: validateYearLevel,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
    address: validateAddress,
    agreement: validateAgreement
};

Object.keys(fieldValidators).forEach(function (fieldId) {
    const input = document.getElementById(fieldId);

    if (!input) return;

    const isRadioGroup = input.classList.contains("radio-options");
    const eventType =
        input.tagName === "SELECT" ||
        input.type === "checkbox" ||
        input.type === "date" ||
        isRadioGroup
            ? "change"
            : "input";

    input.addEventListener(eventType, function () {
        fieldValidators[fieldId]();

        // Recheck password confirmation when the original password changes.
        if (fieldId === "password" && confirmPasswordInput.value) {
            validateConfirmPassword();
        }

        // Remove the success message if the form is edited.
        successMessage.textContent = "";
        successMessage.classList.remove("show");
    });
});

// Reset the form: clear values, errors, styling, and the success message.
if (resetButton) {
    resetButton.addEventListener("click", function () {
        form.reset();

        form.querySelectorAll(".error").forEach(function (element) {
            element.classList.remove("error");
        });

        form.querySelectorAll(".field-error").forEach(function (element) {
            element.textContent = "";
        });

        form.querySelectorAll('[aria-invalid="true"]').forEach(function (element) {
            element.setAttribute("aria-invalid", "false");
        });

        successMessage.textContent = "";
        successMessage.classList.remove("show");

        // Restore the password fields and the toggle button to their original state.
        passwordInput.type = "password";
        confirmPasswordInput.type = "password";

        if (togglePasswordButton) {
            togglePasswordButton.classList.remove("is-visible");
            togglePasswordButton.textContent = "Show";
            togglePasswordButton.setAttribute("aria-pressed", "false");
        }
    });
}
