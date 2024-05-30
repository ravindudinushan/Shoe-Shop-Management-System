function getAllUserDataFromField(){
    return{
        email: $('#userName').val(),
        password: $('#password').val(),
        role: $('#roleType').find('option:selected').text(),
    }
}

$(document).ready(function() {
    $('#btnSignin').click(function(event) {
        const userData = getAllUserDataFromField();
        if (!validateForm(userData)) return;
        event.preventDefault();
        let roleType = $('#roleType').val();
        let userName = $('#userName').val();
        let password = $('#password').val();

        // Validate input fields
        if (roleType === 'RoleType' || !userName || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill all the fields!',
            });
            return;
        }

        // Prepare the sign-up request data
        let signUpRequest = {
            email: userName,
            password: password,
            role: roleType
        };

        $.ajax({
            url: 'http://localhost:8080/app/api/v1/auth/signup',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(signUpRequest),
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Sign up successful!',
                }).then(function() {
                    window.location.href = '../pages/login.html';
                });
            },
            error: function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to sign up. Please try again.',
                });
                console.log('Error:', error);
            }
        });
    });
});


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