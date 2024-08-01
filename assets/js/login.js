document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('https://registromascotasapi.mascotascusco.wnpower.host/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                errorMessage.textContent = errorData.message || 'Error de inicio de sesión';
                return;
            }

            const data = await response.json();
            localStorage.setItem('auth_token', data.token);
            window.location.href = 'dashboard.html'; // Redirige al dashboard después del inicio de sesión
        } catch (error) {
            console.error('Error:', error);
            errorMessage.textContent = 'Error de conexión';
        }
    });
});
