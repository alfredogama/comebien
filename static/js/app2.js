document.addEventListener('DOMContentLoaded', function () {
    const inputImage = document.getElementById('photo');
    const preview = document.getElementById('previewImage');
    const saveButton = document.getElementById('save-button');
    const previewCanvas = document.getElementById('previewCanvas');

    let croppie;

    inputImage.addEventListener('change', function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function(event) {
                const imageUrl = event.target.result; // Obtener la URL de la imagen cargada

                // Inicializar Croppie con la imagen cargada
                croppie = new Croppie(preview, {
                    viewport: { width: 200, height: 200 }, // Definir el tamaño del área de recorte
                    boundary: { width: 300, height: 300 } // Definir el tamaño del contenedor
                });

                croppie.bind({
                    url: imageUrl // Vincular la imagen cargada a Croppie
                }).catch(function(error) {
                    console.error('Error binding image to Croppie:', error);
                });
            };
            reader.onerror = function(event) {
                console.error('FileReader error:', event);
            };
            reader.readAsDataURL(file);
        }
    });

    saveButton.addEventListener('click', function (e) {
        e.preventDefault();
        var food_1 = document.getElementById('food_1').value;
        var dateTime = document.getElementById('dateTime').value;
        // Obtener el área seleccionada por Croppie y redimensionarla a 1920x1920 píxeles
        croppie.result({
            type: 'blob',      // Tipo de salida: blob
            size: { width: 1920, height: 1920 }, // Nuevas dimensiones
            format: 'jpeg',    // Formato de la imagen: jpeg
            quality: 1         // Calidad de la imagen (0 a 1)
        }).then(function (blob) {
            // Crear un objeto FormData para enviar la imagen a la API
            const formData = new FormData();
            const newfileName = dateTime.replace("T", "_").replace(":", "-");
            const fileName = `archivo_${newfileName}.jpg`;
            formData.append('photo_1', blob, fileName); // Añadir la imagen al FormData
            // Añadir otros parámetros necesarios para la API
            formData.append('food_1', food_1);
            formData.append('created_at', dateTime);
            // Enviar la imagen al API
            fetch('/api/foodregister/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Imagen guardada exitosamente');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error al subir la imagen al servidor');
            });
        });
    });

    function generateFileName() {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 16).replace('T', '-');
        const randomString = Math.random().toString(36).substring(7);
        return `${formattedDate}-${randomString}.jpg`;
    }
});