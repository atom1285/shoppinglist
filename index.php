<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/main.css">

    <title>Your shopping list</title>

    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/jquery.animate-colors.js"></script>

    <script src="assets/js/app.js"></script>
    <!-- php include -->
    <?php
        include "assets/php/helper_functions.php";
    ?>
</head>
<body>

    <main class="container center" id="main">

    <h1 id='heading'> Your shopping list </h1>

    <?php
        // ? rework this with cookies or think of way to make it work with sessions
        if ( isset($_COOKIE['debugMessage']) && !empty($_COOKIE['debugMessage']) ) {
            pre($_COOKIE['debugMessage']);
        }        
    ?>

    <ul id="item-list" class="list-group col-sm-6">

        <!-- example li -->
        <!-- <li class="list-group-item"> something <button class="tool-btn cmplt-btn" id="tick_1" onclick="update_item()"> tick </button> <button class="tool-btn edit-btn" id="edit_1"> edit </button> </li> -->

    </ul> 
    
    <div id="div-form">

    <?php 
        include('_partials/add-form.php'); 
    ?>

    </div>

    <?php

    if ( isset($_GET['pass']) && $_GET['pass'] = 4499 ) {
            include('_partials/debug-div.php');
        }  
    ?>

    </main>

    <script src="assets/js/index.js"></script>

</body>
</html>