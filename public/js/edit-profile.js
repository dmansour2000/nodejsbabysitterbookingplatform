document.getElementById('editProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;
    const nationality = document.getElementById('nationality').value;
    const services = Array.from(document.querySelectorAll('input[name="services"]:checked'))
                          .map(checkbox => checkbox.value);

    const profileData = {
        phone,
        age,
        nationality,
        services
    };

    try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (!token) {
            alert('You must be logged in to update your profile.');
            return;
        }

        const response = await fetch('http://localhost:5170/api/babysitters/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
            body: JSON.stringify(profileData)
        });

        const data = await response.json();
        if (response.ok) {
            alert('Profile updated successfully!');
        } else {
            alert(data.msg || 'Failed to update profile');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

