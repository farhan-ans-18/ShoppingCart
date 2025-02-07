// function addToCart() {
//     let checkedItems = [];
//     document.querySelectorAll(".product input").forEach((checkbox) => {
//         if (checkbox.checked) {
//             checkedItems.push({
//                 name: checkbox.nextElementSibling.textContent.trim(),
//             });
//         }
//     });
//     localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
//     document.querySelectorAll(".product input").forEach((checkbox) => {
//         checkbox.checked = false;
//     });
//     alert("Items saved to cart!");
// }


function addToCart() {
    // this code ensures that previous pages stored data should not lost
    let checkedItems = JSON.parse(localStorage.getItem("checkedItems")) || [];

    //this line of code for checking the checked checkBox and added to checkedItems array variable;
    document.querySelectorAll(".product input").forEach((checkbox) => {
        if (checkbox.checked) {
            checkedItems.push({
                name: checkbox.nextElementSibling.textContent.trim(),
            });
        }
    });

    if (checkedItems.length === JSON.parse(localStorage.getItem("checkedItems"))?.length) {
        alert("No items selected! Please select at least one item.");
        return;
    }

    // As we getting data in object format so, we have to convert it into string format than save into local storage
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));

    // this line of code ensures that after saving the items the checked box will automatically become false;
    document.querySelectorAll(".product input").forEach((checkbox) => {
        checkbox.checked = false;
    });


    alert("Items added to cart!");
    // After successfully adding this will display a msg to user
}


/* ..............Cart Item Script................................................. */


function loadCart() {
    let storedItems = JSON.parse(localStorage.getItem("checkedItems")) || [];

    let cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    if (storedItems.length === 0) {
        cartContainer.innerHTML = "<p class='empty-message'>🛒 Your cart is empty.</p>";
    } else {
        storedItems.forEach((item, index) => {
            let cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");
            cartItemDiv.innerHTML = `
${item.name}</span>
                <button class="btn" onclick="removeItem(${index})">Remove</button>
            `;
            cartContainer.appendChild(cartItemDiv);
        });
    }
}

function removeItem(index) {
    let localItems = JSON.parse(localStorage.getItem("checkedItems")) || [];
    localItems.splice(index, 1); // Remove the selected item
    localStorage.setItem("checkedItems", JSON.stringify(localItems)); // This will Update storage
    loadCart(); // This will Reload the cart display
}

function clearCart() {
    localStorage.removeItem("checkedItems"); // This is for Clear all items
    loadCart(); // This will Reload the cart
}

// Load cart on page load
window.onload = loadCart;