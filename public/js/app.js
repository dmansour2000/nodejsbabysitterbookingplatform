document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:5170/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Login successful!');
            localStorage.setItem('token', data.token); // Store the token
            // Redirect or perform other actions
            const role = data.user.role; // Assuming the response includes the user's role
            if (role === 'babysitter') {
                window.location.href = 'edit-profile.html';
            } else if (role === 'admin') {
                window.location.href = 'admin-panel.html';
            } else {
                window.location.href = 'babysitters.html'; // Redirect normal users to babysitters page
            }
        } else {
            alert(data.msg || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});