async function fetchUsers() {

    try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        if (!token) {
            alert('You must be logged in to update your profile.');
            return;
        }

        const response = await fetch('http://localhost:5170/api/user/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
             const data = await response.json();
            console.log('Users response:', data); // Debugging line
            // Check if the response is an array or an object containing an array
           const users = Array.isArray(data) ? data : data.users;

            if (!Array.isArray(users)) {
               console.error('Expected an array of users');
                alert('Unexpected response format');
               return;
           }

            const usersTableElement = document.getElementById('usersTable');

            if (!usersTableElement) {
                console.error('User table not found');
                return;
            }

            const usersTable = usersTableElement.getElementsByTagName('tbody')[0];
            usersTable.innerHTML = ''; // Clear existing rows

            users.forEach(user => {
                const row = usersTable.insertRow();
                const usernameCell = row.insertCell(0);
                const roleCell = row.insertCell(1);
                const actionsCell = row.insertCell(2);

                usernameCell.textContent = user.username;
                roleCell.textContent = user.role;

                const viewLink = document.createElement('a');

                // Create View Details link
                if (user.role === 'babysitter'){
                viewLink.href = `view-user.html?id=${user._id}`; // Assuming user._id is the unique identifier
                viewLink.textContent = 'View Details';
                viewLink.style.marginRight = '10px';
                }

                // Create Delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = async () => {
                    if (confirm('Are you sure you want to delete this user?')) {
                        await deleteUser(user._id);
                        fetchUsers(); // Refresh the list after deletion
                    }
                };

                actionsCell.appendChild(viewLink);
                actionsCell.appendChild(deleteButton);
            });
        } else {
            console.error('Failed to fetch users:', response.status, response.statusText);
            alert('Failed to fetch users. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching users. Please try again later.');
    }
}

async function deleteUser(userId) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:5170/api/user/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error('Failed to delete user:', response.status, response.statusText);
            alert('Failed to delete user. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the user. Please try again later.');
    }
}

fetchUsers();