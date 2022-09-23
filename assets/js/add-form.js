(function ($) {

    form = $('#add-form');
    clearAddForm();

    form.on('submit', function (event) { 
        event.preventDefault();

        var addreq = $.ajax({
            type: "POST",
            url: base_api_url + "/api/sl/add",
            data: form.serialize(),
            success: function (response) {           
                add_item(response, true)
            }
        });
    });

}(jQuery));