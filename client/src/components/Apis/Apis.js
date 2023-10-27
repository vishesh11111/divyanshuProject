
const url = "http://localhost:4000/api";

export const APis = {
    getAllData: `${url}/get/all/data`,
    getBrandData: `${url}/get/brands/list`,
    getCategoryData: `${url}/get/categories/list`,
    getmenData: `${url}/get/men/list`,
    getwomenData: `${url}/get/women/list`,
    getProductsData: `${url}/get/products/list`,
    getPElectronicData: `${url}/get/electronics/list`,
    getBannerData: `${url}/get/banner/list`,

    // product by Id
    getProductById: `${url}/get/product/by/id`,

    // auth route
    loginRoute: `${url}/login/user`,
    registerRoute: `${url}/create/user`,

    // cart route
    addTocart: `${url}/add/cart`,
    getcartList: `${url}/get/cart`,
    increaseQty: `${url}/increase/qty`
}