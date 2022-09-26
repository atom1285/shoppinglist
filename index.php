<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="assets/css/bootstrap.css">
    <link rel="stylesheet" href="assets/css/bootstrap-icons.css">
    <!-- <link rel="stylesheet" href="assets/css/bootstrap.css"> -->
	<link rel="stylesheet" href="assets/css/main.css">
    

    <title>Your shopping list</title>

    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/popper.js"></script>
    <script src="assets/js/bootstrap.js"></script>
    
    <script src="assets/js/jquery.animate-colors.js"></script>

    <script src="assets/js/app.js"></script>

    <!-- php include -->
    <?php
        include "assets/php/helper_functions.php";
    ?>
</head>
<body>

    <main class="container" id="main">

    <div class="row">

    <h1 id='heading'> Your shopping list </h1>

    <?php
        // ? rework this with cookies or think of way to make it work with sessions
        if ( isset($_COOKIE['debugMessage']) && !empty($_COOKIE['debugMessage']) ) {
            pre($_COOKIE['debugMessage']);
        } 
    ?>

    <div class="col col-md-10"> 

    <ul id="item-list" class="list list-group">

        <!-- example li -->
        <!-- <li class="list-group-item"> something <button class="tool-btn cmplt-btn" id="tick_1" onclick="update_item()"> tick </button> <button class="tool-btn edit-btn" id="edit_1"> edit </button> </li> -->

    </ul> 

    </div>
    
    <div id="div-form">

    <?php 
        include('_partials/form.php'); 
    ?>

    </div>

    </div>

    </div>

  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#InfoModal">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal fade" id="InfoModal" tabindex="-1" aria-labelledby="InfoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="InfoModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <p id="modalText">

            </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
        </div>
      </div>
    </div>
  </div>

    <?php

    if ( isset($_GET['pass']) && $_GET['pass'] == 4499 ) {

        include('_partials/debug-div.php');
    }  

    ?>

    </main>

    <script src="assets/js/index.js"></script>

</body>
</html>