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
                });
            }

            reader.readAsDataURL(file);
        }
    });

    saveButton.addEventListener('click', function (e) {
        e.preventDefault();
        let resizedCanvas;

        if (croppie) {
            croppie.result('canvas').then(function(croppedCanvas) {
                 console.log(croppedCanvas);
                 resizedCanvas = resizeImage(croppedCanvas, 1920, 1920);
                 resizedCanvas.toBlob(function (blob) {
                     var food_1 = document.getElementById('food_1').value;
                     var dateTime = document.getElementById('dateTime').value;

                new ImageCompressor(blob, {
                    quality: 0.8, // Puedes ajustar la calidad según tus necesidades
                    success(result) {
                        var formData = new FormData();
                        const newfileName = dateTime.replace("T", "_").replace(":", "-");
                        const fileName = `archivo_${newfileName}.jpg`;

                        formData.append('food_1', food_1);
                        formData.append('created_at', dateTime);
                        formData.append('photo_1', result, fileName);

                        // Enviar la imagen al servidor utilizando Fetch API
                        fetch('/api/foodregister/', {
                            method: 'POST',
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
            });

        } else {
            alert('Primero selecciona una imagen y realiza el recorte.');
        }
    });

    function generateFileName() {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 16).replace('T', '-');
        const randomString = Math.random().toString(36).substring(7);
        return `${formattedDate}-${randomString}.jpg`;
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
});