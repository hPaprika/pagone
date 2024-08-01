document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-product-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const authToken = localStorage.getItem('auth_token');
        const formData = new FormData(form);

        try {
            const response = await fetch('https://registromascotasapi.mascotascusco.wnpower.host/api/products', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    description: formData.get('description'),
                    price: formData.get('price'),
                    quantity: formData.get('quantity'),
                    unit_of_measure: formData.get('unit_of_measure')
                })
            });

            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }

            const result = await response.json();
            alert('Producto creado con éxito');
            form.reset(); // Limpiar el formulario
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al crear el producto');
        }
    });
});
