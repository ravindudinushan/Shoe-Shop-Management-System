var bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJSb2xlX0FETUlOIn1dLCJzdWIiOiJ2aXNoYWxzYW5kYWtlbHVtQGdtYWlsLmNvbSIsImlhdCI6MTcxNjMwNzg0OSwiZXhwIjoxNzE2Mzk0MjQ5fQ.M0QLBtuYvNtoFX9bXYA2Gwk-owvBizHdQiHOqegQfI0';

function showAlert(iconType,titleMessage,textMessage){
    Swal.fire({
        icon: iconType,
        title: titleMessage,
        text: textMessage,
    });
}

function formatDate(dateString) {
    var date = new Date(dateString);
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
}