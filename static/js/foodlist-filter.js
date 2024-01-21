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