// document.getElementById('btnLogin').addEventListener('click', function () {
//     const roleType = document.getElementById('role_Type').value;
//     const userName = document.getElementById('user_Name').value;
//     const password = document.getElementById('password').value;
//
//     const userData = getAllUserDataFromField();
//     if (!validateForm(userData)) return;
//
//     if (roleType === 'RoleType' || !userName || !password) {
//         alert('Please fill in all fields');
//         return;
//     }
//
//     const signInRequest = {
//         roleType: roleType,
//         userName: userName,
//         password: password
//     };
//
//     console.log('Sending request:', signInRequest); // Log request data
//
//     fetch('http://localhost:8080/app/api/v1/auth/signin', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify(signInRequest)
//     })
//         .then(response => {
//             console.log('Response status:', response.status); // Log response status
//             if (!response.ok) {
//                 if (response.status === 403) {
//                     throw new Error('Forbidden: You do not have permission to access this resource.');
//                 } else if (response.status === 401) {
//                     throw new Error('Unauthorized: Invalid credentials.');
//                 } else {
//                     throw new Error('An error occurred. Please try again later.');
//                 }
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Response data:', data); // Log response data
//             if (data.jwt) {
//                 localStorage.setItem('token', data.jwt);
//                 if (data.roleType === 'USER') {
//                     window.location.href = 'userDashboard.html';
//                 } else if (data.roleType === 'ADMIN') {
//                     window.location.href = 'adminDashboard.html';
//                 }
//             } else {
//                 alert('Invalid credentials');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error.message);
//             alert(error.message);
//         });
// });
//
// function getAllUserDataFromField(){
//     return {
//         email: $('#user_Name').val(),
//         password: $('#password').val(),
//         role: $('#role_Type').find('option:selected').text(),
//     }
// }
//
// function validateForm(userData) {
//     let isValid = true;
//
//     if (!userData.email) {
//         $('#user_Name').css('border', '1.5px solid red');
//         isValid = false;
//     } else if (!validateEmail(userData.email)) {
//         $('#user_Name').css('border', '1.5px solid red');
//         isValid = false;
//     } else {
//         $('#user_Name').css('border', '1.5px solid green');
//     }
//
//     if (!userData.password) {
//         $('#password').css('border', '1.5px solid red');
//         isValid = false;
//     } else {
//         $('#password').css('border', '1.5px solid green');
//     }
//
//     if (userData.role === 'Choose Role') {
//         $('#role_Type').css('border', '1.5px solid red');
//         isValid = false;
//     } else {
//         $('#role_Type').css('border', '1.5px solid green');
//     }
//
//     return isValid;
// }
//
// function validateEmail(email) {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailPattern.test(email);
// }
//
// $('#user_Name').on('input', function() {
//     const email = $(this).val();
//     if (!email || !validateEmail(email)) {
//         $(this).css('border', '1.5px solid red');
//     } else {
//         $(this).css('border', '1.5px solid green');
//     }
// });
//
// $('#password').on('input', function() {
//     const password = $(this).val();
//     if (!password) {
//         $(this).css('border', '1.5px solid red');
//     } else {
//         $(this).css('border', '1.5px solid green');
//     }
// });
//
// $('#role_Type').on('change', function() {
//     const role = $(this).find('option:selected').text();
//     if (role === 'Choose Role') {
//         $(this).css('border', '1.5px solid red');
//     } else {
//         $(this).css('border', '1.5px solid green');
//     }
// });

// Ensure this script is linked correctly in your HTML

// Function to handle login
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
                localStorage.setItem('role', role);

                // Redirect based on the role
                if (role === 'ADMIN') {
                    window.location.href = 'adminDashboard.html';
                } else if (role === 'USER') {
                    window.location.href = 'adminPages/userDashboard.html';
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
