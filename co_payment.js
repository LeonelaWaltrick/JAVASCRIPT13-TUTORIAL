"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Payment Form Script
   
   Author: Leonela Waltrick
   Date:   05/05/2026
   
   Filename: co_payment.js

*/
   
   window.addEventListener("load", function () {

   // Extract order data from URL
   var orderData = location.search.slice(1);
   orderData = orderData.replace(/\+/g, " ");
   orderData = decodeURIComponent(orderData);

   var fields = orderData.split("&");

   // Fill the order summary fields
   for (var i = 0; i < fields.length; i++) {
      var parts = fields[i].split("=");
      var fieldName = parts[0];
      var fieldValue = parts[1];

      var fieldElement = document.getElementById(fieldName);
      if (fieldElement) {
         fieldElement.value = fieldValue;
      }
   }

   // Attach validation to submit button
   document.getElementById("subButton").onclick = runSubmit;

   // Attach individual validators
   document.getElementById("cardName").oninput = validateName;
   document.getElementById("cardNumber").oninput = validateNumber;
   document.getElementById("expMonth").onchange = validateMonth;
   document.getElementById("expYear").onchange = validateYear;
   document.getElementById("cvc").oninput = validateCVC;
   var creditRadios = document.getElementsByName("credit");
   for (var j = 0; j < creditRadios.length; j++) {
      creditRadios[j].onclick = validateCredit;
   }
});


/* ------------------------------ */
/*  MASTER VALIDATION FUNCTION    */
/* ------------------------------ */

function runSubmit() {
   validateName();
   validateCredit();
   validateNumber();
   validateMonth();
   validateYear();
   validateCVC();
}


/* ------------------------------ */
/*  VALIDATION FUNCTIONS          */
/* ------------------------------ */

function validateName() {
   var name = document.getElementById("cardName");
   if (name.validity.valueMissing) {
      name.setCustomValidity("Please enter the name on the credit card.");
   } else {
      name.setCustomValidity("");
   }
}

function validateCredit() {
   var credit = document.getElementsByName("credit");
   var checked = false;

   for (var i = 0; i < credit.length; i++) {
      if (credit[i].checked) {
         checked = true;
         break;
      }
   }

   if (!checked) {
      credit[0].setCustomValidity("Please select a credit card type.");
   } else {
      credit[0].setCustomValidity("");
   }
}

function validateNumber() {
   var card = document.getElementById("cardNumber");

   if (card.validity.valueMissing) {
      card.setCustomValidity("Please enter your credit card number.");
   } else if (!luhn(card.value)) {
      card.setCustomValidity("The credit card number is invalid.");
   } else {
      card.setCustomValidity("");
   }
}

function validateMonth() {
   var month = document.getElementById("expMonth");
   if (month.value === "mm") {
      month.setCustomValidity("Please select the expiration month.");
   } else {
      month.setCustomValidity("");
   }
}

function validateYear() {
   var year = document.getElementById("expYear");
   if (year.value === "yy") {
      year.setCustomValidity("Please select the expiration year.");
   } else {
      year.setCustomValidity("");
   }
}

function validateCVC() {
   var cvc = document.getElementById("cvc");

   if (cvc.validity.valueMissing) {
      cvc.setCustomValidity("Please enter the CVC number.");
   } else if (cvc.validity.patternMismatch) {
      cvc.setCustomValidity("CVC must be 3 or 4 digits.");
   } else {
      cvc.setCustomValidity("");
   }
}


/* ------------------------------ */
/*  LUHN ALGORITHM                */
/* ------------------------------ */

function sumDigits(numStr) {
   var total = 0;
   for (var i = 0; i < numStr.length; i++) {
      total += parseInt(numStr.charAt(i));
   }
   return total;
}

function luhn(idNum) {
   var string1 = "";
   var string2 = "";

   // Step 1: Double every second digit from the right
   for (var i = idNum.length - 1; i >= 0; i -= 2) {
      string1 += idNum.charAt(i);
   }
   for (var j = idNum.length - 2; j >= 0; j -= 2) {
      string2 += (idNum.charAt(j) * 2);
   }

   // Step 2: Sum digits
   var total = sumDigits(string1) + sumDigits(string2);

   // Step 3: Valid if total ends in 0
   return (total % 10 === 0);
}