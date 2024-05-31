/**
 * Most sale item quantity
 * */
const accessToken = localStorage.getItem('token');

$("#itemQty").val("00");
$.ajax({
    url: "http://localhost:8080/app/api/v1/sale/most-sold-item-quantity",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    headers: {
        'Authorization': 'Bearer ' + accessToken
    },
    success: function (resp) {
        let num = resp;
        $("#itemQty").text(num);

    },
    error: function (ob, statusText, error) {

    }
});

/**
 * Most sale item code
 * */
$("#mostSaleItem").val("00");
$.ajax({
    url: "http://localhost:8080/app/api/v1/sale/most-sold-item",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    headers: {
        'Authorization': 'Bearer ' + accessToken
    },
    success: function (resp) {
        let num = resp;
        $("#mostSaleItem").text(num);

    },
    error: function (ob, statusText, error) {

    }
});

/**
 * Total Sale
 * */
$("#totalSale").val("00");
$.ajax({
    url: "http://localhost:8080/app/api/v1/sale/totalSale",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    headers: {
        'Authorization': 'Bearer ' + accessToken
    },
    success: function (resp) {
        let num = resp;
        $("#totalSale").text(num);

    },
    error: function (ob, statusText, error) {

    }
});

/**
 * Total Profit
 * */
$("#totalProfit").val("00");
$.ajax({
    url: "http://localhost:8080/app/api/v1/sale/totalProfit",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
    headers: {
        'Authorization': 'Bearer ' + accessToken
    },
    success: function (resp) {
        let num = resp;
        $("#totalProfit").text(num);

    },
    error: function (ob, statusText, error) {

    }
});

document.addEventListener("DOMContentLoaded", function() {
    fetchMostSoldItemImage();
});

function fetchMostSoldItemImage() {
    // const token = 'your-bearer-token-here'; // Replace with your actual Bearer token

    fetch('http://localhost:8080/app/api/v1/sale/most-sold-item-image', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => response.text())
        .then(base64Image => {
            console.log("Most Sold Item Image (Base64):", base64Image);
            displayImage(base64Image);
        })
        .catch(error => {
            console.error('Error fetching the most sold item image:', error);
        });
}

function displayImage(base64Image) {
    const imgDiv = document.getElementById('photoImg');
    if (base64Image && base64Image.startsWith("data:image")) {
        imgDiv.style.backgroundImage = `url(${base64Image})`;
    } else {
        imgDiv.style.backgroundImage = `url('data:image/jpeg;base64,${base64Image}')`;
    }
    imgDiv.style.backgroundSize = 'cover';
    imgDiv.style.backgroundPosition = 'center';
}