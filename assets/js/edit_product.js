document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('edit-product-form');
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // Obtener el ID del producto desde los parámetros de la URL

    if (!productId) {
        alert('No se proporcionó un ID de producto.');
        window.location.href = 'dashboard.html';
        return;
    }

    async function loadProduct() {
        const authToken = localStorage.getItem('auth_token');

        try {
            const response = await fetch(`https://registromascotasapi.mascotascusco.wnpower.host/api/products/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar el producto');
            }

            const product = await response.json();

            document.getElementById('product-id').value = product.id;
            document.getElementById('name').value = product.name;
            document.getElementById('description').value = product.description;
            document.getElementById('price').value = product.price;
            document.getElementById('quantity').value = product.quantity;
            document.getElementById('unit_of_measure').value = product.unit_of_measure;
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al cargar el producto');
        }
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const authToken = localStorage.getItem('auth_token');
        const formData = new FormData(form);

        try {
            const response = await fetch(`https://registromascotasapi.mascotascusco.wnpower.host/api/products/${formData.get('product-id')}`, {
                method: 'PUT',
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
                throw new Error('Error al actualizar el producto');
            }

            const result = await response.json();
            alert('Producto actualizado con éxito');
            window.location.href = 'dashboard.html'; // Redirige al dashboard después de actualizar
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al actualizar el producto');
        }
    });

    loadProduct();
});
