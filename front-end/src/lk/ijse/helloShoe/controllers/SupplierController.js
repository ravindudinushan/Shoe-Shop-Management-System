const accessToken = localStorage.getItem('token');
loadSuppliers();
/**
 * Supplier ID
 * */
function generateSupplierID() {
    $("#txtSupplierCode").val("S00-001");
    $.ajax({
        url: "http://localhost:8080/app/api/v1/supplier/supplierIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (resp) {
            let id = resp.value;
            console.log("id" +id);
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#txtSupplierCode").val("S00-00" + tempId);
            } else if (tempId <= 99) {
                $("#txtSupplierCode").val("S00-0" + tempId);
            } else {
                $("#txtSupplierCode").val("S00-" + tempId);
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

/**
 * Button Add New Supplier
 * */
// Save customer
// Save supplier with validation
$("#btnSaveSupplier").click(function () {
    // Validate fields before saving
    checkValidity(supplierValidations);
    if (allFieldsValid(supplierValidations)) {
        // Proceed with saving
        var formData = $("#supplierForm").serialize();
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/app/api/v1/supplier",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function () {
                updateAlert("Supplier Saved Successfully");
                loadSuppliers();
                $("#supplierForm")[0].reset();
            },
            error: function (error) {
                unSuccessUpdateAlert("Supplier Saved UnSuccessfully");
                console.log("Error saving supplier: ", error);
            }
        });
    } else {
        // Display error message or prevent submission
        console.log("Validation failed");
    }
});

/**
 * clear input fields Values Method
 * */
function setTextFieldValues(supplierCode, supplierName, category, contact1, contact2, email, address1, address2, address3, address4, address5, address6) {
    $("#txtSupplierCode").val(supplierCode);
    $("#txtSupplierName").val(supplierName);
    $("#txtCategory").val(category);
    $("#txtContact1").val(contact1);
    $("#txtContact2").val(contact2);
    $("#txtEmail").val(email);
    $("#txtAddress1").val(address1);
    $("#txtAddress2").val(address2);
    $("#txtAddress3").val(address3);
    $("#txtAddress4").val(address4);
    $("#txtAddress5").val(address5);
    $("#txtAddress6").val(address6);
    $("#txtCusName").focus();
}

/**
 * load all supplier Method
 * */
function loadSuppliers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/app/api/v1/supplier",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (data) {
            displaySuppliers(data);
            blindClickEvents();
            generateSupplierID();
            setTextFieldValues("", "", "", "", "", "", "", "", "","", "", "");
            console.log(data.message);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}

// Function to display supplier in the table
function displaySuppliers(suppliers) {
    $("#supplierTable").empty();
    suppliers.forEach(function (supplier) {
        let address1 = supplier.address ? supplier.address.address1 : '';
        let address2 = supplier.address ? supplier.address.address2 : '';
        let address3 = supplier.address ? supplier.address.address3 : '';
        let address4 = supplier.address ? supplier.address.address4 : '';
        let address5 = supplier.address ? supplier.address.address5 : '';
        let address6 = supplier.address ? supplier.address.address6 : '';

        let contact1 = supplier.contact ? supplier.contact.contact1 : '';
        let contact2 = supplier.contact ? supplier.contact.contact2 : '';

        $("#supplierTable").append(
            `<tr>
                <td>${supplier.supplierCode}</td>
                <td>${supplier.supplierName}</td>
                <td>${supplier.category}</td>
                <td>${contact1}</td>
                <td>${contact2}</td>
                <td>${supplier.email}</td>
                <td>${address1}</td>
                <td>${address2}</td>
                <td>${address3}</td>
                <td>${address4}</td>
                <td>${address5}</td>
                <td>${address6}</td>
            </tr>`
        );
    });
}

/**
 * Table Listener Click and Load textFields
 * */
function blindClickEvents() {
    $("#supplierTable>tr").on("click", function () {
        let supplierCode = $(this).children().eq(0).text();
        let supplierName = $(this).children().eq(1).text();
        let category = $(this).children().eq(2).text();
        let contact1 = $(this).children().eq(3).text();
        let contact2 = $(this).children().eq(4).text();
        let email = $(this).children().eq(5).text();
        let address1 = $(this).children().eq(6).text();
        let address2 = $(this).children().eq(7).text();
        let address3 = $(this).children().eq(8).text();
        let address4 = $(this).children().eq(9).text();
        let address5 = $(this).children().eq(10).text();
        let address6 = $(this).children().eq(11).text();

        console.log(supplierCode, supplierName, category, contact1, contact2, email, address1, address2, address3, address4, address5, address6);
        $("#txtSupplierCode").val(supplierCode);
        $("#txtSupplierName").val(supplierName);
        $("#txtCategory").val(category);
        $("#txtContact1").val(contact1);
        $("#txtContact2").val(contact2);
        $("#txtEmail").val(email);
        $("#txtAddress1").val(address1);
        $("#txtAddress2").val(address2);
        $("#txtAddress3").val(address3);
        $("#txtAddress4").val(address4);
        $("#txtAddress5").val(address5);
        $("#txtAddress6").val(address6);
    });
    // $("#btnSaveSupplier").attr('disabled', true);
}

/**
 * Supplier Update
 * */
// Update supplier with validation
$("#btnUpdateSupplier").click(function () {
    // Validate fields before updating
    checkValidity(supplierValidations);
    if (allFieldsValid(supplierValidations)) {
        // Proceed with updating
        var formData = {
            supplierCode: $("#txtSupplierCode").val(),
            supplierName: $("#txtSupplierName").val(),
            category: $("#txtCategory").val(),
            contact: {
                contact1: $("#txtContact1").val(),
                contact2: $("#txtContact2").val()
            },
            email: $("#txtEmail").val(),
            address: {
                address1: $("#txtAddress1").val(),
                address2: $("#txtAddress2").val(),
                address3: $("#txtAddress3").val(),
                address4: $("#txtAddress4").val(),
                address5: $("#txtAddress5").val(),
                address6: $("#txtAddress6").val()
            }
        };

        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/app/api/v1/supplier",
            contentType: "application/json",
            data: JSON.stringify(formData),
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function () {
                updateAlert("Supplier updated successfully!");
                loadSuppliers();
            },
            error: function (error) {
                unSuccessUpdateAlert("Supplier updated unsuccessfully!");
                console.log("Error updating Supplier: ", error);
            }
        });
    } else {
        // Display error message or prevent submission
        console.log("Validation failed");
    }
});

/**
 * Supplier Delete
 * */
$("#btnDeleteSupplier").click(function () {
    var supId = $("#txtSupplierCode").val();
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/app/api/v1/supplier?supplierCode=" + supId, // Corrected URL
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function () {
            updateAlert("Supplier Delete Successfully");
            loadSuppliers();
        },
        error: function (error) {
            unSuccessUpdateAlert("Supplier Delete UnSuccessfully");
        }
    });
});

// Search Supplier
$("#searchSupCode").on("input", function () {
    var supId = $(this).val().trim();
    if (supId !== "") {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/app/api/v1/supplier/searchSupplier",
            data: { supplierCode: supId },
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (supplier) {
                displaySuppliers([supplier]);
                blindClickEvents();
            },
            error: function (error) {
                console.log("Error searching supplier: ", error);
            }
        });
    } else {
        loadSuppliers();
    }
});

const supplierValidations = [
    { field: $("#txtSupplierName"), reg: /^[a-zA-Z\s]{3,50}$/, error: "Supplier Name should be between 3 to 50 alphabetic characters." },
    { field: $("#txtContact1"), reg: /^[0-9]{10}$/, error: "Contact Number (Mobile) should be a 10-digit number." },
    { field: $("#txtContact2"), reg: /^[0-9]{10}$/, error: "Contact Number (Landline) should be a 10-digit number." },
    { field: $("#txtEmail"), reg: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, error: "Invalid email address." },
    { field: $("#txtAddress1"), reg: /^.{3,100}$/, error: "Address1 should be between 3 to 100 characters." },
    { field: $("#txtAddress2"), reg: /^.{3,100}$/, error: "Address2 should be between 0 to 100 characters." },
    { field: $("#txtAddress3"), reg: /^.{3,50}$/, error: "City should be between 3 to 50 characters." },
    { field: $("#txtAddress4"), reg: /^.{3,50}$/, error: "State should be between 3 to 50 characters." },
    { field: $("#txtAddress5"), reg: /^.{3,50}$/, error: "Country should be between 3 to 50 characters." },
    { field: $("#txtAddress6"), reg: /^.{3,50}$/, error: "Code should be between 3 to 50 characters." }
];

// Bind validation to input events for real-time validation
$("#txtSupplierName, #txtContact1, #txtContact2, #txtEmail, #txtAddress1, #txtAddress2, #txtAddress3, #txtAddress4, #txtAddress5, #txtAddress6").on('input', function () {
    checkValidity(supplierValidations);
});

// Function to check if all fields are valid
function allFieldsValid(validations) {
    for (let validation of validations) {
        if (!check(validation.reg, validation.field)) {
            return false;
        }
    }
    return true;
}