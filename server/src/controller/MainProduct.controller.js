
const fs = require('fs');
const filePath = 'MainData.json';
const AllProduct = {};



function readData() {
    try {
        console.log("=>");
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data:', err);
        return [];
    }
}

// Write data to the JSON file
function writeData(data) {
    try {
        const json = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, json, 'utf8');
        console.log('Data written successfully.');
    } catch (err) {
        console.error('Error writing data:', err);
    }
}

AllProduct.BrandList = async (req, res) => {
    try {
        console.log("brands");
        let brands = readData();
        res.status(200).send({ data: brands?.pageProps?.brands })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

AllProduct.CategoryList = async (req, res) => {
    try {
        console.log("brands");
        let brands = readData();
        res.status(200).send({ data: brands?.pageProps?.categories })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

AllProduct.ProductsList = async (req, res) => {
    try {
        console.log("brands");
        let brands = readData();
        res.status(200).send({ data: brands?.pageProps?.products })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}
AllProduct.MenFationList = async (req, res) => {
    try {
        console.log("brands");
        let brands = readData();
        res.status(200).send({ data: brands?.pageProps?.menFashionProducts })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}
AllProduct.WomenFationList = async (req, res) => {
    try {
        console.log("brands");
        let brands = readData();
        res.status(200).send({ data: brands?.pageProps?.womenFashionProducts })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

AllProduct.ElctronicsList = async (req, res) => {
    try {
        console.log("brands");
        let brands = readData();
        res.status(200).send({ data: brands?.pageProps?.electronicsProducts })
    } catch (error) {
        res.status(500).send({ message: error })
    }
}

AllProduct.ReadData = (req, res) => {
    try {
        console.log("=>");
        const data = readData()?.pageProps
        res.status(200).json(data);
    } catch (err) {
        console.error('Error reading data:', err);
        return [];
    }
}
AllProduct.BannerData = (req, res) => {
    try {
        console.log("=>");
        const data = readData()?.pageProps
        res.status(200).send({ data: data?.mainCarouselData })
    } catch (err) {
        console.error('Error reading data:', err);
        return [];
    }
}

AllProduct.FindDataById = (req, res) => {
    try {
        console.log("=>");
        let { id, key } = req?.body;
        const data = readData()?.pageProps[key];
        let filterData = data.filter((item) => item?.id == id)
        res.status(200).send({ data: filterData[0] })
    } catch (err) {
        console.error('Error reading data:', err);
        return [];
    }
}

module.exports = AllProduct;

