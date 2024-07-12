const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const btnCreate = document.getElementById("submit");
const deleteAllDiv = document.getElementById('deleteAll');

let mode = "create";
let index;

// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - (+discount.value);
        total.textContent = result
        total.style.background = '#33c626'
    } else {
        total.value = '';
        total.style.background = '#a00d02'
    }
}

// creat product
let dataProductsArray;
if (localStorage.product != null) {
    dataProductsArray = JSON.parse(localStorage.product)
} else {
    dataProductsArray = []
}

btnCreate.addEventListener('click', creatProduct);

function creatProduct() {
    let newProductObj = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    };

    // validate data
    if (title.value != ''
        && price.value != ''
        && category.value != ''
        && newProductObj.count <= 100) {
        //create more than product(count)
        if (mode === "create") {

            if (newProductObj.count > 1) {
                for (let i = 0; i < newProductObj.count; i++) {
                    dataProductsArray.push(newProductObj)
                }
            } else {
                dataProductsArray.push(newProductObj)  // create one product
            }

        } else {
            //updateProduct
            dataProductsArray[index] = newProductObj
            mode = "create";
            btnCreate.innerHTML = "Create";
            count.style.display = 'block';
        }

        // clear inputs
        clearInputs();
    } else {
        alert(`Not Valid Data:
                title:"",
                price:"",
                category:"",
                count<=100
            `);
    }
    // save in localStorage
    localStorage.setItem('product', JSON.stringify(dataProductsArray));
    // console.log(dataProductsArray);

    // read(show  product in table)
    showData();
}
// clear inputs
function clearInputs() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read(show  product in table)
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataProductsArray.length; i++) {
        table += `<tr>
                        <td>${i + 1}</td>
                        <td>${dataProductsArray[i].title}</td>
                        <td>${dataProductsArray[i].price}</td>
                        <td>${dataProductsArray[i].taxes}</td>
                        <td>${dataProductsArray[i].ads}</td>
                        <td>${dataProductsArray[i].discount}</td>
                        <td>${dataProductsArray[i].total}</td>
                        <td>${dataProductsArray[i].category}</td>
                        <td><button onclick="updateProduct(${i})" id="update">update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">delete</button></td>

                    </tr>`;
        // console.log(table);
    }

    document.getElementById('bodyTable').innerHTML = table;

    //generate deleteAllProducts Button.
    if (dataProductsArray.length > 0) {
        deleteAllDiv.innerHTML = `
        <button onclick="deleteAllProducts()" id="deleteAllBtn">delete All ( ${dataProductsArray.length} )</button>
        `
    } else {
        deleteAllDiv.innerHTML = '';
    }
    scroll({
        top: 40,
        behavior: "smooth",

    });
}

showData();

//delete product
// const deleteBtn = document.getElementById('delete');
function deleteProduct(i) {
    dataProductsArray.splice(i, 1);  //delete from array
    localStorage.product = JSON.stringify(dataProductsArray);    //delete from localstorage
    showData();
}

function deleteAllProducts() {
    dataProductsArray.splice(0);  //delete all product from array
    localStorage.clear()         //delete all peoduct from localstorage
    showData();
}

//update product
function updateProduct(i) {
    title.value = dataProductsArray[i].title;
    price.value = dataProductsArray[i].price;
    taxes.value = dataProductsArray[i].taxes;
    ads.value = dataProductsArray[i].ads;
    discount.value = dataProductsArray[i].discount;
    getTotal();
    count.style.display = "none"
    category.value = dataProductsArray[i].category;
    btnCreate.innerHTML = 'Update'
    mode = "update";
    index = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

//search for products by [category || title]
function search(searchOPtion) {
    const searchEle = document.getElementById('search');

    let productsearch = dataProductsArray.filter((el) => {
        return el[searchOPtion] == searchEle.value;
    });

    // console.log(productsearch);
    let item = '';
    for (let i = 0; i < productsearch.length; i++) {
        item += `<tr>
                        <td>${i + 1}</td>
                        <td>${productsearch[i].title}</td>
                        <td>${productsearch[i].price}</td>
                        <td>${productsearch[i].taxes}</td>
                        <td>${productsearch[i].ads}</td>
                        <td>${productsearch[i].discount}</td>
                        <td>${productsearch[i].total}</td>
                        <td>${productsearch[i].category}</td>
                        </tr>`;
        // console.log(table);
    }
    document.getElementById('bodyTable').innerHTML = item;
    searchEle.value = '';
    scroll({
        top: 370,
        behavior: "smooth",

    });
    // div show  productsearch.length
    const tempDiv = document.getElementById('showLenghtOfSearch');
    tempDiv.style.backgroundColor = '#390053'
    tempDiv.style.color = '#fff';
    tempDiv.style.width = '100%'
    tempDiv.style.padding = "10px"
    tempDiv.style.textAlign = "center"
    tempDiv.style.fontSize = "18px"
    tempDiv.innerHTML = "search items = " + " " + productsearch.length;

}
