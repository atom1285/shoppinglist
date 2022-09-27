getIdUrl = base_api_url + '/api/sl/get/id/' + updateItemId;

$.ajax({
    type: "get",
    url: getIdUrl,
    success: function (response) {
        $('#name').val(response.data.name);
        $('#quantity').val(response.data.quantity);
        $('#unit').val(response.data.unit);

        if (response.data.extraInfo != true) {
            $('#extraTextArea').hide();
        }
        else {
            $("#extraInfoCheck").prop('checked', true);
        }
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

            if (response.data.extraInfo == true) {
                // setCookie('textAreaVisibility', false, 1);
                visibility = false;
            }
        }
    });
    
});