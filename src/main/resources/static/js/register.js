document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-user-form');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const email = document.getElementById('register-email').value;

        const newUser = {
            username: username,
            passwordHash: password,
            email: email
        };

        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Registration failed');
                }
            })
            .then(data => {
                alert('You are registered!');
                window.location.href = '../login.html';
                registerForm.reset();
            });
    });
});
