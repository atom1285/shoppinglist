(function ($) {

    form = $('#add-form');
    clearAddForm();
    $('#extraTextArea').hide();

    form.on('submit', function (event) { 
        event.preventDefault();
        console.log(form.serialize())

        var addreq = $.ajax({
            type: "POST",
            url: base_api_url + "/api/sl/add",
            data: form.serialize(),
            success: function (response) {           
                addItemToList(response.data, true);
            }
        });
    });

}(jQuery));