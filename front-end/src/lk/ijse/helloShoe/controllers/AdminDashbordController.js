/**
 * Most sale item quantity
 * */
$("#itemQty").val("00");
$.ajax({
    url: "http://localhost:8080/app/api/v1/sale/most-sold-item-quantity",
    method: "GET",
    contentType: "application/json",
    dataType: "json",
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
    success: function (resp) {
        let num = resp;
        $("#totalProfit").text(num);

    },
    error: function (ob, statusText, error) {

    }
});
