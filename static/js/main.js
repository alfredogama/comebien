btnCheckout.addEventListener('click', function(e){
    e.preventDefault();
    var form = $(formCheckout)[0];
    var formData = new FormData(form);
    $.ajax({
        type: "POST",
        url: 'http://tenant1.localhost:8000/save_register/',
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: formData,
        success: async function (response, textStatus, jqXHR) {
            switch (jqXHR.status) {
                case 200:
                    console.log('todo ok');
                    break;
                case 202:
                    console.log(response.message)
                    break;
            }
        },
        complete: function(){
        },
        error: function (response, jqXHR, textStatus, errorThrown) {
            console.log('error', response.responseJSON);
            console.log('error', textStatus + ": " + jqXHR.status + " " + errorThrown);
        }
    });
});