<form id="add-form" class="col-sm-6" action="" method="post">
		<p class="form-group">
            <label>
                Name
                <input class="form-control" type="text" name='name' id="name" placeholder="Item for you shopping list" required>
            </label>
        </p>
        <p class="form-group">
            <label>
                Quantity
                <input class="form-control" type="number" name="quantity" id="quantity" placeholder="Quantity" required>
            </label>
		</p>
        <label>
            Unit
            <select name="unit" id="unit" class="form-group form-control">
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
                <textarea name="extraInfoText" id="extraTextForm" cols="30" rows="3" class="form-control"></textarea>
            </p>

        </div>
		<p class="form-group submit-button">
			<input class="btn-sm btn-danger" type="submit" value="add new item">
		</p>
    </form>

    <script src="assets/js/add-form.js"></script>
