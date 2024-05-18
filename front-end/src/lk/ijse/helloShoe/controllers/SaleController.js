$("#btnPurchase").attr('disabled', true);
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
        success: function (data) {
            setDates()
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
        $('#buyPrice').val(selectedItem.unitPriceSale);
    } else {
        $('#txtItemDesc').val('');
        $('#itemSize').val('');
        $('#qtyOnHand').val('');
        $('#buyPrice').val('');
    }
}

var items = [];

function loadItem() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/app/api/v1/inventory",
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
let discount = 0;
let subTotal = 0;

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
        calcTotal($("#buyQty").val() * $("#itemPrice").val());
        $('#cmbItemCode,#itemName,#itemPrice,#qtyOnHand,#buyQty').val("");
        $("#btnAddToCart").attr('disabled', true);
    } else if (duplicate === true) {

        manageQtyOnHand(tableRow.children(':nth-child(4)').text(), $("#buyQty").val());
        $(tableRow).children(':nth-child(4)').text($("#buyQty").val());

        manageTotal(tableRow.children(':nth-child(5)').text(), $("#buyQty").val() * $("#itemPrice").val());
        $(tableRow).children(':nth-child(5)').text($("#buyQty").val() * $("#itemPrice").val());

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
        let unitPrice = $(this).children(":eq(3)").text();
        let qty = $(this).children(":eq(4)").text();
        let total = $(this).children(":eq(5)").text();

        $("#cmbItemCode").val(itemCode);
        $("#txtItemDesc").val(itemName);
        $("#itemSize").val(size);
        $("#buyPrice").val(unitPrice);
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
    itemPrice = $("#buyPrice").val();
    itemQty = $("#qtyOnHand").val();
    itemOrderQty = $("#buyQty").val();

    let total = itemPrice * itemOrderQty;
    let row = `<tr><td>${itemCode}</td><td>${itemName}</td><td>${itemSize}</td><td>${itemPrice}</td><td>${itemOrderQty}</td><td>${total}</td></tr>`;

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

// /**
//  * Logics
//  * Place order
//  * Enter Discount and sub Total display
//  * */
//
// $(document).on("change keyup blur", "#txtDiscount", function () {
//     discount = $("#txtDiscount").val();
//     discount = (total / 100) * discount;
//     subTotal = total - discount;
//
//     $("#txtSubTotal").val(subTotal);
// });
//
// /**
//  * Logics
//  * Place order
//  * Enter Cash and Balance display
//  * */

// $(document).on("change keyup blur", "#txtCash", function () {
//     let cash = $("#txtCash").val();
//     let balance = cash - subTotal;
//     $("#txtBalance").val(balance);
//     if (balance < 0) {
//         $("#lblCheckSubtotal").parent().children('strong').text(balance + " : plz enter valid Balance");
//         $("#btnPurchase").attr('disabled', true);
//     } else {
//         $("#lblCheckSubtotal").parent().children('strong').text("");
//         $("#btnPurchase").attr('disabled', false);
//     }
// });

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

    var orderDetails = [];
    for (let i = 0; i < $("#tblAddToCart tr").length; i++) {
        var detailOb = {
            oid: $("#orderId").val(),
            itemCode: $("#tblAddToCart tr").children(':nth-child(1)')[i].innerText,
            qty: $("#tblAddToCart tr").children(':nth-child(4)')[i].innerText,
            unitPrice: $("#tblAddToCart tr").children(':nth-child(5)')[i].innerText
        }
        orderDetails.push(detailOb);
    }
    var orderId = $("#orderId").val();
    var customerId = $("#cmbCustomerId option:selected").text();
    var date = $("#orderDate").val();

    var orderOb = {
        "oid": orderId,
        "date": date,
        "cusID": customerId,
        "orderDetails": orderDetails
    }
    console.log(orderOb)
    console.log(orderDetails)

    $.ajax({
        url: "http://localhost:8080/app/api/v1/sale",
        method: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(orderOb),
        success: function (res) {
            updateAlert("Order", res.message);
            generateOrderID();

        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Order", message);
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
    $('#cmbCustomerId,#txtCustomerName,#cashierName,#cmbItemCode,#itemName,#txtItemDesc,#itemSize,#qtyOnHand,#buyPrice,#buyQty,#txtPoint,#txtTotal,#cmbMethod').val("");
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