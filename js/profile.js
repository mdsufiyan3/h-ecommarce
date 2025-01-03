document.addEventListener('DOMContentLoaded', async function() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    
    // List of admin emails
    const adminEmails = [
        'admin@hasuta.com',
        'abufiyan8@gmail.com',
        
        // Add more admin emails as needed
    ];

    try {
        // Get email from localStorage
        const userEmail = localStorage.getItem('userEmail');
        
        if (!userEmail) {
            window.location.href = 'login.html';
            return;
        }

        // Check if user is admin
        const isAdmin = adminEmails.includes(userEmail.toLowerCase());
        
        // Show/hide dashboard based on admin status
        const dashboardLink = document.querySelector('a[href="dashbord test/products.html"]');
        if (!isAdmin) {
            dashboardLink.style.display = 'none';
        }

        // Display name (using email username part)
        const userName = userEmail.split('@')[0];
        document.getElementById('profileName').textContent = userName.toUpperCase();
        
        // Update email display with proper error handling
        const emailElement = document.getElementById('profileEmail');
        if (emailElement) {
            emailElement.textContent = userEmail;
        } else {
            console.error('Email element not found in the DOM');
        }

        // Set avatar
        const hash = md5(userEmail.toLowerCase().trim());
        const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?d=identicon`;
        
        // Wait for avatar to load
        await new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.src = gravatarUrl;
        });
        
        document.getElementById('profileAvatar').src = gravatarUrl;
        
    } catch (error) {
        console.error('Error loading profile:', error);
    } finally {
        // Hide loading overlay
        loadingOverlay.classList.add('hidden');
    }

    // Add security overlay handlers
    const dashboardLink = document.querySelector('a[href="dashbord test/products.html"]');
    const securityOverlay = document.getElementById('securityOverlay');
    const cancelBtn = document.getElementById('cancelSecurity');
    const verifyBtn = document.getElementById('verifySecurity');
    const securityInput = document.getElementById('securityCode');
    let dashboardUrl = '';

    // Modify dashboard link click behavior
    dashboardLink.addEventListener('click', function(e) {
        e.preventDefault();
        dashboardUrl = this.href;
        securityOverlay.style.display = 'flex';
        securityInput.value = '';
        securityInput.focus();
    });

    // Handle cancel button
    cancelBtn.addEventListener('click', function() {
        securityOverlay.style.display = 'none';
    });

    // Handle verify button
    verifyBtn.addEventListener('click', function() {
        if (securityInput.value === 'HASU7644') { // This is where the code is checked
            securityOverlay.style.display = 'none';
            loadingOverlay.classList.remove('hidden');
            window.location.href = dashboardUrl;
        } else {
            alert('Incorrect security code');
            securityInput.value = '';
            securityInput.focus();
        }
    });

    // Handle Enter key in security input
    securityInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            verifyBtn.click();
        }
    });
});

// Logout function
window.logout = function() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
}