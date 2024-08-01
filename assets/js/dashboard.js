document.addEventListener('DOMContentLoaded', () => {
    const auth_token = localStorage.getItem('auth_token');
    const productsTable = document.getElementById('products-table').getElementsByTagName('tbody')[0];

    if (!auth_token) {
        window.location.href = 'login.html';
        return;
    }

    async function fetchProducts() {
        try {
            const response = await fetch('https://registromascotasapi.mascotascusco.wnpower.host/api/products', {
                headers: {
                    'Authorization': `Bearer ${auth_token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('No se pudo obtener los productos');
            }

            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error:', error);
            // Puedes mostrar un mensaje de error al usuario si lo deseas
        }
    }

    function renderProducts(products) {
        productsTable.innerHTML = '';
        products.forEach(product => {
            const row = productsTable.insertRow();
            row.insertCell().textContent = product.name;
            row.insertCell().textContent = product.description;
            row.insertCell().textContent = product.price;
            row.insertCell().textContent = product.quantity;
            row.insertCell().textContent = product.unit_of_measure;
            row.insertCell().innerHTML = `
                <button onclick="window.location.href='edit_product.html?id=${product.id}'">Actualizar</button>
                <button onclick="deleteProduct(${product.id})">Eliminar</button>
            `;
        });
    }

    window.deleteProduct = async function(id) {
        try {
            const response = await fetch(`https://registromascotasapi.mascotascusco.wnpower.host/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${auth_token}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('No se pudo eliminar el producto');
            }

            fetchProducts(); // Refrescar la lista de productos
        } catch (error) {
            console.error('Error:', error);
            // Puedes mostrar un mensaje de error al usuario si lo deseas
        }
    }

    fetchProducts();
});
