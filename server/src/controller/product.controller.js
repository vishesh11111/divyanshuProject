const fs = require('fs');
const filePath = 'product.json';
let ProductController = {};

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
ProductController.createItem = (req, res) => {
    let rondomNumber = Math.floor(Math.random() * 132342);
    let data1 = req.body
    let item = { id: rondomNumber, ...data1 }
    const data = readData();
    let checkPresent = data.find((element) => element.email == data1.email);
    if (checkPresent) {
        res.status(400).send({ sucess: false, message: "email already present please enter valid email" })
    } else {
        data.push(item);
        writeData(data);
        res.status(200).send({ sucess: true, message: "Register succefully" })
    }
}

// Read all items
ProductController.readAllItems = (req, res) => {
    const data = readData();
    res.status(200).send({ sucess: true, message: "get succefully", data: data })
}

// Update an item
ProductController.updateItem = (req, res) => {
    let id = req.body.id;
    let updatedItem = req.body.data;
    const data = readData();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = { id, ...updatedItem };
        writeData(data);
        res.status(200).send({ sucess: true, message: "Item updated successfully.", data: data })
    } else {
        res.status(200).send({ sucess: true, message: "Item Not found" })
    }
}

// Delete an item
ProductController.deleteItem = (req, res) => {
    let id = req.body.id;
    const data = readData();
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        writeData(data);
        res.status(200).send({ sucess: true, message: "Delete Item successfully." })
    } else {
        res.status(200).send({ sucess: true, message: "Item Not found" })
    }
}

// Usage example:
// Assume the JSON data file initially contains an array of objects with 'id' property

// Create a new item
// createItem({ id: 1, name: 'Item 1' });

// // Read all items
// readAllItems();

// // Update an item with id 1

// updateItem(1, { name: 'Updated Item 1' });

// // Read all items
// readAllItems();

// // Delete the item with id 1
// deleteItem(1);

// // Read all items
// readAllItems();
module.exports = ProductController;
