let baseUrl = "http://localhost:8080/app/api/v1/";
const accessToken = localStorage.getItem('token');
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
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (resp) {
            console.log(resp);
            let id = resp.value;
            console.log("id" + id);
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
            console.error("Error: ", statusText, error);
        }
    });
}

/**
 * Button Add New Customer
 * */
 // Save customer
$("#btnSaveCustomer").click(function () {
    // Validate fields before saving
    checkValidity(customerValidations);
    if (allFieldsValid(customerValidations)) {
        // Proceed with saving
        var formData = $("#customerForm").serialize();
        $.ajax({
            type: "POST",
            url: baseUrl + "customer",
            data: formData,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function () {
                updateAlert("Customer Saved Successfully");
                loadCustomers();
                $("#customerForm")[0].reset();
            },
            error: function (error) {
                unSuccessUpdateAlert("Customer Saved Unsuccessfully");
                console.log("Error saving customer: ", error);
            }
        });
    } else {
        // Display error message or prevent submission
        // You may display a general error message or handle errors for specific fields
    }
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
}

/**
 * load all customers Method
 * */
function loadCustomers() {
    const accessToken = localStorage.getItem('token');
    console.log(accessToken);
    $.ajax({
        type: "GET",
        url: baseUrl + "customer",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
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
}

/**
 * Customer Update
 * */
    // Update customer
// Update customer with validation
$("#btnUpdateCustomer").click(function () {
    // Validate fields before updating
    checkValidity(customerValidations);
    if (allFieldsValid(customerValidations)) {
        // Proceed with updating
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
        console.log(accessToken);
        $.ajax({
            type: "PUT",
            url: baseUrl + "customer",
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
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
    } else {
        // Display error message or prevent submission
        console.log("Validation failed");
    }
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
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
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
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
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

// Define validation rules for each field
const customerValidations = [
    { field: $("#txtCusName"), reg: /^[a-zA-Z\s]+$/, error: "Invalid name. Only alphabets and spaces allowed." },
    { field: $("#txtContact"), reg: /^\d{10}$/, error: "Invalid contact number. Must be 10 digits." },
    { field: $("#txtEmail"), reg: /^\S+@\S+\.\S+$/, error: "Invalid email address." },
    { field: $("#txtDob"), reg: /^\d{4}-\d{2}-\d{2}$/, error: "Invalid date of birth format. Use YYYY-MM-DD." },
    { field: $("#txtDate"), reg: /^\d{4}-\d{2}-\d{2}$/, error: "Invalid joining date format. Use YYYY-MM-DD." },
    { field: $("#txtAddress1"), reg: /^[a-zA-Z0-9\s,-]+$/, error: "Invalid address." },
    { field: $("#txtAddress2"), reg: /^[a-zA-Z0-9\s,-]+$/, error: "Invalid address." },
    { field: $("#txtAddress3"), reg: /^[a-zA-Z0-9\s,-]+$/, error: "Invalid address." },
    { field: $("#txtAddress4"), reg: /^[a-zA-Z0-9\s,-]+$/, error: "Invalid address." },
    { field: $("#txtAddress5"), reg: /^[a-zA-Z0-9\s,-]+$/, error: "Invalid address." },
    { field: $("#txtPoints"), reg: /^\d+$/, error: "Invalid points. Must be a number." }
];

function allFieldsValid(validations) {
    for (let validation of validations) {
        if (!check(validation.reg, validation.field)) {
            return false;
        }
    }
    return true;
}

// Bind validation to input events
$("#txtCusName, #txtContact, #txtEmail, #txtDob, #txtDate, #txtAddress1, #txtAddress2, #txtAddress3, #txtAddress4, #txtAddress5, #txtPoints").on('input', function () {
    checkValidity(customerValidations);
});
