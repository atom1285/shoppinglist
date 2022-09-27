<?php 

    $form_type = $_GET['form_type'];

    if ($form_type == 'edit') {

        $form_type = 'update';
        $script_type = 'update';
        $placeholder = false;
        $button_value = 'update item';
    }
    else {
        
        $form_type = 'add';
        $script_type = 'add-form';
        $placeholder = true; 
        $button_value = 'add new item';
        
    }
?>


<form id="<?= $form_type?>-form" class="col col-sm-6" action="" method="post">

        <?php
            if ($form_type == 'update') {
                echo '<a href="#" class="btn btn-sm back bi bi-backspace " id="back-btn" onclick="backFromUpdate()"></a>';
            }
        ?>

		<p class="form-group">
            <label>
                Name
                <input class="form-control entry" type="text" name='name' id="name" <?php if ($placeholder == true) {echo 'placeholder="Item for you shopping list" required';}?>>
            </label>
        </p>
        <p class="form-group">
            <label>
                Quantity
                <input class="form-control entry" type="number" name="quantity" id="quantity" <?php if ($placeholder == true) {echo 'placeholder="Quantity" required';}?>>
            </label>
		</p>
        <label>
            Unit
            <select name="unit" id="unit" class="form-group form-control entry">
                <option value="ks"> Ks </option>
                <option value="kg"> Kilogram </option>
                <option value="l"> Liter </option>
                <option value="g"> Gram </option>
            </select>
        </label>
        <div class="extra" id="extra">

            <label>
                Extra info?
                <input id="extraInfoCheck" class="" type="checkbox" name="extraInfo" id="" onclick="extraInfoChecked()">
            </label>

            <p class="form-group" id="extraTextArea">
                <textarea name="extraInfoText" id="extraTextForm" cols="30" rows="3" class="form-control"><?php if ( $_GET['textAreaText'] != 'nothing' ) {echo $_GET['textAreaText'];}?>
                </textarea>
            </p>

        </div>
		<p class="form-group submit-button">
			<input class="btn-sm btn btn-danger btn-submit" type="submit" value="<?= $button_value ?>">
		</p>
    </form>

    <script src="assets/js/<?= $script_type ?>.js"></script>