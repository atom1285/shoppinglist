getIdUrl = base_api_url + '/api/sl/get/id/' + updateItemId;

$.ajax({
    type: "get",
    url: getIdUrl,
    success: function (response) {
        $('#name').val(response.data.name);
        $('#quantity').val(response.data.quantity);
        $('#unit').val(response.data.unit);
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
            updateItemHTML(response.data);
            backFromUpdate();

        }
    });
    
});