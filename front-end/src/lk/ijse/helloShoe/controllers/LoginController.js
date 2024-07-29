

// Ensure this script is linked correctly in your HTML

// Function to handle login

const accessToken = localStorage.getItem('token');
$(document).ready(function() {
    $('#btnLogin').on('click', function() {
        const role = $('#role_Type').val();
        const email = $('#user_Name').val();
        const password = $('#password').val();

        const userData = getAllUserDataFromField();
    if (!validateForm(userData)) return;

        if (!email || !password || role === "RoleType") {
            alert("Please fill in all fields");
            return;
        }

        const loginData = JSON.stringify({
            email: email,
            password: password,
            role: role
        });

        $.ajax({
            url: 'http://localhost:8080/app/api/v1/auth/signin',
            type: 'POST',
            contentType: 'application/json',
            data: loginData,
            success: function(response) {
                // Store the token in localStorage
                localStorage.setItem('token', response.token);
                // Store the role in localStorage
                console.log("kjhg")
                localStorage.setItem('role', role);
                    console.log(response.token)
                // Redirect based on the role
                console.log("kjhg")
                if (role === 'ADMIN') {
                    window.location.href = 'adminDashboard.html';
                    sendEmail();
                } else if (role === 'USER') {
                    window.location.href = 'adminPages/userDashboard.html';
                    sendEmail();
                }
            },
            error: function() {
                alert('Invalid credentials or role');
            }
        });
    });
});

function getAllUserDataFromField(){
    return {
        email: $('#user_Name').val(),
        password: $('#password').val(),
        role: $('#role_Type').find('option:selected').text(),
    }
}

function sendEmail() {
    $.ajax({
        url: "http://localhost:8080/app/api/v1/customer/sendWishes",
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function(response) {
            const customers = response;
            console.log(customers);
        },
        error: function(xhr, status, error) {
            console.error('Error:', status, error);
        }
    });
}

function validateForm(userData) {
    let isValid = true;

    if (!userData.email) {
        $('#user_Name').css('border', '1.5px solid red');
        isValid = false;
    } else if (!validateEmail(userData.email)) {
        $('#user_Name').css('border', '1.5px solid red');
        isValid = false;
    } else {
        $('#user_Name').css('border', '1.5px solid green');
    }

    if (!userData.password) {
        $('#password').css('border', '1.5px solid red');
        isValid = false;
    } else {
        $('#password').css('border', '1.5px solid green');
    }

    if (userData.role === 'Choose Role') {
        $('#role_Type').css('border', '1.5px solid red');
        isValid = false;
    } else {
        $('#role_Type').css('border', '1.5px solid green');
    }

    return isValid;
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

$('#user_Name').on('input', function() {
    const email = $(this).val();
    if (!email || !validateEmail(email)) {
        $(this).css('border', '1.5px solid red');
    } else {
        $(this).css('border', '1.5px solid green');
    }
});

$('#password').on('input', function() {
    const password = $(this).val();
    if (!password) {
        $(this).css('border', '1.5px solid red');
    } else {
        $(this).css('border', '1.5px solid green');
    }
});

$('#role_Type').on('change', function() {
    const role = $(this).find('option:selected').text();
    if (role === 'Choose Role') {
        $(this).css('border', '1.5px solid red');
    } else {
        $(this).css('border', '1.5px solid green');
    }
});
