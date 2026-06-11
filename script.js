// Mobile navigation overlay display activation trigger
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

if (mobileMenu && navList) {
    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}

// ================= FORM SUBMISSION HANDLER ================= 

// Handle all form submissions
document.addEventListener('submit', function(e) {
    if (e.target.action.includes('send-email.php') || e.target.action.includes('formspree')) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        // Disable submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Send form data
        fetch('send-email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            
            if (data.success) {
                // Show success message
                alert('✓ ' + data.message);
                form.reset();
                closeServiceForm();
            } else {
                alert('✗ Error: ' + data.message);
            }
        })
        .catch(error => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            alert('✗ Error sending message. Please try again.');
            console.error('Error:', error);
        });
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
