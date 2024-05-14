getAllInventory();
/**
 * load all items Method
 * */
    // Function to retrieve all inventory items
    function getAllInventory() {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/app/api/v1/inventory",
            contentType: "application/json",
            success: function (response) {
                displayInventory(response);
                blindClickEvents();
                setTextFieldValues("", "", "", "", "", "", "", "", "");
                console.log(response.message);
            },
            error: function (error) {
                let message = JSON.parse(error.responseText).message;
                console.log(message);
            }
        });
    }

    // Function to display inventory items in table
    function displayInventory(items) {
        $("#itemTable").empty();
        items.forEach(function (item) {
            $("#itemTable").append(`
                <tr>
                    <td>${item.itemCode}</td>
                    <td>${item.itemDesc}</td>
                    <td><img src="data:image/png;base64,${item.itemPic}" alt="Item Image" style="width: 50px; height: 50px;"></td>
                    <td>${item.category}</td>
                    <td>${item.size}</td>
                    <td>${item.unitPriceBuy}</td>
                    <td>${item.unitPriceSale}</td>
                    <td>${item.quantity}</td>
                    <td>${item.status}</td>
                </tr>
            `);
        });
        // Bind delete event to newly added delete buttons
    }

$("#btnSaveItem").click(function () {
    // Serialize the entire form data
    var formData = $("#itemForm").serializeArray();

    // Convert the serialized form data to a JSON object
    var jsonData = {};
    $(formData).each(function (index, obj) {
        jsonData[obj.name] = obj.value;
    });

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/app/api/v1/inventory",
        data: JSON.stringify(jsonData), // Convert JSON object to string
        contentType: "application/json", // Set content type to JSON
        success: function () {
            updateAlert("Item Saved Successfully");
            getAllInventory();
        },
        error: function (error) {
            unSuccessUpdateAlert("Item Saved Unsuccessfully");
            console.log("Error:", error);
        }
    });
});

// Function to update inventory item
    $("#btnUpdateItem").click(function () {
        var formData = new FormData($("#itemForm")[0]);
        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/app/api/v1/inventory",
            data: formData,
            contentType: false,
            processData: false,
            success: function () {
                updateAlert("Item Update Successfully");
                getAllInventory();
            },
            error: function (error) {
                unSuccessUpdateAlert("Item Update UnSuccessfully");
                console.log("Error:", error);
            }
        });
    });

    // Function to delete inventory item
$("#btnDeleteItem").click(function () {
    var itemCode = $("#txtItemCode").val();
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/app/api/v1/inventory?itemCode=${itemCode}`,
            contentType: "application/json",
            success: function () {
                updateAlert("Item Delete Successfully");
                getAllInventory();
            },
            error: function (error) {
                unSuccessUpdateAlert("Item Delete UnSuccessfully");
                console.log("Error:", error);
            }
        });
});
    // Function to search inventory item by item code
    $("#btnSearchItem").click(function () {
        var itemCode = $("#searchItemId").val();
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/app/api/v1/inventory/searchInventory?itemCode=${itemCode}`,
            contentType: "application/json",
            success: function (response) {
                if (response) {
                    displayInventory([response]);
                } else {
                    unSuccessUpdateAlert("Item not found!");
                }
            },
            error: function (error) {
                console.log("Error:", error);
            }
        });
    });

    getAllInventory();

/**
 * clear input fields Values Method
 * */
function setTextFieldValues(itemCode, itemDesc, itemPic, category, size, unitPriceBuy, unitPriceSale, quantity, status) {
    $("#txtItemCode").val(itemCode);
    $("#txtItemName").val(itemDesc);
    $("#txtPic").val(itemPic);
    $("#txtCategory").val(category);
    $("#txtSize").val(size);
    $("#txtPriceBuy").val(unitPriceBuy);
    $("#txtPriceSale").val(unitPriceSale);
    $("#txtQty").val(quantity);
    $("#txtStatus").val(status);
    $("#txtItemName").focus();
}

/**
 * Table Listener Click and Load textFields
 * */
function blindClickEvents() {
    $("#itemTable>tr").on("click", function () {
        let itemCode = $(this).children().eq(0).text();
        let itemDesc = $(this).children().eq(1).text();
        let itemPic = $(this).children().eq(2).text();
        let category = $(this).children().eq(3).text();
        let size = $(this).children().eq(4).text();
        let unitPriceBuy = $(this).children().eq(5).text();
        let unitPriceSale = $(this).children().eq(6).text();
        let quantity = $(this).children().eq(7).text();
        let status = $(this).children().eq(8).text();

        console.log(itemCode, itemDesc, itemPic, category, size, unitPriceBuy, unitPriceSale, quantity, status);
        $("#txtItemCode").val(itemCode);
        $("#txtItemName").val(itemDesc);
        $("#txtPic").val(itemPic);
        $("#txtCategory").val(category);
        $("#txtSize").val(size);
        $("#txtPriceBuy").val(unitPriceBuy);
        $("#txtPriceSale").val(unitPriceSale);
        $("#txtQty").val(quantity);
        $("#txtStatus").val(status);
    });
    // $("#btnSaveItem").attr('disabled', true);
}