const accessToken = localStorage.getItem('token');
// $("#btnPurchase").attr('disabled', true);
$("#btnAddToCart").attr('disabled', true);

/**
 * Invoice Details
 * */
 //Order ID
function generateOrderID() {
    $("#orderId").val("ODI-001");
    $.ajax({
        url: "http://localhost:8080/app/api/v1/sale/OrderIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (resp) {
            let orderId = resp.value;
            let tempId = parseInt(orderId.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#orderId").val("ODI-00" + tempId);
            } else if (tempId <= 99) {
                $("#orderId").val("ODI-0" + tempId);
            } else {
                $("#orderId").val("ODI-" + tempId);
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

/**
 * Invoice Details
 * Customer Select Combo
 * */
// Function to load customers into the combo box
function loadCustomersIntoComboBox(customers) {
    var comboBox = $('#cmbCustomerId');
    comboBox.empty(); // Clear existing options
    $.each(customers, function(index, customer) {
        comboBox.append($('<option>', {
            value: customer.customerCode,
            text: customer.customerCode
        }));
    });
}

// Function to update customer name based on selected customer ID
function updateCustomerName() {
    var selectedCustomerCode = $('#cmbCustomerId').val();
    var selectedCustomer = customers.find(customer => customer.customerCode === selectedCustomerCode);
    if (selectedCustomer) {
        $('#txtCustomerName').val(selectedCustomer.customerName);
    } else {
        $('#txtCustomerName').val('');
    }
}

// Declare the customers variable globally
var customers = [];

// Load customers data and populate the combo box
function loadCustomers() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/app/api/v1/customer",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (data) {
            setDates()
            generateOrderID();
            customers = data; // Store customers data in the global variable
            loadCustomersIntoComboBox(customers);
            console.log("Customers loaded successfully:", data);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log("Error loading customers:", message);
        }
    });
}

// Event listener for combo box change event
$('#cmbCustomerId').on('change', function() {
    updateCustomerName();
});

// Initialize by loading customers
loadCustomers();

/**
 * Items Details
 * Item Select Combo
 * */
function loadItemIntoComboBox(item) {
    var comboBox = $('#cmbItemCode');
    comboBox.empty(); // Clear existing options
    $.each(items, function(index, item) {
        comboBox.append($('<option>', {
            value: item.itemCode,
            text: item.itemCode
        }));
    });
}

function updateItemName() {
    var selectedItemCode = $('#cmbItemCode').val();
    var selectedItem = items.find(item => item.itemCode === selectedItemCode);
    if (selectedItem) {
        $('#txtItemDesc').val(selectedItem.itemDesc);
        $('#itemSize').val(selectedItem.size);
        $('#qtyOnHand').val(selectedItem.quantity);
        $('#price').val(selectedItem.unitPriceBuy);
        $('#buyPrice').val(selectedItem.unitPriceSale);
    } else {
        $('#txtItemDesc').val('');
        $('#itemSize').val('');
        $('#qtyOnHand').val('');
        $('#price').val('');
        $('#buyPrice').val('');
    }
}

var items = [];

function loadItem() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/app/api/v1/inventory",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (data) {
            items = data; // Store customers data in the global variable
            loadItemIntoComboBox(items);
            console.log("Customers loaded successfully:", data);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log("Error loading customers:", message);
        }
    });
}

$('#cmbItemCode').on('change', function() {
    updateItemName();
});

loadItem();


/**
 * Items Details
 * */

let itemCode;
let itemName;
let itemPrice;
let itemQty;
let itemOrderQty;

/**
 * Order Details
 * */
let total = 0;

/**
 * Logics
 * Place order
 * */
let tableRow = [];
$("#btnAddToCart").on("click", function () {

    let duplicate = false;
    for (let i = 0; i < $("#tblAddToCart tr").length; i++) {
        if ($("#cmbItemCode option:selected").text() === $("#tblAddToCart tr").children(':nth-child(1)')[i].innerText) {
            duplicate = true;

        }
    }
    if (duplicate !== true) {

        loadCartTableDetail();
        reduceQty($("#buyQty").val());
        calcTotal($("#buyQty").val() * $("#buyPrice").val());
        $('#cmbItemCode,#txtItemDesc,#itemSize,#price,#buyPrice,#qtyOnHand,#buyQty').val("");
        $("#btnAddToCart").attr('disabled', true);
    } else if (duplicate === true) {

        manageQtyOnHand(tableRow.children(':nth-child(5)').text(), $("#buyQty").val());
        $(tableRow).children(':nth-child(5)').text($("#buyQty").val());

        manageTotal(tableRow.children(':nth-child(6)').text(), $("#buyQty").val() * $("#buyPrice").val());
        $(tableRow).children(':nth-child(6)').text($("#buyQty").val() * $("#buyPrice").val());

    }

    /**
     * Logics
     * Place order
     * Table Add logic
     * */
    $("#tblAddToCart>tr").click('click', function () {

        tableRow = $(this);
        let itemCode = $(this).children(":eq(0)").text();
        let itemName = $(this).children(":eq(1)").text();
        let size = $(this).children(":eq(2)").text();
        let unitPriceBuy = $(this).children(":eq(3)").text();
        let unitPriceSale = $(this).children(":eq(4)").text();
        let qty = $(this).children(":eq(5)").text();
        let total = $(this).children(":eq(6)").text();

        $("#cmbItemCode").val(itemCode);
        $("#txtItemDesc").val(itemName);
        $("#itemSize").val(size);
        $("#price").val(unitPriceBuy);
        $("#buyPrice").val(unitPriceSale);
        $("#buyQty").val(qty);
        $("#txtTotal").val(total);

    });
});

/**
 * Logics
 * Place order
 * Reduce QtyOnHand
 * */
function reduceQty(orderQty) {
    let minQty = parseInt(orderQty);
    let reduceQty = parseInt($("#qtyOnHand").val());
    reduceQty = reduceQty - minQty;
    $("#qtyOnHand").val(reduceQty);
}

/**
 * Logics
 * Place order
 * Calculate Total
 * */

function calcTotal(amount) {
    total += amount;
    $("#txtTotal").val(total);
}

/**
 * Logics
 * Place order
 * Manage Available Qty
 * */
function manageQtyOnHand(preQty, nowQty) {
    var preQty = parseInt(preQty);
    var nowQty = parseInt(nowQty);
    let avaQty = parseInt($("#qtyOnHand").val());

    avaQty = avaQty + preQty;
    avaQty = avaQty - nowQty;

    $("#qtyOnHand").val(avaQty);
}

/**
 * Logics
 * Place order
 * Manage Total
 * */

function manageTotal(preTotal, nowTotal) {
    total -= preTotal;
    total += nowTotal;

    $("#txtTotal").val(total);
}

/**
 * Logics
 * Place order
 * Table Load
 * */
$("#tblAddToCart").empty();
function loadCartTableDetail() {
    itemCode = $("#cmbItemCode").val();
    itemName = $("#txtItemDesc").val();
    itemSize = $("#itemSize").val();
    itemPriceBuy = $("#price").val();
    itemPriceSale = $("#buyPrice").val();
    itemQty = $("#qtyOnHand").val();
    itemOrderQty = $("#buyQty").val();

    let total = itemPriceSale * itemOrderQty;
    let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${itemSize}</td><td>${itemPriceBuy}</td><td>${itemPriceSale}</td><td>${itemOrderQty}</td><td>${total}</td></tr>`;

    $("#tblAddToCart").append(row);
}

/**
 * Logics
 * Place order
 * Enter BuyQty and Check Qty On Hand
 * */

$(document).on("change keyup blur", "#buyQty", function () {
    let qtyOnHand = $("#qtyOnHand").val();
    let buyQty = $("#buyQty").val();
    let buyOnHand = qtyOnHand - buyQty;
    if (buyOnHand < 0) {
        $("#lblCheckQty").parent().children('strong').text(qtyOnHand + " : Empty On Stock..!!");
        $("#btnAddToCart").attr('disabled', true);
    } else {
        $("#lblCheckQty").parent().children('strong').text("");
        $("#btnAddToCart").attr('disabled', false);
    }
});

/**
 * Date Default
 * */
function setDates() {

    const date = new Date();

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);

    const today = date.getFullYear() + "-" + (month) + "-" + (day);

    $('#orderDate').val(today);

}


/**
 * Logics
 * Place order
 * Purchase Order button
 * */

$("#btnPurchase").click(function () {
    var saleDetails = [];
    $("#tblAddToCart tr").each(function() {
        var detailOb = {
            orderNo: $("#orderId").val(),
            itemCode: $(this).children(':nth-child(1)').text(),
            quantity: $(this).children(':nth-child(6)').text(),
            unitPriceBuy: $(this).children(':nth-child(4)').text(),
            unitPriceSale: $(this).children(':nth-child(5)').text()
        };
        saleDetails.push(detailOb);
    });

    var orderNo = $("#orderId").val();
    var addPoints = $("#txtPoint").val();
    var cashierName = $("#cashierName").val();
    var paymentMethod = $("#cmbMethod").val();
    var purchaseDate = $("#orderDate").val();
    var totalPrice = $("#txtTotal").val();
    var customerCode = $("#cmbCustomerId option:selected").text();

    var orderOb = {
        "orderNo": orderNo,
        "addPoints": addPoints,
        "cashierName": cashierName,
        "paymentMethod": paymentMethod,
        "purchaseDate": purchaseDate,
        "totalPrice": totalPrice,
        "customerCode": customerCode,
        "saleDetails": saleDetails
    };

    console.log(orderOb);
    console.log(saleDetails);

    $.ajax({
        url: "http://localhost:8080/app/api/v1/sale",
        method: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(orderOb),
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (res) {
            updateAlert("Order Successfully Purchased.!");
            generateOrderID();
            loadItem();
            fetchOrders();
            fetchOrderDetails();
        },
        error: function (error) {
            updateAlert("Order Successfully Purchased.!");
            loadItem();
            generateOrderID();
            fetchOrders();
            fetchOrderDetails();
        }
    });

    clearDetails();
    $("#tblAddToCart").empty();
    $("#btnPurchase").attr('disabled', true);
    $("#btnAddToCart").attr('disabled', true);
    total = 0;
});


/**
 * Logics
 * Place order
 * Clear Method
 * */
function clearDetails() {
    $('#cmbCustomerId,#txtCustomerName,#cashierName,#cmbItemCode,#txtItemDesc,#itemSize,#qtyOnHand,#price,#buyPrice,#buyQty,#txtPoint,#txtTotal,#cmbMethod').val("");
    $("#tblAddToCart").empty();
    $("#btnPurchase").attr('disabled', true);
    $("#btnAddToCart").attr('disabled', true);
}

/**
 * Logics
 * Place order
 * Clear Button
 * */
$("#btnClearAll").click(function () {
    clearDetails();
});

/**
 * Logics
 * Place order
 * Remove Row
 * */

$("#tblAddToCart").dblclick(function () {
    Swal.fire({
        title: 'Do you want to Delete the Select row?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        }
    }).then((result) => {
        if (result.isConfirmed) {
            $(this).children('tr').eq(0).remove();
            Swal.fire('Delete!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Select row are not Delete', '', 'info')
        }
    })

});

$("#btnRefund").click(function () {
    var orderId = $("#orderId").val();
    $.ajax({
        type: "post",
        url: "http://localhost:8080/app/api/v1/sale/refund?orderNo=" + orderId, // Corrected URL
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function () {
            updateAlert("Order Refund Successfully");
            fetchOrders();
            fetchOrderDetails();
            loadItem();
            loadCustomers();
        },
        error: function (error) {
            unSuccessUpdateAlert("Order Refund UnSuccessfully");
        }
    });
});

async function fetchOrders() {
    const bearerToken = 'YOUR_BEARER_TOKEN_HERE'; // Replace with your actual bearer token

    try {
        const response = await fetch('http://localhost:8080/app/api/v1/sale/LoadOrders', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const orders = text ? JSON.parse(text) : [];
        const tblOrder = document.getElementById('tblOrder');
        tblOrder.innerHTML = ''; // Clear any existing rows

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.orderNo}</td>
                <td>${order.addPoints}</td>
                <td>${order.cashierName}</td>
                <td>${order.paymentMethod}</td>
                <td>${new Date(order.purchaseDate).toLocaleString()}</td>
                <td>${order.totalPrice}</td>
                <td>${order.customerCode}</td>
            `;
            tblOrder.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}

async function fetchOrderDetails() {
    const bearerToken = 'YOUR_BEARER_TOKEN_HERE'; // Replace with your actual bearer token

    try {
        const response = await fetch('http://localhost:8080/app/api/v1/sale/LoadOrderDetails', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        const orderDetails = text ? JSON.parse(text) : [];
        const tblOrderDetails = document.getElementById('tblOrderDetails');
        tblOrderDetails.innerHTML = ''; // Clear any existing rows

        orderDetails.forEach(detail => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${detail.itemCode}</td>
                <td>${detail.orderNo}</td>
                <td>${detail.quantity}</td>
                <td>${detail.unitPriceBuy}</td>
                <td>${detail.unitPriceSale}</td>
            `;
            tblOrderDetails.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching order details:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
    fetchOrderDetails();
});
