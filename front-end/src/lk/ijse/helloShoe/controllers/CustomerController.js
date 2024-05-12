let baseUrl = "http://localhost:8080/app/api/v1/";
loadCustomers();
/**
 * Customer Save
 * */

// $("#btnSaveCustomer").attr('disabled', true);
// $("#btnUpdateCustomer").attr('disabled', true);
// $("#btnDeleteCustomer").attr('disabled', true);

/**
 * Customer Save
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

$("#btnSaveCustomer").click(function () {
    let formData = $("#customerForm").serialize();
    console.log(formData);
    $.ajax({
        url: baseUrl + "customer", method: "post", data: formData, dataType: "json", success: function (res) {
            saveUpdateAlert("Customer", res.message);
            loadAllCustomer();
        }, error: function (error) {
            unSuccessUpdateAlert("Customer", JSON.parse(error.responseText).message);
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
// function loadAllCustomer() {
//     $("#customerTable").empty();
//     $.ajax({
//         url: baseUrl + "customer",
//         method: "GET", success: function (res) {
//             console.log(res);
//
//             for (let i of res) {
//                 let customerCode = i.customerCode;
//                 let customerName = i.customerName;
//                 let gender = i.gender;
//                 let contact = i.contact;
//                 let email = i.email;
//                 let dob = i.dob;
//                 let level = i.level;
//                 let date = i.date;
//                 let address1 = i.address1;
//                 let address2 = i.address2;
//                 let address3 = i.address3;
//                 let address4 = i.address4;
//                 let address5 = i.address5;
//                 let points = i.points;
//
//                 let row = "<tr><td>" + customerCode + "</td><td>" + customerName + "</td><td>" + gender + "</td><td>" + contact + "</td><td>" + email + "</td><td>" + dob + "</td><td>" + level + "</td><td>" + date + "</td><td>" + address1 + "</td><td>" + address2 + "</td><td>" + address3 + "</td><td>" + address4 + "</td><td>" + address5 + "</td><td>" + points + "</td></tr>";
//                 $("#customerTable").append(row);
//             }
//             blindClickEvents();
//             generateCustomerID();
//             setTextFieldValues("", "", "", "", "", "", "", "", "","", "", "", "", "");
//             console.log(res.message);
//         }, error: function (error) {
//             let message = JSON.parse(error.responseText).message;
//             console.log(message);
//         }
//
//     });
// }

function loadCustomers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/app/api/v1/customer",
        success: function (data) {
            displayCustomers(data);
            blindClickEvents();
            generateCustomerID();
            setTextFieldValues("", "", "", "", "", "", "", "", "","", "", "", "", "");
            console.log(data.message);
        },
        error: function (error) {
            console.log("Error loading customers: ", error);
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
        let dob = $(this).children().eq(5).text();
        let level = $(this).children().eq(6).text();
        let date = $(this).children().eq(7).text();
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
    $("#btnSaveCustomer").attr('disabled', true);
}


/**
 * Search id and Load Table
 * */
$("#searchCusId").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#searchCusId").val();
        $("#customerTable").empty();
        $.ajax({
            url: baseUrl + "customer/searchCustomer/?customerCode="+ search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                let row = "<tr><td>" + res.customerCode + "</td><td>" + res.customerName + "</td><td>" + res.gender + "</td><td>" + res.contact + "</td><td>" + res.email + "</td><td>" + res.dob + "</td><td>" + res.level + "</td><td>" + res.date + "</td><td>" + res.address1 + "</td><td>" + res.address2 + "</td><td>" + res.address3 + "</td><td>" + res.address4 + "</td><td>" + res.address5 + "</td><td>" + res.points + "</td></tr>";
                $("#customerTable").append(row);
                blindClickEvents();
            },
            error: function (error) {
                loadAllCustomer();
                let message = JSON.parse(error.responseText).message;
                emptyMassage(message);
            }
        })
    }

});

/**
 * Customer Update
 * */

/**
 * Update Action
 * */
$("#btnUpdateCustomer").click(function () {

    let cusCode = $("#txtCusId").val();
    let cusName = $("#txtCusName").val();
    let cusGender = $("#combGender").val();
    let cusContact = $("#txtContact").val();
    let cusEmail = $("#txtEmail").val();
    let cusDob = $("#txtDob").val();
    let cusLevel = $("#combLevel").val();
    let cusDate = $("#txtDate").val();
    let cusAddress1 = $("#txtAddress1").val();
    let cusAddress2 = $("#txtAddress2").val();
    let cusAddress3 = $("#txtAddress3").val();
    let cusAddress4 = $("#txtAddress4").val();
    let cusAddress5 = $("#txtAddress5").val();
    let cusPoints = $("#txtPoints").val();

    const customerOb = {
        customerCode: cusCode, customerName: cusName, gender: cusGender, contact: cusContact, email: cusEmail, dob: cusDob, level: cusLevel, date: cusDate, address1: cusAddress1, address2: cusAddress2, address3: cusAddress3, address4: cusAddress4, address5: cusAddress5, points: cusPoints
    };

    $.ajax({
        url: baseUrl + "customer",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(customerOb),
        success: function (res) {
            saveUpdateAlert("Customer", res.message);
            loadAllCustomer();
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Customer", message);
        }
    });
});

/**
 * Customer Delete
 * */

/**
 * Delete Action
 * */
$("#btnDeleteCustomer").click(function () {

    let cusCode = $("#txtCusId").val();
    let cusName = $("#txtCusName").val();
    let cusGender = $("#combGender").val();
    let cusContact = $("#txtContact").val();
    let cusEmail = $("#txtEmail").val();
    let cusDob = $("#txtDob").val();
    let cusLevel = $("#combLevel").val();
    let cusDate = $("#txtDate").val();
    let cusAddress1 = $("#txtAddress1").val();
    let cusAddress2 = $("#txtAddress2").val();
    let cusAddress3 = $("#txtAddress3").val();
    let cusAddress4 = $("#txtAddress4").val();
    let cusAddress5 = $("#txtAddress5").val();
    let cusPoints = $("#txtPoints").val();

    const customerOb = {
        customerCode: cusCode, customerName: cusName, gender: cusGender, contact: cusContact, email: cusEmail, dob: cusDob, level: cusLevel, date: cusDate, address1: cusAddress1, address2: cusAddress2, address3: cusAddress3, address4: cusAddress4, address5: cusAddress5, points: cusPoints
    };

    $.ajax({
        url: baseUrl + "customer?customerCode=\" + customerCode + ",
        method: "delete",
        contentType: "application/json",
        data: JSON.stringify(customerOb),
        success: function (res) {
            saveUpdateAlert("Customer", res.message);
            loadAllCustomer();
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Customer", message);
        }
    });
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

// $(document).ready(function () {
//     // Function to load all customers on page load
//     function loadCustomers() {
//         $.ajax({
//             type: "GET",
//             url: "http://localhost:8080/app/api/v1/customer",
//             success: function (data) {
//                 displayCustomers(data);
//             },
//             error: function (error) {
//                 console.log("Error loading customers: ", error);
//             }
//         });
//     }
//
//     // Function to display customers in the table
//     function displayCustomers(customers) {
//         $("#customerTable").empty();
//         customers.forEach(function (customer) {
//             let address1 = customer.address ? customer.address.address1 : '';
//             let address2 = customer.address ? customer.address.address2 : '';
//             let address3 = customer.address ? customer.address.address3 : '';
//             let address4 = customer.address ? customer.address.address4 : '';
//             let address5 = customer.address ? customer.address.address5 : '';
//
//             $("#customerTable").append(
//                 `<tr>
//                 <td>${customer.customerCode}</td>
//                 <td>${customer.customerName}</td>
//                 <td>${customer.gender}</td>
//                 <td>${customer.contact}</td>
//                 <td>${customer.email}</td>
//                 <td>${new Date(customer.dob).toLocaleDateString()}</td>
//                 <td>${customer.level}</td>
//                 <td>${new Date(customer.date).toLocaleDateString()}</td>
//                 <td>${address1}</td>
//                 <td>${address2}</td>
//                 <td>${address3}</td>
//                 <td>${address4}</td>
//                 <td>${address5}</td>
//                 <td>${customer.points}</td>
//             </tr>`
//             );
//         });
//     }
//
//     // Load customers on page load
//     loadCustomers();
//
//     // Save customer
//     $("#btnSaveCustomer").click(function () {
//         var formData = $("#customerForm").serialize();
//         $.ajax({
//             type: "POST",
//             url: "http://localhost:8080/app/api/v1/customer",
//             data: formData,
//             success: function () {
//                 alert("Customer saved successfully!");
//                 loadCustomers();
//             },
//             error: function (error) {
//                 console.log("Error saving customer: ", error);
//             }
//         });
//     });
//
//     // Update customer
//     $("#btnUpdateCustomer").click(function () {
//         var formData = $("#customerForm").serialize();
//         $.ajax({
//             type: "PUT",
//             url: "http://localhost:8080/app/api/v1/customer",
//             data: formData,
//             success: function () {
//                 alert("Customer updated successfully!");
//                 loadCustomers();
//             },
//             error: function (error) {
//                 console.log("Error updating customer: ", error);
//             }
//         });
//     });
//
//     // Delete customer
//     $("#btnDeleteCustomer").click(function () {
//         var customerId = $("#txtCusId").val();
//         $.ajax({
//             type: "DELETE",
//             url: "http://localhost:8080/app/api/v1/customer",
//             data: { customerCode: customerId },
//             success: function () {
//                 alert("Customer deleted successfully!");
//                 loadCustomers();
//             },
//             error: function (error) {
//                 console.log("Error deleting customer: ", error);
//             }
//         });
//     });
//
//     // Search customer
//     $("#searchCusId").on("input", function () {
//         var customerId = $(this).val().trim();
//         if (customerId !== "") {
//             $.ajax({
//                 type: "GET",
//                 url: "http://localhost:8080/app/api/v1/customer/searchCustomer",
//                 data: { customerCode: customerId },
//                 success: function (customer) {
//                     displayCustomers([customer]);
//                 },
//                 error: function (error) {
//                     console.log("Error searching customer: ", error);
//                 }
//             });
//         } else {
//             loadCustomers();
//         }
//     });
// });
