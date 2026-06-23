// Mobile navigation overlay display activation trigger
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');
const mobileIcon = mobileMenu ? mobileMenu.querySelector('i') : null;
const navLinks = navList ? navList.querySelectorAll('a') : [];

function updateMobileIcon(isActive) {
    if (!mobileIcon) return;
    mobileIcon.classList.toggle('fa-bars', !isActive);
    mobileIcon.classList.toggle('fa-xmark', isActive);
}

function toggleMobileNav() {
    if (!navList || !mobileMenu) return;
    const isActive = navList.classList.toggle('active');
    mobileMenu.setAttribute('aria-expanded', String(isActive));
    updateMobileIcon(isActive);
}

if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', toggleMobileNav);
    mobileMenu.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMobileNav();
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
                updateMobileIcon(false);
            }
        });
    });
}

async function handleFormSubmission(event) {
    const form = event.target;
    if (!form.action.includes('formspree.io')) return;

    event.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const statusElement = form.querySelector('.form-status');
    const originalBtnText = submitBtn ? submitBtn.textContent : 'Submit';

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
    }
    if (statusElement) {
        statusElement.className = 'form-status';
        statusElement.textContent = 'Sending your message...';
    }

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (result.ok === false) {
            throw new Error(result.error || 'Submission failed');
        }

        if (statusElement) {
            statusElement.classList.add('success');
            statusElement.textContent = 'Thank you! Your message was sent successfully.';
        }

        form.reset();
    } catch (error) {
        if (statusElement) {
            statusElement.classList.add('error');
            statusElement.textContent = 'Sorry, something went wrong. Please try again later.';
        }
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    }
}

document.addEventListener('submit', handleFormSubmission);

// Open service form modal
function openServiceForm(serviceName) {
    const modal = document.getElementById('serviceModal');
    const serviceInput = document.getElementById('svc-service');
    
    if (modal && serviceInput) {
        serviceInput.value = serviceName;
        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
    }
}

// Close service form modal
function closeServiceForm() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }
}

// Close modals when clicking outside of them
window.addEventListener('click', (event) => {
    const serviceModal = document.getElementById('serviceModal');
    if (event.target === serviceModal) {
        serviceModal.style.display = 'none';
    }
});

// Close modals with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeServiceForm();
    }
});
