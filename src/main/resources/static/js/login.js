document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-user-form');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        fetch('/login', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    alert('Login successful!');
                    window.location.href = '/board.html'; // Переход к Kanban-доске после успешного входа
                    loginForm.reset();
                } else {
                    alert('Login failed! Please check your username and password.');
                }
            });
    });
});

