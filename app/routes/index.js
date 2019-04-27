// Se obtiene todas las rutas, se le agrega un path y se exporta para utilizarlas en el index del server
module.exports = [{
    path: "/product",
    data: require('./route_product')
}, {
    path: "/categories",
    data: require('./route_categories')
}, {
    path: "/cart",
    data: require('./route_cart')
}, , {
    path: "/brand",
    data: require('./route_brand')
}];