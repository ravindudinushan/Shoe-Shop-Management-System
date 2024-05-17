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
$("#btnSaveSupplier").click(function () {
    var formData = $("#supplierForm").serialize();
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/app/api/v1/supplier",
        data: formData,
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
$("#btnUpdateSupplier").click(function () {
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
        },
    };

    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/app/api/v1/supplier",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function () {
            updateAlert("Supplier updated successfully!");
            loadSuppliers();
        },
        error: function (error) {
            unSuccessUpdateAlert("Supplier updated unsuccessfully!");
            console.log("Error updating Supplier: ", error);
        }
    });
});

/**
 * Supplier Delete
 * */
$("#btnDeleteSupplier").click(function () {
    var supId = $("#txtSupplierCode").val();
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/app/api/v1/supplier?supplierCode=" + supId, // Corrected URL
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