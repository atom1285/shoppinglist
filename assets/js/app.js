//// global variables
var base_api_url = 'http://localhost:8888/octobertest';
var numberOfItems = 0;
setCookie('textAreaVisibility', false, 1);

//// functions

function is_even(number) {
    return (number % 2 == 0);
}

/**
 * @param {int} number 
 * @returns string: 'even' or 'odd'
 */
function get_parity(number) {
    return (is_even(number) ? 'even' : 'odd');
}

/**
 * @param {string} cname cookie name 
 * @returns cookie value
 */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
        return "";
    }

/**
 * @param {string} cname cookie name 
 * @param {any} cvalue cookie value 
 * @param {int} exdays days till expiration 
 */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
    }

/**
 *  random debug color
 * @returns color name as string
 */    
 function randomDebugColor() {
    colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
    var x = getCookie('debugPrintAmount');
    x++;

    setCookie('debugPrintAmount', parseInt(x), 3);

    color = colors[x % 6];

    return color;
}

/**
 * reads a debug cookie, debug cookie default name 'debug0'
 * @param {int} messageID 
 * @returns debug cookie value
 */
function readDebugCookie(messageID = 0) {
    return getCookie('debug' + messageID);
}

function readDebugCookieAndOutput(messageID = 0) {
    var message = readDebugCookie(messageID);
    var color = randomDebugColor();

    console.log(message);

    var debugPre = $('<pre class="debugMessage ' + color +'"> ' + message +' </pre>');

    debugPre.appendTo('#debug-div');
}

/** adds an item to the html list, if is_new = true, this is a new item and the animation will be done accordingly 
 * @param {JSON} item
 * @param {bool} is_new (default = false)
 */
function addItemToList( item, is_new = false) { 

        if ( item.extraInfo == true) {
            var buttons =   '<button class="tool-btn cmplt-btn bi bi-check2-circle" onclick="itemButtonPress(this.id)" id="tick_' + item.id + '"></button>' + 
                            '<button class="tool-btn edit-btn bi bi-pencil-square" onclick="itemButtonPress(this.id)" id="edit_' + item.id + '"></button> '

            var info_btn = '<button class="info-btn bi bi-info-square" data-toggle="modal" data-target="#InfoModal" onclick="itemButtonPress(this.id)" id="info_' + item.id + '" data-bs-toggle="modal" data-bs-target="#InfoModal"></button>';
            var data = ' data-sl-extraInfo = "true" data-sl-extraInfoText="' + item.extraInfoText + ' " ';

            var li = $('<li class="list-group-item ' + get_parity(numberOfItems + 1) + '-item" id="' + 'item_' + item.id + '" ' + data + '><label>' + item.name + ' ' + item.quantity + item.unit + info_btn + '</label>' + buttons + '</li>');
        }
        else {
            var buttons =   '<button class="tool-btn cmplt-btn bi bi-check2-circle" onclick="itemButtonPress(this.id)" id="tick_' + item.id + '"></button>' +
                            '<button class="tool-btn edit-btn bi bi-pencil-square" onclick="itemButtonPress(this.id)" id="edit_' + item.id + '"></button>'
                            
            var li = $('<li class="list-group-item ' + get_parity(numberOfItems + 1) + '-item" id="' + 'item_' + item.id +'">' + item.name + ' ' + item.quantity + item.unit + buttons + '</li>');
        }
        

        if( is_new == false) {
            li.hide()
            .appendTo('#item-list')
            .fadeIn();

        }
        else if ( is_new ) {
            li.appendTo('#item-list')
              .css({ backgroundColor: '#00bc8c' })
              .delay(200)

            if ( is_even(numberOfItems + 1) ) {
                color = '#2c2c2c'
            }
            else {
                color = '#303030'
            }
            li.animate({ backgroundColor: color })

            clearAddForm();
        }

        numberOfItems++;
}

/** updates/ticks an item via request to API
 * @param {string} text_id string of the button id
 */
function itemButtonPress(text_id) { 

    firstLetter = text_id.charAt(0);

    if (firstLetter == 't') { // if id of the button starts with t (as tick) the item will be completed/ticked
        id = text_id.replace("tick_", "");
        my_url = base_api_url + '/api/sl/comp/' + id;

        $.ajax({
            type: "POST",
            url: my_url,
            success: function (response) {
                $("#item_" + id).remove();
            }
        });
    }
    else if (firstLetter == 'e') { // if id of the button starts with e (as edit) reditect to edit page will happen
        updateItemId = text_id.replace("edit_", "");

        $('#heading').text('Update item');
        // $('#add-form').toggle();
        $('#item-list').toggle();

        if ( $('#item_' + updateItemId).attr('data-sl-extraInfo') == 'true' ) {
            setCookie('textAreaText', $('#item_' + updateItemId).attr('data-sl-extraInfoText') , 1);
            console.log('yes I am here')
        }
        else {
            setCookie('textAreaText', ' ' , 1);
        }
        
        $('#div-form').load('./_partials/update.php');
    }
    else if (firstLetter == 'i') {
        id = text_id.replace('info_', '');
        my_url = base_api_url + '/api/sl/get/id/' + id;

        $('#InfoModalLabel').text( $('#item_' + id).text() );
        $('#modalText').text( $('#item_' + id).attr('data-sl-extraInfoText') );
    }
}

/** resets the page after coming back from updating an item
 */
function backFromUpdate() { 
    
    $('#item-list').toggle();
    $('#update-form').remove();

    $('#heading').text('Your shopping list');

    $('#div-form').load('./_partials/form.php');
  }

/** updates item html
 * @param {JSON} APIResponse 
 */
function updateItemHTML(APIResponse) {

    if ( APIResponse.extraInfo == true) {
        var buttons =   '<button class="tool-btn cmplt-btn bi bi-check2-circle" onclick="itemButtonPress(this.id)" id="tick_' + APIResponse.id + '"></button>' + 
                        '<button class="tool-btn edit-btn bi bi-pencil-square" onclick="itemButtonPress(this.id)" id="edit_' + APIResponse.id + '"></button> ' +
                        '<button class="tool-btn info-btn bi bi-info-square" data-toggle="modal" data-target="#InfoModal" onclick="itemButtonPress(this.id)" id="info_' + APIResponse.id + '"></button>';
    }
    else {
        var buttons =   '<button class="tool-btn cmplt-btn bi bi-check2-circle" onclick="itemButtonPress(this.id)" id="tick_' + APIResponse.id + '"></button>' +
                        '<button class="tool-btn edit-btn bi bi-pencil-square" onclick="itemButtonPress(this.id)" id="edit_' + APIResponse.id + '"></button>'
    }

    //basically just setting item's css and html
    item = $('#item_' + APIResponse.id).text(APIResponse.name + ' ' + APIResponse.quantity + APIResponse.unit);

    color = item.css( "background-color" );

    item.append(buttons)
        .css({ backgroundColor: 'orange' })
        .delay(100)
        .animate({ backgroundColor: color })
        .mouseenter( function() {
            $(item).css("background", "#555353");
        })
        .mouseleave( function() {
            $(item).css("background", color);
        });
    
    $('#heading').text('Your shopping list');
  }

/** Clears all entries in the add form */
function clearAddForm() {
    $('#name').focus();

    $('#name').val('');
    $('#quantity').val('');
    $('#extraTextForm').val('');
}

function clearModalText() {
    $('#modalText').text(''); 
}

function extraInfoChecked() {
    textArea = $('#extraTextArea');
    visibility = getCookie('textAreaVisibility');

    if ( visibility == 'false') {
        textArea.show();
        setCookie('textAreaVisibility', true, 1);
    }
    else {
        textArea.hide();
        $('#extraTextForm').val('');
        setCookie('textAreaVisibility', false, 1);
    }
}