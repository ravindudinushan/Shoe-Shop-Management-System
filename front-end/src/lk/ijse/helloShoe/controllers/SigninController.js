let userLoginURI = 'http://localhost:8080/app/api/v1/auth'

$('#btnSignin').click(function(){
    const userData = getAllUserDataFromField();
    $.ajax({
        url:(userLoginURI+'/'+'signup'),
        method:'POST',
        data:JSON.stringify(userData),
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + bearerToken
        },

        success: function(resp){
            showAlert("success","Success","Registered Successfully.");
            clearAllUserField();
        },
        error:function(resp){
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
    $('.useremail').val('');
    $('.userpassword').val('');
    $('.userrole').prop('selectedIndex', 0).focus();
}
