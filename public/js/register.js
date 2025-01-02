document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;
    const name = document.getElementById('regName').value;
    const role = document.getElementById('regRole').value;

    try {
        const response = await fetch(`http://localhost:5170/api/${role}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, name })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registration successful!');
            localStorage.setItem('token', data.token); // Store the token
            // Redirect or perform other actions
            if (role === 'babysitter') {
                window.location.href = 'edit-profile.html';
            } else {
                window.location.href = 'babysitters.html'; // Redirect normal users to babysitters page
            }
        } else {
            alert(data.msg || 'Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});