document.addEventListener('DOMContentLoaded', () => {
    const auth_token = localStorage.getItem('auth_token');

    if (!auth_token) {
        window.location.href = 'login.html';
        return;
    }

    async function logout() {
        try {
            const response = await fetch('https://registromascotasapi.mascotascusco.wnpower.host/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth_token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}) // Cuerpo vacío para el logout
            });

            if (!response.ok) {
                throw new Error('No se pudo cerrar sesión');
            }

            localStorage.removeItem('auth_token');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Error:', error);
            // Puedes mostrar un mensaje de error al usuario si lo deseas
        }
    }

    logout();
});
