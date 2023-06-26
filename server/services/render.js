const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/products')
        .then(function(response) {
            res.render('index', { products: response.data });
        })
        .catch(err => {
            res.send(err);
        })


}
exports.cart = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/cart')
        .then(function(response) {
            res.render("cart", { orders: response.data })
        })
        .catch(err => {
            res.send(err);
        })
}
exports.homePage = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/products')
        .then(function(response) {
            res.render('home', { products: response.data, users: req.user });
        })
        .catch(err => {
            res.send(err);
        })


}

exports.add_product = (req, res) => {
    res.render('add_product');
}
exports.Signin = (req, res) => {
    res.render('login');
}
exports.Signup = (req, res) => {
    res.render('register');
}
exports.update_product = (req, res) => {
    axios.get('http://localhost:3000/api/products', { params: { id: req.query.id } })
        .then(function(productdata) {
            res.render("update_product", { product: productdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}