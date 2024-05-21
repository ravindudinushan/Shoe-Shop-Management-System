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
                setTextFieldValues("", "", "", "", "", "", "","", "", "", "", "", "");
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
                    <td>${item.supplierCode}</td>
                    <td>${item.supplierName}</td>
                    <td>${item.unitPriceBuy}</td>
                    <td>${item.unitPriceSale}</td>
                    <td>${item.quantity}</td>
                    <td>${item.profit}</td>
                    <td>${item.profitMargin}</td>
                    <td>${item.status}</td>
                </tr>
            `);
        });
        // Bind delete event to newly added delete buttons
    }

// Function to load suppliers into the combo box with supplier code as value
function loadSuppliersIntoComboBox(suppliers) {
    var comboBox = $('#cmbSupplierCode');
    comboBox.empty(); // Clear existing options
    $.each(suppliers, function(index, supplier) {
        comboBox.append($('<option>', {
            value: supplier.supplierCode,
            text: supplier.supplierCode // Displaying supplier code in the combo box
        }));
    });
}

// Function to update supplier name based on selected supplier code
function updateSupplierName() {
    var selectedSupplierCode = $('#cmbSupplierCode').val();
    var selectedSupplier = suppliers.find(supplier => supplier.supplierCode === selectedSupplierCode);
    if (selectedSupplier) {
        $('#txtSupplierName').val(selectedSupplier.supplierName); // Displaying supplier name in txtSupplierName field
    } else {
        $('#txtSupplierName').val(''); // Clear txtSupplierName if no supplier found
    }
}

var suppliers; // Variable to store the suppliers data

// Load suppliers into combo box
loadSuppliers();

// Event listener for select element change
$('#cmbSupplierCode').on('change', function() {
    updateSupplierName();
});

function loadSuppliers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/app/api/v1/supplier",
        success: function (data) {
            suppliers = data; // Storing suppliers data in the variable
            loadSuppliersIntoComboBox(data);
            console.log(data.message); // Logging success message
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message); // Logging error message
        }
    });
}

$("#btnSaveItem").click(function () {
    checkValidity(inventoryValidations);
    if (allFieldsValid(inventoryValidations)) {
        var formData = $("#itemForm").serializeArray();
        var jsonData = {};
        $(formData).each(function (index, obj) {
            jsonData[obj.name] = obj.value;
        });

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/app/api/v1/inventory",
            data: JSON.stringify(jsonData),
            contentType: "application/json",
            success: function () {
                updateAlert("Item Saved Successfully");
                getAllInventory();
            },
            error: function (error) {
                unSuccessUpdateAlert("Item Saved Unsuccessfully");
                console.log("Error:", error);
            }
        });
    } else {
        console.log("Validation failed");
    }
});
// Function to update inventory item
$("#btnUpdateItem").click(function () {
    checkValidity(inventoryValidations);
    if (allFieldsValid(inventoryValidations)) {
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
    } else {
        console.log("Validation failed");
    }
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
function setTextFieldValues(itemCode, itemDesc, itemPic, category, size, supplierCode, supplierName, unitPriceBuy, unitPriceSale, quantity, profit, profitMargin, status) {
    $("#txtItemCode").val(itemCode);
    $("#txtItemName").val(itemDesc);
    $("#txtPic").val(itemPic);
    $("#txtCategory").val(category);
    $("#txtSize").val(size);
    $("#cmbSupplierCode").val(supplierCode);
    $("#txtSupplierName").val(supplierName);
    $("#txtPriceBuy").val(unitPriceBuy);
    $("#txtPriceSale").val(unitPriceSale);
    $("#txtQty").val(quantity);
    $("#txtProfit").val(profit);
    $("#txtProfitMargin").val(profitMargin);
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
        let supplierCode = $(this).children().eq(5).text();
        let supplierName = $(this).children().eq(6).text();
        let unitPriceBuy = $(this).children().eq(7).text();
        let unitPriceSale = $(this).children().eq(8).text();
        let quantity = $(this).children().eq(9).text();
        let profit = $(this).children().eq(10).text();
        let profitMargin = $(this).children().eq(11).text();
        let status = $(this).children().eq(12).text();

        console.log(itemCode, itemDesc, itemPic, category, size, supplierCode, supplierName, unitPriceBuy, unitPriceSale, quantity, profit, profitMargin, status);
        $("#txtItemCode").val(itemCode);
        $("#txtItemName").val(itemDesc);
        $("#txtPic").val(itemPic);
        $("#txtCategory").val(category);
        $("#txtSize").val(size);
        $("#cmbSupplierCode").val(supplierCode);
        $("#txtSupplierName").val(supplierName);
        $("#txtPriceBuy").val(unitPriceBuy);
        $("#txtPriceSale").val(unitPriceSale);
        $("#txtQty").val(quantity);
        $("#txtProfit").val(profit);
        $("#txtProfitMargin").val(profitMargin);
        $("#txtStatus").val(status);
    });
}

const inventoryValidations = [
    { field: $("#txtItemCode"), reg: /^I\d{2}-\d{3}$/, error: "Invalid item code. Format should be I00-000." },
    { field: $("#txtItemName"), reg: /^[a-zA-Z\s]+$/, error: "Invalid item description. Only alphabets and spaces allowed." },
    { field: $("#txtCategory"), reg: /^[a-zA-Z\s]+$/, error: "Invalid category. Only alphabets and spaces allowed." },
    { field: $("#txtSize"), reg: /^\d+$/, error: "Invalid size. Must be a number." },
    { field: $("#txtPriceBuy"), reg: /^\d+(\.\d{1,2})?$/, error: "Invalid price. Must be a valid number." },
    { field: $("#txtPriceSale"), reg: /^\d+(\.\d{1,2})?$/, error: "Invalid price. Must be a valid number." },
    { field: $("#txtQty"), reg: /^\d+$/, error: "Invalid quantity. Must be a number." },
    { field: $("#txtProfit"), reg: /^\d+(\.\d{1,2})?$/, error: "Invalid profit. Must be a valid number." },
    { field: $("#txtProfitMargin"), reg: /^\d+(\.\d{1,2})?$/, error: "Invalid profit margin. Must be a valid number." }
];

$("#txtItemCode, #txtItemName, #txtCategory, #txtSize, #txtPriceBuy, #txtPriceSale, #txtQty, #txtProfit, #txtProfitMargin").on('input', function () {
    checkValidity(inventoryValidations);
});

function allFieldsValid(validations) {
    return validations.every(validation => validation.reg.test(validation.field.val()));
}