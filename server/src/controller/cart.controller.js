const fs = require('fs');
const filePath = 'cart.json';
let CartController = {};


function readData() {
    try {
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


// Create a new item
CartController.createItem = (req, res) => {
    let data1 = req.body
    let item = { qty: 1, ...data1 }
    const data = readData();
    let findInd = data.findIndex((element) => (element.id == data1.id && data1.userId == element.userId));
    if (findInd >= 0) {
        let qty = data[findInd].qty
        data[findInd].qty = qty + 1;
        console.log("=>==>", data)
        // data.push(item);
        writeData(data);
        res.status(200).send({ sucess: true, message: "Add to cart succefully" })
    } else {
        console.log("=>", item)
        data.push(item);
        writeData(data);
        res.status(200).send({ sucess: true, message: "Add to cart succefully" })
    }
}

CartController.readAllItems = (req, res) => {
    let userId = req.query.userId
    const data = readData();
    let getData = data.filter((e) => e.userId == userId);
    res.status(200).send({ sucess: true, message: "get succefully", data: getData })
}

CartController.deleteItem = (req, res) => {
    let { userId, id } = req.body
    const data = readData();
    const index = data.findIndex(item => (item.id === id) && (item.userId == userId));
    if (index >= 0) {
        data.splice(index, 1);
        writeData(data);
        res.status(200).send({ sucess: true, message: "Delete Item successfully." })
    } else {
        res.status(200).send({ sucess: true, message: "Item Not found" })
    }
}

module.exports = CartController;