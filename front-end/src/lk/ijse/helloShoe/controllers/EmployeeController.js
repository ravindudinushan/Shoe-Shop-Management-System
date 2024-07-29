const accessToken = localStorage.getItem('token');
getAllEmployees();

function generateEmployeeID() {
    $("#employeeCode").val("E00-001");
    $.ajax({
        url: "http://localhost:8080/app/api/v1/employee/employeeIdGenerate",
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
                $("#employeeCode").val("E00-00" + tempId);
            } else if (tempId <= 99) {
                $("#employeeCode").val("E00-0" + tempId);
            } else {
                $("#employeeCode").val("E00-" + tempId);
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

/**
 * load all employees Method
 * */
// Function to retrieve all employees
function getAllEmployees() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/app/api/v1/employee",
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            displayEmployees(response);
            generateEmployeeID();
            blindClickEvents();
            setTextFieldValues("", "", "", "", "", "", "","", "", "", "", "", "", "", "", "", "", "", "");
            console.log(response.message);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}

// Function to display inventory items in table
function displayEmployees(employees) {
    $("#employeeTable").empty();
    employees.forEach(function (employee) {
        $("#employeeTable").append(`
                <tr>
                    <td>${employee.employeeCode}</td>
                    <td>${employee.employeeName}</td>
                    <td><img src="${employee.profilePic}" alt="" style="width: 60px"></td>
                    <td>${employee.gender}</td>
                    <td>${employee.status}</td>
                    <td>${employee.designation}</td>
                    <td>${employee.role}</td>
                    <td>${new Date(employee.dob).toLocaleDateString()}</td>
                    <td>${new Date(employee.dateOfJoin).toLocaleDateString()}</td>
                    <td>${employee.branch}</td>
                    <td>${employee.address1}</td>
                    <td>${employee.address2}</td>
                    <td>${employee.address3}</td>
                    <td>${employee.address4}</td>
                    <td>${employee.address5}</td>
                    <td>${employee.contact}</td>
                    <td>${employee.email}</td>
                    <td>${employee.emergencyContact}</td>
                    <td>${employee.emergencyPerson}</td>
                </tr>
            `);
    });
}

$("#btnSaveEmployee").click(function() {
    checkValidity(employeeValidations);
    if (allFieldsValid(employeeValidations)) {
        var image = $("#capturedImage");
        var imageUrl = image.attr('src');
        if (!imageUrl || imageUrl === '../../assets/img/login1.jpg') {
            alert("Error");
            return; // Ensure to return if there's an error
        }

        // Collect form data manually to include all fields
        let formData = {
            employeeCode: $("#employeeCode").val(),
            employeeName: $("#employeeName").val(),
            profilePic: imageUrl,
            gender: $("#gender").val(),
            status: $("#status").val(),
            designation: $("#designation").val(),
            role: $("#role").val(),
            dob: $("#dob").val(),
            dateOfJoin: $("#dateOfJoin").val(),
            branch: $("#branch").val(),
            address1: $("#address1").val(),
            address2: $("#address2").val(),
            address3: $("#address3").val(),
            address4: $("#address4").val(),
            address5: $("#address5").val(),
            contact: $("#contact").val(),
            email: $("#email").val(),
            emergencyContact: $("#emergencyContact").val(),
            emergencyPerson: $("#emergencyPerson").val()
        };

        $.ajax({
            url: "http://localhost:8080/app/api/v1/employee",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (response) {
                updateAlert("Employee Saved Successfully");
                getAllEmployees();
            },
            error: function (xhr, status, error) {
                unSuccessUpdateAlert("Employee Save Failed");
                getAllEmployees();
            }
        });
    }
});

// Update method
$("#btnUpdateEmployee").click(function() {
    checkValidity(employeeValidations);
    if (allFieldsValid(employeeValidations)) {
        var image = $("#capturedImage");
        var imageUrl = image.attr('src');
        if (!imageUrl || imageUrl === '../../assets/img/login1.jpg') {
            alert("Error");
            return;
        }

        // Collect form data manually to include all fields
        let formData = {
            employeeCode: $("#employeeCode").val(),
            employeeName: $("#employeeName").val(),
            profilePic: imageUrl,
            gender: $("#gender").val(),
            status: $("#status").val(),
            designation: $("#designation").val(),
            role: $("#role").val(),
            dob: $("#dob").val(),
            dateOfJoin: $("#dateOfJoin").val(),
            branch: $("#branch").val(),
            address1: $("#address1").val(),
            address2: $("#address2").val(),
            address3: $("#address3").val(),
            address4: $("#address4").val(),
            address5: $("#address5").val(),
            contact: $("#contact").val(),
            email: $("#email").val(),
            emergencyContact: $("#emergencyContact").val(),
            emergencyPerson: $("#emergencyPerson").val()
        };

        $.ajax({
            url: "http://localhost:8080/app/api/v1/employee", // Assuming itemCode is the identifier
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(formData),
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function (response) {
                updateAlert("Employee Updated Successfully");
                getAllEmployees();
            },
            error: function (xhr, status, error) {
                unSuccessUpdateAlert("Employee Update Failed");
                getAllEmployees();
            }
        });
    }
});

// Function to delete inventory item
$("#btnDeleteEmployee").click(function () {
    var employeeCode = $("#employeeCode").val();
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/app/api/v1/employee?employeeCode=${employeeCode}`,
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function () {
            updateAlert("Employee Delete Successfully");
            getAllEmployees();
        },
        error: function (error) {
            unSuccessUpdateAlert("Employee Delete UnSuccessfully");
            console.log("Error:", error);
        }
    });
});
// Function to search inventory item by item code
$("#btnSearch").click(function () {
    var employeeCode = $("#searchEmployee").val();
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/app/api/v1/inventory/searchEmployee?employeeCode=${employeeCode}`,
        contentType: "application/json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (response) {
            if (response) {
                displayEmployees([response]);
            } else {
                unSuccessUpdateAlert("Item not found!");
            }
        },
        error: function (error) {
            console.log("Error:", error);
        }
    });
});

getAllEmployees();

/**
 * clear input fields Values Method
 * */
function setTextFieldValues(employeeCode, employeeName, profilePic, gender, status, designation, role, dob, dateOfJoin, branch, address1, address2, address3, address4 , address5, contact, email, emergencyContact, emergencyPerson) {
    $("#employeeCode").val(employeeCode);
    $("#employeeName").val(employeeName);
    $("#profilePic").val(profilePic);
    $("#gender").val(gender);
    $("#status").val(status);
    $("#designation").val(designation);
    $("#role").val(role);
    $("#dob").val(dob);
    $("#dateOfJoin").val(dateOfJoin);
    $("#branch").val(branch);
    $("#address1").val(address1);
    $("#address2").val(address2);
    $("#address3").val(address3);
    $("#address4").val(address4);
    $("#address5").val(address5);
    $("#contact").val(contact);
    $("#email").val(email);
    $("#emergencyContact").val(emergencyContact);
    $("#emergencyPerson").val(emergencyPerson);
    $("#employeeName").focus();
}

/**
 * Table Listener Click and Load textFields
 * */
function blindClickEvents() {
    $("#employeeTable>tr").on("click", function () {
        let employeeCode = $(this).children().eq(0).text();
        let employeeName = $(this).children().eq(1).text();
        let profilePic = $(this).children().eq(2).text();
        let gender = $(this).children().eq(3).text();
        let status = $(this).children().eq(4).text();
        let designation = $(this).children().eq(5).text();
        let role = $(this).children().eq(6).text();
        let dob = new Date($(this).children().eq(7).text()).toISOString().split('T')[0];
        let dateOfJoin = new Date($(this).children().eq(8).text()).toISOString().split('T')[0];
        let branch = $(this).children().eq(9).text();
        let address1 = $(this).children().eq(10).text();
        let address2 = $(this).children().eq(11).text();
        let address3 = $(this).children().eq(12).text();
        let address4 = $(this).children().eq(13).text();
        let address5 = $(this).children().eq(14).text();
        let contact = $(this).children().eq(15).text();
        let email = $(this).children().eq(16).text();
        let emergencyContact = $(this).children().eq(17).text();
        let emergencyPerson = $(this).children().eq(18).text();

        console.log(employeeCode, employeeName, profilePic, gender, status, designation, role, dob, dateOfJoin, branch, address1, address2, address3, address4 , address5, contact, email, emergencyContact, emergencyPerson);
        $("#employeeCode").val(employeeCode);
        $("#employeeName").val(employeeName);
        $("#profilePic").val(profilePic);
        $("#gender").val(gender);
        $("#status").val(status);
        $("#designation").val(designation);
        $("#role").val(role);
        $("#dob").val(dob);
        $("#dateOfJoin").val(dateOfJoin);
        $("#branch").val(branch);
        $("#address1").val(address1);
        $("#address2").val(address2);
        $("#address3").val(address3);
        $("#address4").val(address4);
        $("#address5").val(address5);
        $("#contact").val(contact);
        $("#email").val(email);
        $("#emergencyContact").val(emergencyContact);
        $("#emergencyPerson").val(emergencyPerson);
    });
}

const employeeValidations = [
    { field: $("#employeeCode"), reg: /^E\d{2}-\d{3}$/, error: "Invalid employee code. Format should be I00-000." },
    { field: $("#employeeName"), reg: /^[a-zA-Z\s]+$/, error: "Invalid employee name. Only alphabets and spaces allowed." },
    { field: $("#status"), reg: /^[a-zA-Z\s]+$/, error: "Invalid status. Only alphabets and spaces allowed." },
    { field: $("#designation"), reg: /^[a-zA-Z\s]+$/, error: "Invalid designation. Only alphabets and spaces allowed." },
    { field: $("#branch"), reg: /^[a-zA-Z\s]+$/, error: "Invalid branch. Only alphabets and spaces allowed." },
    { field: $("#address1"), reg: /^[a-zA-Z0-9\s,-]+$/, error: "Invalid address." },
    { field: $("#address2"), reg: /^[a-zA-Z0-9\s,-]+$/, error: "Invalid address." },
    { field: $("#address3"), reg: /^[a-zA-Z0-9\s,-]+$/, error: "Invalid address." },
    { field: $("#address4"), reg: /^[a-zA-Z0-9\s,-]+$/, error: "Invalid address." },
    { field: $("#address5"), reg: /^[a-zA-Z0-9\s,-]+$/, error: "Invalid address." },
    { field: $("#contact"), reg: /^\d{10}$/, error: "Invalid contact number. Must be 10 digits." },
    { field: $("#email"), reg: /^\S+@\S+\.\S+$/, error: "Invalid email address." },
    { field: $("#emergencyContact"), reg: /^\d{10}$/, error: "Invalid contact number. Must be 10 digits." },
    { field: $("#emergencyPerson"), reg: /^[a-zA-Z\s]+$/, error: "Invalid person name. Only alphabets and spaces allowed." }
];

$("#employeeCode, #employeeName, #profilePic, #gender, #status, #designation, #role, #dob, #dateOfJoin, #branch, #address1, #address2, #address3, #address4 , #address5, #contact, #email, #emergencyContact, #emergencyPerson").on('input', function () {
    checkValidity(employeeValidations);
});

function allFieldsValid(validations) {
    return validations.every(validation => validation.reg.test(validation.field.val()));
}
$('#profilePic').change(function() {
    var fileInput = $('#profilePic')[0];
    var file = fileInput.files[0];

    if (file && (file.type.includes('image') || file.type === 'image/gif')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#itmVideo').hide();
            $('#capturedImage').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
        $("#itmClear").prop("disabled", false);
        $(this).val("");
    } else {
        $('#itemImgFileError').text('Please upload an image or GIF.');
        $('#itemImgFileError').css("border", "1px solid #ced4da");
    }

});