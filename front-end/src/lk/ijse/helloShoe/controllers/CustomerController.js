let baseUrl = "http://localhost:8080/app/api/v1/";
loadCustomers();
/**
 * Customer ID
 * */
function generateCustomerID() {
    $("#txtCusId").val("C00-001");
    $.ajax({
        url: baseUrl + "customer/customerIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" +id);
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#txtCusId").val("C00-00" + tempId);
            } else if (tempId <= 99) {
                $("#txtCusId").val("C00-0" + tempId);
            } else {
                $("#txtCusId").val("C00-" + tempId);
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

/**
 * Button Add New Customer
 * */
 // Save customer
    $("#btnSaveCustomer").click(function () {
        var formData = $("#customerForm").serialize();
        $.ajax({
            type: "POST",
            url: baseUrl + "customer",
            data: formData,
            success: function () {
                updateAlert("Customer Saved Successfully");
                loadCustomers();
                $("#customerForm")[0].reset();
            },
            error: function (error) {
                unSuccessUpdateAlert("Customer Saved UnSuccessfully");
                console.log("Error saving customer: ", error);
            }
        });
    });
/**
 * clear input fields Values Method
 * */
function setTextFieldValues(customerCode, customerName, gender, contact, email, dob, level, date, address1, address2, address3, address4, address5, points) {
    $("#txtCusId").val(customerCode);
    $("#txtCusName").val(customerName);
    $("#combGender").val(gender);
    $("#txtContact").val(contact);
    $("#txtEmail").val(email);
    $("#txtDob").val(dob);
    $("#combLevel").val(level);
    $("#txtDate").val(date);
    $("#txtAddress1").val(address1);
    $("#txtAddress2").val(address2);
    $("#txtAddress3").val(address3);
    $("#txtAddress4").val(address4);
    $("#txtAddress5").val(address5);
    $("#txtPoints").val(points);
    $("#txtCusName").focus();
    // checkValidity(customerValidations);
    // $("#btnSaveCustomer").attr('disabled', true);
    // $("#btnUpdateCustomer").attr('disabled', true);
    // $("#btnDeleteCustomer").attr('disabled', true);
}

/**
 * load all customers Method
 * */
function loadCustomers() {
    $.ajax({
        type: "GET",
        url: baseUrl + "customer",
        success: function (data) {
            displayCustomers(data);
            blindClickEvents();
            generateCustomerID();
            setTextFieldValues("", "", "", "", "", "", "", "", "","", "", "", "", "");
            console.log(data.message);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}

// Function to display customers in the table
function displayCustomers(customers) {
    $("#customerTable").empty();
    customers.forEach(function (customer) {
        let address1 = customer.address ? customer.address.address1 : '';
        let address2 = customer.address ? customer.address.address2 : '';
        let address3 = customer.address ? customer.address.address3 : '';
        let address4 = customer.address ? customer.address.address4 : '';
        let address5 = customer.address ? customer.address.address5 : '';

        $("#customerTable").append(
            `<tr>
                <td>${customer.customerCode}</td>
                <td>${customer.customerName}</td>
                <td>${customer.gender}</td>
                <td>${customer.contact}</td>
                <td>${customer.email}</td>
                <td>${new Date(customer.dob).toLocaleDateString()}</td>
                <td>${customer.level}</td>
                <td>${new Date(customer.date).toLocaleDateString()}</td>
                <td>${address1}</td>
                <td>${address2}</td>
                <td>${address3}</td>
                <td>${address4}</td>
                <td>${address5}</td>
                <td>${customer.points}</td>
            </tr>`
        );
    });
}

/**
 * Table Listener Click and Load textFields
 * */
function blindClickEvents() {
    $("#customerTable>tr").on("click", function () {
        let customerCode = $(this).children().eq(0).text();
        let customerName = $(this).children().eq(1).text();
        let gender = $(this).children().eq(2).text();
        let contact = $(this).children().eq(3).text();
        let email = $(this).children().eq(4).text();
        let dob = new Date($(this).children().eq(5).text()).toISOString().split('T')[0];
        let level = $(this).children().eq(6).text();
        let date = new Date($(this).children().eq(7).text()).toISOString().split('T')[0];
        let address1 = $(this).children().eq(8).text();
        let address2 = $(this).children().eq(9).text();
        let address3 = $(this).children().eq(10).text();
        let address4 = $(this).children().eq(11).text();
        let address5 = $(this).children().eq(12).text();
        let points = $(this).children().eq(13).text();

        console.log(customerCode, customerName, gender, contact, email, dob, level, date, address1, address2, address3, address4, address5, points);
        $("#txtCusId").val(customerCode);
        $("#txtCusName").val(customerName);
        $("#combGender").val(gender);
        $("#txtContact").val(contact);
        $("#txtEmail").val(email);
        $("#txtDob").val(dob);
        $("#combLevel").val(level);
        $("#txtDate").val(date);
        $("#txtAddress1").val(address1);
        $("#txtAddress2").val(address2);
        $("#txtAddress3").val(address3);
        $("#txtAddress4").val(address4);
        $("#txtAddress5").val(address5);
        $("#txtPoints").val(points);
    });
   // $("#btnSaveCustomer").attr('disabled', true);
}

/**
 * Customer Update
 * */
    // Update customer
$("#btnUpdateCustomer").click(function () {
    var formData = {
        customerCode: $("#txtCusId").val(),
        customerName: $("#txtCusName").val(),
        gender: $("#combGender").val(),
        contact: $("#txtContact").val(),
        email: $("#txtEmail").val(),
        dob: $("#txtDob").val(),
        level: $("#combLevel").val(),
        date: $("#txtDate").val(),
        address: {
            address1: $("#txtAddress1").val(),
            address2: $("#txtAddress2").val(),
            address3: $("#txtAddress3").val(),
            address4: $("#txtAddress4").val(),
            address5: $("#txtAddress5").val()
        },
        points: $("#txtPoints").val()
    };

    $.ajax({
        type: "PUT",
        url: baseUrl + "customer",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function () {
            updateAlert("Customer updated successfully!");
            loadCustomers();
        },
        error: function (error) {
            unSuccessUpdateAlert("Customer updated unsuccessfully!");
            console.log("Error updating customer: ", error);
        }
    });
});

/**
 * Customer Delete
 * */
 //Delete customer
$("#btnDeleteCustomer").click(function () {
    var customerId = $("#txtCusId").val();
    $.ajax({
        type: "DELETE",
        url: baseUrl + "customer?customerCode=" + customerId, // Corrected URL
        success: function () {
            updateAlert("Customer Delete Successfully");
            loadCustomers();
        },
        error: function (error) {
            unSuccessUpdateAlert("Customer Delete UnSuccessfully");
        }
    });
});

    // Search customer
    $("#searchCusId").on("input", function () {
        var customerId = $(this).val().trim();
        if (customerId !== "") {
            $.ajax({
                type: "GET",
                url: baseUrl + "customer/searchCustomer",
                data: { customerCode: customerId },
                success: function (customer) {
                    displayCustomers([customer]);
                    blindClickEvents();
                },
                error: function (error) {
                    console.log("Error searching customer: ", error);
                }
            });
        } else {
            loadCustomers();
        }
    });

/**
 * Auto Forces Input Fields Save
 * */
// $("#txtCusId").focus();
// const regExCusID = /^(C00-)[0-9]{3,4}$/;
// const regExCusName = /^[A-z ]{3,20}$/;
// const regExCusAddress = /^[A-z0-9/ ]{4,30}$/;
// const regExSalary = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
//
// let customerValidations = [];
// customerValidations.push({
//     reg: regExCusID, field: $('#txtCusId'), error: 'Customer ID Pattern is Wrong : C00-001'
// });
// customerValidations.push({
//     reg: regExCusName, field: $('#txtCusName'), error: 'Customer Name Pattern is Wrong : A-z 3-20'
// });
// customerValidations.push({
//     reg: regExCusAddress, field: $('#txtCusAddress'), error: 'Customer Address Pattern is Wrong : A-z 0-9 ,/'
// });
// customerValidations.push({
//     reg: regExSalary, field: $('#txtCustomerSalary'), error: 'Customer Salary Pattern is Wrong : 0-9{1,}.0-9{1,2}'
// });
//
// //disable tab key of all four text fields using grouping selector in CSS
// $("#txtCusId,#txtCusName,#txtCusAddress,#txtCustomerSalary").on('keydown', function (event) {
//     if (event.key === "Tab") {
//         event.preventDefault();
//     }
// });
//
// $("#txtCusId,#txtCusName,#txtCusAddress,#txtCustomerSalary").on('keyup', function (event) {
//     checkValidity(customerValidations);
// });
//
// $("#txtCusId,#txtCusName,#txtCusAddress,#txtCustomerSalary").on('blur', function (event) {
//     checkValidity(customerValidations);
// });
//
// $("#txtCusId").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExCusID, $("#txtCusId"))) {
//         $("#txtCusName").focus();
//     } else {
//         focusText($("#txtCusId"));
//     }
// });
//
// $("#txtCusName").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExCusName, $("#txtCusName"))) {
//         focusText($("#txtCusAddress"));
//     }
// });
//
// $("#txtCusAddress").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExCusAddress, $("#txtCusAddress"))) {
//         focusText($("#txtCustomerSalary"));
//     }
// });
//
// $("#txtCustomerSalary").on('keydown', function (event) {
//     if (event.key === "Enter" && check(regExSalary, $("#txtCustomerSalary"))) {
//         if (event.which === 13) {
//             $('#btnSaveCustomer').focus();
//         }
//     }
// });
//
// function setButtonState(value) {
//     if (value > 0) {
//         $("#btnSaveCustomer").attr('disabled', true);
//         $("#btnUpdateCustomer").attr('disabled', true);
//         $("#btnDeleteCustomer").attr('disabled', true);
//     } else {
//         $("#btnSaveCustomer").attr('disabled', false);
//         $("#btnUpdateCustomer").attr('disabled', false);
//         $("#btnDeleteCustomer").attr('disabled', false);
//     }
// }
