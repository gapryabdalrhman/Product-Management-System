let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discounts = document.getElementById("discounts");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

// Function to get total
function get_total() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discounts.value;
        total.innerHTML = result;
        total.style.background = "#070";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}

// Function to create product
let data_list = localStorage.product ? JSON.parse(localStorage.product) : [];

let temp_index = -1;

submit.onclick = function() {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discounts: discounts.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    };

    if (temp_index === -1) {
        // Create new product
        for (let x = 0; x < newpro.count; x++) {
            data_list.push(newpro);
        }
    } else {
        // Update existing product
        data_list[temp_index] = newpro;
        temp_index = -1;
        submit.innerHTML = "create";
        count.style.display = "block";
    }

    // Save to local storage
    localStorage.setItem('product', JSON.stringify(data_list));
    clear_data();
    read_data();
};

// Function to clear inputs
function clear_data() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discounts.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// Function to show data
function read_data() {
    let table = "";
    for (let i = 0; i < data_list.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${data_list[i].title}</td>
                <td>${data_list[i].price}</td>
                <td>${data_list[i].taxes}</td>
                <td>${data_list[i].ads}</td>
                <td>${data_list[i].discounts}</td>
                <td>${data_list[i].total}</td>
                <td>${data_list[i].category}</td>
                <td><button onclick="update_product(${i})" id="update">update</button></td>
                <td><button onclick="delete_product(${i})" id="delete">delete</button></td>
            </tr>
        `;
    }
    document.querySelector('table').innerHTML = `
        <tr>
            <th>id</th>
            <th>title</th>
            <th>price</th>
            <th>taxes</th>
            <th>ads</th>
            <th>discounts</th>
            <th>total</th>
            <th>category</th>
            <th>update</th>
            <th>delete</th>
        </tr>
    ` + table;
}

read_data(); // To make the data always appear 

// Function to delete an item
function delete_product(i) {
    data_list.splice(i, 1);
    localStorage.product = JSON.stringify(data_list);
    read_data();
}

// Function to update an item
function update_product(i) {
    title.value = data_list[i].title;
    price.value = data_list[i].price;
    taxes.value = data_list[i].taxes;
    ads.value = data_list[i].ads;
    discounts.value = data_list[i].discounts;
    count.style.display = "none";
    category.value = data_list[i].category;
    get_total();
    submit.innerHTML = "update";
    temp_index = i;
}

// Function to get search mode
let searchmood = 'title';

function getsearchmood(id) {
    let search = document.getElementById('search');
    if (id === 'searchtitle') {
        searchmood = 'title';
        search.placeholder = 'search by title';
    } else {
        searchmood = 'category';
        search.placeholder = 'search by category';
    }
    search.focus();
}

// Function to search data
function searchdata(value) {
    let table = "";
    if (searchmood === 'title') {
        for (let i = 0; i < data_list.length; i++) {
            if (data_list[i].title.includes(value)) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${data_list[i].title}</td>
                        <td>${data_list[i].price}</td>
                        <td>${data_list[i].taxes}</td>
                        <td>${data_list[i].ads}</td>
                        <td>${data_list[i].discounts}</td>
                        <td>${data_list[i].total}</td>
                        <td>${data_list[i].category}</td>
                        <td><button onclick="update_product(${i})" id="update">update</button></td>
                        <td><button onclick="delete_product(${i})" id="delete">delete</button></td>
                    </tr>
                `;
            }
        }
    } else {
        for (let i = 0; i < data_list.length; i++) {
            if (data_list[i].category.includes(value)) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${data_list[i].title}</td>
                        <td>${data_list[i].price}</td>
                        <td>${data_list[i].taxes}</td>
                        <td>${data_list[i].ads}</td>
                        <td>${data_list[i].discounts}</td>
                        <td>${data_list[i].total}</td>
                        <td>${data_list[i].category}</td>
                        <td><button onclick="update_product(${i})" id="update">update</button></td>
                        <td><button onclick="delete_product(${i})" id="delete">delete</button></td>
                    </tr>
                `;
            }
        }
    }
    document.querySelector('table').innerHTML = `
        <tr>
            <th>id</th>
            <th>title</th>
            <th>price</th>
            <th>taxes</th>
            <th>ads</th>
            <th>discounts</th>
            <th>total</th>
            <th>category</th>
            <th>update</th>
            <th>delete</th>
        </tr>
    ` + table;
}
