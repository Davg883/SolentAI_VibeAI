// Function to open a modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        // Optional: Add class to body to prevent scrolling when modal is open
        // document.body.style.overflow = 'hidden';
    }
}

// Function to close a modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Optional: Restore body scrolling
        // document.body.style.overflow = 'auto';
    }
}

// Close modal if clicking directly on the modal backdrop (outside the content)
window.addEventListener('click', function(event) {
    // Check if the clicked element is the modal backdrop itself
    if (event.target.classList.contains('modal') && event.target.classList.contains('active')) {
        // event.target is the modal backdrop element
        closeModal(event.target.id);
    }
});


// Function to get URL parameters (for investor name personalization)
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Personalize investor name placeholders on page load
document.addEventListener('DOMContentLoaded', () => {
    const investorName = getQueryParam('investor'); // Example: ?investor=Awesome%20Funders

    if (investorName) {
        document.getElementById('investorName1').textContent = investorName;
        document.getElementById('investorName2').textContent = investorName;
        document.getElementById('investorName3').textContent = investorName;
    } else {
        // Keep the default placeholder if no parameter is provided
        // You might want to hide these sections or show a generic message
        // if no investor name is specified, depending on the use case.
        console.log("No 'investor' query parameter found. Using default placeholders.");
    }

    // Smooth scrolling for anchor links (redundant if using html class="scroll-smooth", but good fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Ensure it's a valid ID selector and not just "#"
            if (hrefAttribute && hrefAttribute.length > 1 && hrefAttribute.startsWith('#')) {
                const targetElement = document.querySelector(hrefAttribute);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});

// Optional: Add simple scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in'); // Use the fade-in class defined in HTML style
        }
        // Optional: remove class when element leaves viewport to re-trigger animation
        // else {
        //     entry.target.classList.remove('fade-in');
        // }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

// Observe sections or elements you want to animate
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section > div').forEach(el => { // Observe direct div children of sections
        observer.observe(el);
    });
     document.querySelectorAll('.card').forEach(el => { // Observe cards
        observer.observe(el);
    });
});
