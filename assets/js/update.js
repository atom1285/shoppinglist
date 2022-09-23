getIdUrl = base_api_url + '/api/sl/get/id/' + updateItemId;

$.ajax({
    type: "get",
    url: getIdUrl,
    success: function (response) {
        $('#name').val(response.name);
        $('#quantity').val(response.quantity);
        $('#unit').val(response.unit);
    }
});

var updateForm = $('#update-form');

updateForm.on('submit', function (event) { 
    event.preventDefault();

    updtUrl = base_api_url + "/api/sl/updt/" + updateItemId;

    var updtreq = $.ajax({
        type: "POST",
        url: updtUrl,
        data: updateForm.serialize(),
        success: function (response) {

            $('#update-form').remove();
            updateItemHTML(response);
            backFromUpdate();

        }
    });
    
});