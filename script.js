const firstName = document.querySelector('#firstname');
const lastName = document.querySelector('#lastname');
const fNameError = document.querySelector('.fname-error');
const lNameError = document.querySelector('.lname-error');
const email = document.querySelector('#email');
const emailError = document.querySelector('.email-error');
const phone = document.querySelector('#phone-number');
const phoneError = document.querySelector('.phone-error');
const passwordInput = document.getElementById('password');
const passwordError = document.querySelector('.password-error');
const pwInput = document.getElementById('confirmPassword');
const pwInputError = document.getElementById('confirm-password-error');
const submitBtn = document.querySelector('#submit-btn');
const signUpForm = document.querySelector('form');
const signUpError = document.querySelector('.signup-error');

document.addEventListener('DOMContentLoaded', () => {
    // verify pw strength
    const sections = [
        document.getElementById('strength-section-1'),
        document.getElementById('strength-section-2'),
        document.getElementById('strength-section-3')
    ];

    passwordInput.addEventListener('input', updatePasswordStrength);

    function updatePasswordStrength() {
        const value = passwordInput.value;
        const strength = calculatePasswordStrength(value);

        sections.forEach((section, index) => {
            section.className = 'strength-section';
            if (index < strength.level) {
                section.classList.add(strength.class);
            }
        });
    }
        
    function calculatePasswordStrength(password) {
        let strength = {
            level: 0,
            class: 'weak'
        };

        if (password.length >= 8) {
            strength.level++;
        }

        if (/[A-Z]/.test(password)) {
            strength.level++;
        }
        if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) {
            strength.level++;
        }

        if (strength.level === 3) {
            strength.class = 'strong';
        } else if (strength.level === 2) {
            strength.class = 'medium';
        } else {
            strength.class = 'weak';
        }

        return strength;
    }
    // hide/show pw
    const togglePassword = document.getElementById('toggle-pw');
    
    togglePassword.addEventListener('click', () => {
        // Toggle the type attribute of the password input field
        const type = pwInput.getAttribute('type') === 'password' ? 'text' : 'password';
        pwInput.setAttribute('type', type);
        
        // Change the eye icon to indicate the current state
        const icon = togglePassword.querySelector('i');
        if (type === 'password') {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    });

    firstName.addEventListener('focusout', () => {
        if (firstName.value.trim() == '') {
            firstName.classList.add('invalid-input');
            fNameError.textContent = 'Please enter your first name';
            firstName.classList.remove('valid-input');
        } else {
            firstName.classList.add('valid-input');
            fNameError.textContent = '';
            firstName.classList.remove('invalid-input');
        }
    });

    firstName.addEventListener('focusin', () => {
        if (firstName.classList.contains('invalid-input')) {
            firstName.classList.remove('invalid-input');
        }
        fNameError.textContent = '';
    });

    lastName.addEventListener('focusout', () => {
        if (lastName.value.trim() == '') {
            lastName.classList.add('invalid-input');
            lNameError.textContent = 'Please enter your last name'
            lastName.classList.remove('valid-input');
        } else {
            lastName.classList.remove('invalid-input');
            lNameError.textContent = '';
            lastName.classList.add('valid-input');
        }
    });

    lastName.addEventListener('focusin', () => {
        if (lastName.classList.contains('invalid-input')) {
            lastName.classList.remove('invalid-input');
        }
        lNameError.textContent = '';
    });

    email.addEventListener('focusout', () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex pattern
        if (!emailPattern.test(email.value.trim())) {
            email.classList.add('invalid-input');
            emailError.textContent = 'Please enter a valid email';
            email.classList.remove('valid-input');
        } else {
            email.classList.remove('invalid-input');
            emailError.textContent = '';
            email.classList.add('valid-input');
        }
    });

    email.addEventListener('focusin', () => {
        if (email.classList.contains('invalid-input')) {
            email.classList.remove('invalid-input');
        } 
        emailError.textContent = '';
    });

    phone.addEventListener('focusout', () => {
        const phonePattern = /^[0-9]{10}$/;
        if (phone.value.trim() !== '' && !phonePattern.test(phone.value.trim())) {
            phone.classList.add('invalid-input');
            phoneError.textContent = 'Please enter a valid phone number';
            phone.classList.remove('valid-input');
        } else if (phone.value.trim() !== '') {
            phone.classList.remove('invalid-input');
            phoneError.textContent = '';
            phone.classList.add('valid-input'); // Add valid class
        } else {
            phone.classList.remove('invalid-input');
            phoneError.textContent = '';
            phone.classList.remove('valid-input'); // Remove valid class if empty
        }    
    });

    phone.addEventListener('focusin', () => {
        if (phone.classList.contains('invalid-input')) {
            phone.classList.remove('invalid-input');
        }
        phoneError.textContent = ''; 
    })

    passwordInput.addEventListener('focusout', () => {
        if (passwordInput.value.trim().length < 8) {
            passwordInput.classList.add('invalid-input');
            passwordError.textContent = 'Password must have at least 8 characters!'
            passwordInput.classList.remove('valid-input')
        } else if (!(/\d/.test(passwordInput.value))) {
            passwordInput.classList.add('invalid-input');
            passwordError.textContent = 'Password must contain a number!'
            passwordInput.classList.remove('valid-input');
        } else if (!(/[^A-Za-z0-9]/.test(passwordInput.value))) {
            passwordError.textContent = 'Password must contain a special character!';
            passwordInput.classList.add('invalid-input');
            passwordInput.classList.remove('valid-input');
        } else {
            passwordInput.classList.add('check-passed');
            passwordError.textContent = '';
            passwordInput.classList.remove('invalid-input');
        }
    })

    passwordInput.addEventListener('focusin', () => {
        if (passwordInput.classList.contains('invalid-input')) {
            passwordInput.classList.remove('invalid-input');
        }
        if (passwordInput.classList.contains('check-passed')) {
            passwordInput.classList.remove('check-passed');
        }
        passwordError.textContent = '';
    });

    pwInput.addEventListener('focusin', () => {
        if (pwInput.classList.contains('invalid-input')) {
            pwInput.classList.remove('invalid-input');
        }
        if (pwInput.classList.contains('check-passed')) {
            pwInput.classList.remove('check-passed');
        }
        pwInputError.textContent = '';
    });

    pwInput.addEventListener('focusout', () => {
        if (pwInput.value.trim() !== '') {
            if (passwordInput.value !== pwInput.value) {
                pwInput.classList.add('invalid-input');
                pwInputError.textContent = 'Passwords do not match!'
                pwInput.classList.remove('valid-input');
            } else {
                pwInput.classList.add('check-passed');
                pwInputError.textContent = ''
                pwInput.classList.remove('invalid-input');
            }
        } else {
            pwInput.classList.remove('invalid-input');
            pwInput.classList.remove('valid-input');
            pwInputError.textContent = '';
        }
    });

    submitBtn.addEventListener('click', () => {
        signUpError.textContent = '';
        if (firstName.value.trim() !== '' && 
            lastName.value.trim() !== '' &&
            email.checkValidity() &&
            phone.checkValidity() &&
            passwordInput.value.trim().length >= 8 &&
            /\d/.test(passwordInput.value) &&
            /[^A-Za-z0-9]/.test(passwordInput.value) &&
            passwordInput.value == pwInput.value) {
                signUpForm.submit()
            } else {
                signUpError.textContent = 'Please fill in the required fields'
            }
    })
}); 
