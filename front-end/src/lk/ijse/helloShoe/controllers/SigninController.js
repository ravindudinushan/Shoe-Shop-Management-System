let userSigninURI = 'http://localhost:8080/app/api/v1/user'

$('#btnSignin').click(function(){
    const userData = getAllUserDataFromField();
    if (!validateForm(userData)) return;

    $.ajax({
        url: (userSigninURI + '/' + 'signup'),
        method: 'POST',
        data: JSON.stringify(userData),
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + bearerToken
        },
        success: function(resp){
            showAlert("success", "Success", "Registered Successfully.");
            clearAllUserField();
        },
        error: function(resp){
            showAlert("error", "Error", "Registration Failed. Please try again.");
        }
    });
});

function getAllUserDataFromField(){
    return{
        email: $('#userName').val(),
        password: $('#password').val(),
        role: $('#roleType').find('option:selected').text(),
    }
}

function clearAllUserField(){
    $('#userName').val('');
    $('#password').val('');
    $('#roleType').prop('selectedIndex', 0).focus();
}

function validateForm(userData) {
    let isValid = true;

    if (!userData.email) {
        $('#userName').css('border', '1.5px solid red');
        isValid = false;
    } else if (!validateEmail(userData.email)) {
        $('#userName').css('border', '1.5px solid red');
        isValid = false;
    } else {
        $('#userName').css('border', '1.5px solid green');
    }

    if (!userData.password) {
        $('#password').css('border', '1.5px solid red');
        isValid = false;
    } else {
        $('#password').css('border', '1.5px solid green');
    }

    if (userData.role === 'Choose Role') {
        $('#roleType').css('border', '1.5px solid red');
        isValid = false;
    } else {
        $('#roleType').css('border', '1.5px solid green');
    }

    return isValid;
}

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

$('#userName').on('input', function() {
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

$('#roleType').on('change', function() {
    const role = $(this).find('option:selected').text();
    if (role === 'Choose Role') {
        $(this).css('border', '1.5px solid red');
    } else {
        $(this).css('border', '1.5px solid green');
    }
});