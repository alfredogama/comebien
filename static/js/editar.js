const token = localStorage.getItem('token'); // o de donde sea que lo estés guardando
var preview;
var dateTime;
var food_1;
var saveButton;
var cropper;
var newfilename;

if (!token) {
    // Redirigir al usuario al login
    window.location.href = '/ingresar/';
}

// Function to obtain the ID from the URL
function cargarComidas() {
    fetch('/api/foods/')
        .then(response => response.json())
        .then(data => {
            var selectElement = food_1;

            // Agregar opciones al elemento de selección
            data.forEach(category => {
                var option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                selectElement.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al obtener categorías:', error);
        });
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

// Función para cargar los datos de la comida a editar
function cargarDatosComida() {
    var comidaId = obtenerIdDeUrl();

    if (comidaId !== null) {
        fetchDataFromServer(comidaId)
            .then(data => {
                var fechaHora = new Date(data.created_at);
                var formatoFechaHora = fechaHora.toISOString().slice(0, 16);
                dateTime.value = formatoFechaHora;
                food_1.value = data.food_1.toString();
                newfilename = data.photo_1;
                // Realiza otra solicitud para obtener el contenido binario de la imagen
                return fetch(data.photo_1);
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener la imagen desde la API');
                }
                return response.blob(); // Obtén el contenido binario de la imagen
            })
            .then(blob => {
                var archivoBlob = new Blob([blob], { type: 'image/jpeg' });

                // Crea un objeto File
                var file = new File([archivoBlob], 'demo.jpg', { type: 'image/jpeg' });

                if (file) {
                    const reader = new FileReader();

                    reader.onload = function (event) {
                        preview.src = event.target.result;
                        cropper = new Cropper(preview, {
                            aspectRatio: 1, // Puedes ajustar esto según tus necesidades
                            viewMode: 2,    // Puedes ajustar esto según tus necesidades
                        });
                    };

                    reader.readAsDataURL(file);
                }

                // Aquí puedes hacer más cosas con el objeto Blob, como mostrar la imagen o enviarla al servidor
            })
            .catch(error => {
                console.error('Error al cargar los datos de la comida desde el servidor:', error);
            });
    } else {
        console.error('Error al obtener el parámetro "id" de la URL');
    }
}

// Function to fetch data from the server (replace this with your actual server fetching logic)
function fetchDataFromServer(comidaId) {
    // Assuming you are using the Fetch API
    return fetch('/api/foodregister/'+ comidaId +'/editar', {
        method: 'GET',
        headers: {'Authorization': `Token ${token}`,
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos de la comida desde el servidor: ' + response.status);
            }
            return response.json();
        });
}

function resizeImage(canvas, maxWidth, maxHeight) {
    const ratio = Math.min(maxWidth / canvas.width, maxHeight / canvas.height);
    const width = canvas.width * ratio;
    const height = canvas.height * ratio;

    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = width;
    resizedCanvas.height = height;

    const ctx = resizedCanvas.getContext('2d');
    ctx.drawImage(canvas, 0, 0, width, height);

    return resizedCanvas;
}

// Call the function to load data when the page loads
document.addEventListener('DOMContentLoaded', function () {
    inputImage = document.getElementById('photo');
    preview = document.getElementById('previewImage');
    dateTime = document.getElementById('dateTime');
    food_1 = document.getElementById('food_1');
    saveButton = document.getElementById('save-button');

    cargarComidas();
    cargarDatosComida();

    saveButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (cropper) {
            const croppedCanvas = cropper.getCroppedCanvas();
            const resizedCanvas = resizeImage(croppedCanvas, 1920, 1920);

            food_1 = food_1.value;
            dateTime = dateTime.value;

            resizedCanvas.toBlob(function (blob) {

                new ImageCompressor(blob, {
                    quality: 0.8, // Puedes ajustar la calidad según tus necesidades
                    success(result) {
                        var formData = new FormData();

                        const urlObj = new URL(newfilename);
                        const pathName = urlObj.pathname;
                        const fileName = pathName.split('/').pop();

                        formData.append('food_1', food_1);
                        formData.append('created_at', dateTime);
                        formData.append('photo_1', result, fileName);

                        var comidaId = obtenerIdDeUrl();

                        // Enviar la imagen al servidor utilizando Fetch API
                        fetch('/api/foodregister/'+ comidaId +'/editar', {
                            method: 'PUT',
                            headers: {
                                'Authorization': `Token ${token}`,
                            },
                            body: formData,
                        })
                        .then(response => response.json())
                        .then(data => {
                            // Puedes hacer algo con la respuesta del servidor aquí
                            alert('Imagen guardada exitosamente');
                        })
                        .catch(error => {
                            console.error('Error al enviar la imagen al servidor:', error);
                        });
                    },
                    error(error) {
                        console.error('Error al comprimir la imagen:', error.message);
                    },
                });

            },'image/jpeg');
        } else {
            alert('Primero selecciona una imagen y realiza el recorte.');
        }
    });

    inputImage.addEventListener('change', function (e) {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                preview.src = event.target.result;
                cropper = new Cropper(preview, {
                    aspectRatio: 1, // Puedes ajustar esto según tus necesidades
                    viewMode: 2,    // Puedes ajustar esto según tus necesidades
                });
            };

            reader.readAsDataURL(file);
        }
    });
});
