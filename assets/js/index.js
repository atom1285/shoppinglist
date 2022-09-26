(function ($) {
    // * grabs data from db into the list via API
    var req = $.ajax({ 
        type: "get",
        url: base_api_url + "/api/sl/get/nc",
        success: function (response) {

            response.data.forEach( item => {
                addItemToList(item);
            });

        }
    });
}( jQuery));