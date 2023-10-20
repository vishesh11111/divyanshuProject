const fs = require('fs');
const filePath = 'data.json';
let UserController = {};

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
UserController.createItem = (req, res) => {
    let rondomNumber = Math.floor(Math.random() * 13234277343434) + 293293239;
    let data1 = req.body
    let item = { id: rondomNumber, ...data1 }
    const data = readData();
    let isPresent;
    if (data1.phone) {
        isPresent = data.some(obj => obj["phone"] === data1.phone);
    }
    if (data1?.email) {
        isPresent = isPresent ? isPresent : data.some(obj => obj["email"] === data1.email);
    }
    if (isPresent) {
        res.status(400).send({ sucess: false, message: "email or phone number already present please Login" })
    } else {
        data.push(item);
        writeData(data);
        res.status(200).json({ sucess: true, msg: "Register sucessfully" })
    }
}

UserController.login = (req, res) => {
    let data1 = req.body
    let { email, password } = req?.body;
    const data = readData();
    if (!isNaN(data1.email)) {
        let checkPresent = data.find((element) => (element.phone == data1.email));
        console.log(checkPresent, req.body);
        if (checkPresent && checkPresent.password == data1.password) {
            res.status(200).send({ sucess: true, message: "Login sucessfullY", data: checkPresent })
        }
        else if (checkPresent) {
            res.status(200).send({ sucess: false, message: "Please enter valid password" })
        } else {
            res.status(400).send({ sucess: false, message: "Please register first!" })
        }
    } else {
        let checkPresent = data.find((element) => (element.email == data1.email));
        if (checkPresent.password == data1.password) {
            res.status(200).send({ sucess: true, message: "Login sucessful", data: checkPresent })
        }
        else if (checkPresent) {
            res.status(200).send({ sucess: false, message: "Please enter valid password" })
        } else {
            res.status(400).send({ sucess: false, message: "Please register first!" })
        }
    }
}

// Read all items
UserController.readAllItems = (req, res) => {
    const data = readData();
    res.status(200).send({ sucess: true, message: "get succefully", data: data })
}

// Update an item
UserController.updateItem = (req, res) => {
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
UserController.deleteItem = (req, res) => {
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
module.exports = UserController;
