// Mobile navigation overlay display activation trigger
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}

// ================= FORM SUBMISSION HANDLER ================= 

// Handle form submissions via Formspree
document.addEventListener('submit', function(e) {
    if (e.target.action.includes('formspree.io')) {
        // Formspree handles submission natively, but we can add feedback
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Re-enable button after a delay
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }, 2000);
    }
});

// ================= SERVICE INQUIRY MODAL ================= 

// Open service form modal
function openServiceForm(serviceName) {
    const modal = document.getElementById('serviceModal');
    const serviceInput = document.getElementById('svc-service');
    
    if (modal && serviceInput) {
        serviceInput.value = serviceName;
        modal.style.display = 'block';
    }
}

// Close service form modal
function closeServiceForm() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    const serviceModal = document.getElementById('serviceModal');
    if (event.target === serviceModal) {
        serviceModal.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeServiceForm();
    }
});
