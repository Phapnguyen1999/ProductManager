class product {
    constructor(id, name, img, size, price, action) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.size = size;
        this.price = price;
        this.action = action;
    }
}
class Helper {
    static formatCurrency(number) {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    }
}
let products = []
const product_data = "product_data";
function init() {
    if (localStorage.getItem(product_data) === null) {
        products = [
            new product(1, "Ao dai hoa tiet", "img/hoatiet.jpg", "S M L", 850000),
            new product(2, "Ao dai truyen thong", "img/xua.jpeg", "S M X", 1500000),
            new product(3, "Ao dai cach tan", "img/cachtan.jpeg", "M L X", 450000),
            new product(4, "Ao dai cuoi", "img/cuoi.png", "S M L", 2100000),
            new product(5, "Ao dai tre em", "img/children.jpeg", "S M L", 200000),
        ];
        localStorage.setItem(product_data, JSON.stringify(products));
    }
    else {
        products = JSON.parse(localStorage.getItem(product_data))
    }
}
init();
function getId() {
    max = 0;
    for (let product of products) {
        if (product.id > max) {
            max = product.id;
        }
    }
    return max;
}

function renderProduct(data) {
    let htmls = data.map(function (product) {
        return `
            <tr>
                <td>SP#${product.id}</td>
                <td>${product.name}</td>
                <td> <img src="${product.img}" alt=" " style="width: 70px; height:100px"></td>
                <td>${product.size}</td>
                <td>${Helper.formatCurrency(product.price)}</td>
                <td>
                    <button class="btn btn-warning" onclick="productEdit(${product.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `
    })
    document.querySelector("table>tbody").innerHTML = htmls.join("");
}
renderProduct(products)

function addProduct() {
    let productId = getId() + 1;
    let productName = document.querySelector("#name").value;
    let productImg = document.querySelector("#img").value;
    let productSize = document.querySelector("#size").value;
    let productPrice = Number(document.querySelector("#price").value);
    let newProduct = new product(productId, productName, productImg, productSize, productPrice)
    products.push(newProduct)
    localStorage.setItem(product_data, JSON.stringify(products))
    renderProduct(products)
    clearForm();
}
function productEdit(productId) {
    let product = products.find(function (product) {
        return product.id == productId;
    })
    document.querySelector("#name").value = product.name;
    document.querySelector("#img").value = product.img;
    document.querySelector("#size").value = product.size;
    document.querySelector("#price").value = product.price;
    document.querySelector("#productId").value = product.id;
    document.getElementById("add").style.display = "none";
    document.getElementById("submit").style.display = "inline-block";
    document.getElementById("cancel").style.display = "inline-block";
}
function submitProduct() {
    let name = document.querySelector("#name").value;
    let img = document.querySelector("#img").value;
    let size = document.querySelector("#size").value;
    let price = Number(document.querySelector("#price").value);
    let id = Number(document.querySelector("#productId").value);
    let product = products.find(function (product) {
        return product.id == id;
    });
    console.log(id);
    product.name = name;
    product.img = img;
    product.size = size;
    product.price = price;


    localStorage.setItem(product_data, JSON.stringify(products));
    renderProduct(products);
    cancel();
}
function cancel() {
    document.querySelector("#name").value = "";
    document.querySelector("#img").value = "";
    document.querySelector("#size").value = "";
    document.querySelector("#price").value = "";
    document.getElementById("submit").style.display = "none";
    document.getElementById("cancel").style.display = "none";
    document.getElementById("add").style.display = "inline-block";
}

function clearForm() {
    document.querySelector("#name").value = "";
    document.querySelector("#img").value = "";
    document.querySelector("#size").value = "";
    document.querySelector("#price").value = "";

}

function deleteProduct(productId) {
    let confirmed = window.confirm("Are you sure to want to remove this product?");
    if (confirmed) {
        let posistion = products.findIndex(function (product) {
            return product.id == productId;
        });
        products.splice(posistion, 1);
        localStorage.setItem(product_data, JSON.stringify(products))
        renderProduct(products);
    }
}
var index = 0;
var a = document.querySelector(".image");
function changeImg() {
    let imgs = ["img/aodaidan.jpeg", "img/aodaisen.jpeg", "img/aodaixanh.jpeg", "img/aodaivang.jpeg", "img/aodaido.jpeg"];
    a.style = `background-image: url("${imgs[index]}")`;
    a.style.transition = '.1s'
    index++;
    if (index == 4) {
        index = 0;
    }

}
setInterval(changeImg, 5000);

function search(searchInput) {
    let result = products.filter(function (product) {
        return product.name.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1||product.size.toLowerCase().indexOf(searchInput.value.toLowerCase()) != -1;
    });
    renderProduct(result);
}
function login() {
    let user = document.querySelector("#user").value;
    let pw = document.querySelector("#password").value;
    if (user == "Admin" && pw == "123123") {
        location.href = "http://127.0.0.1:5500/body.html"
    } else {
        alert("Wrong user name or password")
    }
}