const token = localStorage.getItem('token'); // o de donde sea que lo estés guardando
var container;
var food_1;
var saveButton;
var cropper;
var newfilename;

if (!token) {
    // Redirigir al usuario al login
    window.location.href = '/ingresar/';
}
function obtenerIdDeUrl() {
    // Obtain the URL parameters
    var urlSearchParams = new URLSearchParams(window.location.search);

    // Get the value of the 'id' parameter
    var idParam = urlSearchParams.get('id');

    if (idParam !== null) {
        // Convert the parameter value to an integer
        return parseInt(idParam, 10);
    } else {
        console.error('No se pudo encontrar el parámetro "id" en la URL');
        return null;
    }
}

// Call the function to load data when the page loads
document.addEventListener('DOMContentLoaded', function () {
    container = document.getElementById('mealContainer');
    cargarLista();
});
function cargarLista() {
    var comida_id = obtenerIdDeUrl();
    fetch(`/api/filterbyname/${ comida_id }`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            data.forEach(food => {
                const foodItem = createFoodItem(food);
                container.appendChild(foodItem);
            });
        })
        .catch(error => {
            console.error('Error al obtener categorías:', error);
        });

    const createFoodItem = (food) => {
        const foodItem = document.createElement('div');
        foodItem.classList.add('meal-card');

        const image = document.createElement('img');
        image.classList.add('meal-image');
        // Check if the image URL is blank or null
        if (food.photo_1 && food.photo_1.trim() !== '') {
          image.src = food.photo_1;
        } else {
          // Use a default square image if the URL is blank or null
          image.src = "{% static 'img/default.jpeg' %}"; // Replace with your default image URL
        }

        const foodName = document.createElement('div');
        foodName.classList.add('meal-name');

        var enlace = document.createElement("a");
        enlace.href = `/editar/?id=${food.id}`;
        const fecha = new Date(food.created_at);
        enlace.textContent =  formatearFecha(fecha);

        // const fecha = new Date(food.created_at);
        // foodName.textContent = fecha.getDate();

        foodItem.appendChild(image);
        foodItem.appendChild(foodName);
        foodName.appendChild(enlace);

        return foodItem;
    };
    function formatearFecha(fecha) {
        // Obtener cadena en formato ISO (yyyy-mm-ddThh:mm:ss.sssZ)
        const isoString = fecha.toISOString();

        // Extraer los componentes necesarios
        const formatoFecha = isoString.slice(0, 16).replace('T', ' ');

        return formatoFecha;
    }
}