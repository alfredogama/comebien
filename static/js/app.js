document.addEventListener('DOMContentLoaded', function () {
    const inputImage = document.getElementById('photo');
    const preview = document.getElementById('previewImage');
    const saveButton = document.getElementById('save-button');

    let cropper;

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

    saveButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (cropper) {
            const croppedCanvas = cropper.getCroppedCanvas();
            const resizedCanvas = resizeImage(croppedCanvas, 1920, 1920);

            var food_1 = document.getElementById('food_1').value;
            var dateTime = document.getElementById('dateTime').value;

            resizedCanvas.toBlob(function (blob) {

                new ImageCompressor(blob, {
                    quality: 0.8, // Puedes ajustar la calidad según tus necesidades
                    success(result) {
                        var formData = new FormData();
                        const fileName = generateFileName();
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