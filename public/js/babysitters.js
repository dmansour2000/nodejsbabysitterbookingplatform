async function fetchBabysitters() {
    try {
        const response = await fetch('http://localhost:5170/api/babysitter');
        const babysitters = await response.json();

        if (response.ok) {
            const babysittersTable = document.getElementById('babysittersTable').getElementsByTagName('tbody')[0];
            babysitters.forEach(babysitter => {
                const row = babysittersTable.insertRow();
                const nameCell = row.insertCell(0);
                const servicesCell = row.insertCell(1);
                const ageCell = row.insertCell(2);
                const nationalityCell = row.insertCell(3);
                const phoneCell = row.insertCell(4);

                nameCell.textContent = babysitter.name;
                servicesCell.textContent = babysitter.services.join(', ');
                ageCell.textContent = babysitter.age;
                nationalityCell.textContent = babysitter.nationality;
                phoneCell.textContent = babysitter.phone;
            });
        } else {
            alert('Failed to fetch babysitters');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchBabysitters();