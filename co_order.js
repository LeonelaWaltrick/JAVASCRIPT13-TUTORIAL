"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Order Form Script
   
   Author: Leonela Waltrick
   Date:   04/28/2026
   
   Filename: co_order.js
   
   Function List
   =============
   
   calcOrder()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/


window.addEventListener("load", function () {

   var orderForm = document.forms.orderForm;

   // Display current date
   orderForm.elements.orderDate.value = new Date().toDateString();

   // Move focus to model field
   orderForm.elements.model.focus();

   // Event handlers
   orderForm.elements.model.onchange = calcOrder;
   orderForm.elements.qty.onchange = calcOrder;

   var planOptions = document.querySelectorAll('input[name="protection"]');
   for (var i = 0; i < planOptions.length; i++) {
      planOptions[i].onclick = calcOrder;
   }

   // Initial calculation
   calcOrder();
});


function calcOrder() {

   var orderForm = document.forms.orderForm;

   // Model and quantity
   var mIndex = orderForm.elements.model.selectedIndex;
   var mCost = parseFloat(orderForm.elements.model.options[mIndex].value);

   var qIndex = orderForm.elements.qty.selectedIndex;
   var quantity = parseInt(orderForm.elements.qty.options[qIndex].value);

   // Initial cost
   var initialCost = mCost * quantity;
   orderForm.elements.initialCost.value = formatUSCurrency(initialCost);

   // Protection plan
   var pCost = parseFloat(
      document.querySelector('input[name="protection"]:checked').value
   ) * quantity;
   orderForm.elements.protectionCost.value = formatNumber(pCost, 2);

   // Subtotal
   var subtotal = initialCost + pCost;
   orderForm.elements.subtotal.value = formatNumber(subtotal, 2);

   // Sales tax (5%)
   var salesTax = 0.05 * subtotal;
   orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

   // Total cost
   var totalCost = subtotal + salesTax;
   orderForm.elements.totalCost.value = formatUSCurrency(totalCost);

   // Hidden fields
   orderForm.elements.modelName.value =
      orderForm.elements.model.options[mIndex].text;

   orderForm.elements.protectionName.value =
      document.querySelector('input[name="protection"]:checked')
         .nextSibling.nodeValue.trim();
}


// Formatting functions
function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
   });
}

function formatUSCurrency(val) {
   return val.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
   });
}