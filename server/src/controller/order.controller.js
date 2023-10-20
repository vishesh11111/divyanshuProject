
const fs = require('fs');
const cartPath = 'cart.json';
const orderPath = 'order.json';


function CartReadData() {
    try {
        const data = fs.readFileSync(cartPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data:', err);
        return [];
    }
}

function OrderReadData() {
    try {
        const data = fs.readFileSync(orderPath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data:', err);
        return [];
    }
}

// Write data to the JSON file
function CartWriteData(data) {
    try {
        const json = JSON.stringify(data, null, 2);
        fs.writeFileSync(cartPath, json, 'utf8');
        console.log('Data written successfully.');
    } catch (err) {
        console.error('Error writing data:', err);
    }
}

function OrderWriteData(data) {
    try {
        const json = JSON.stringify(data, null, 2);
        fs.writeFileSync(orderPath, json, 'utf8');
        console.log('Data written successfully.');
    } catch (err) {
        console.error('Error writing data:', err);
    }
}

const orderController = {};

orderController.createOrder = async (req, res) => {
    let userId = req.body.userId;
    const data = CartReadData();
    if (userId) {
        let getData = data.filter((e) => e.userId == userId);
        let pushData = data.filter((e) => e.userId != userId);
        getData.map((e, index) => {
            getData[index].status = {
                cureent: "pending",
                id: 0,
            }
        })

        const dataStatus = [
            {
                cureent: "pending",
                id: 0,
            },
            {
                cureent: "confirmed",
                id: 1,
            },
            {
                cureent: "shipped",
                id: 2,
            },
            {
                cureent: "arrived",
                id: 3,
            },
            {
                cureent: "out for deliver",
                id: 4,
            },
            {
                cureent: "delivered",
                id: 5,
            },
        ]

        if (getData.length > 0) {
            let OrderData = OrderReadData();
            OrderWriteData([...OrderData, {
                id: Math.floor(Math.random() * 98337737) + 122323,
                paymentStatus: "cash on delivery",
                status: dataStatus,
                userId: userId,
                data: getData
            }])
            CartWriteData(pushData);
            let data = OrderReadData();
            res.status(200).send({ sucess: true, message: "order succefull!", data })
        } else {
            res.status(200).send({ sucess: false, message: "cart item not present" })
        }
    } else {
        res.status(200).send({ sucess: false, message: "please enter userId" })
    }
}

orderController.getOrderData = async (req, res) => {
    let { userId } = req.query;
    let OrderData = OrderReadData();
    let data = OrderData.filter((item) => item.userId == userId)
    if (data) {
        res.status(200).send({ sucess: true, message: "order get succefull!", data })
    } else {
        res.status(200).send({ sucess: false, message: "order not found!" })
    }
}

module.exports = orderController;