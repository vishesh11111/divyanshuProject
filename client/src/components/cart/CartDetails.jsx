import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { APis } from '../Apis/Apis';
import { Paper, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { toast, ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"
import { CartLength } from '../../Redux/action';
import { TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    Container,
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardMedia,
} from '@mui/material';

export const CartDetails = () => {

    const [state, setState] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        getCartData();
    }, [])

    const getCartData = async () => {
        try {
            const result = await axios.get(`${APis?.getcartList}?userId=${id}`);
            if (result) {
                setState(result?.data?.data)
                let storeTotalData = 0
                result?.data?.data?.map((item) => {
                    storeTotalData += item?.price * item?.qty
                })
                setTotalPrice(storeTotalData)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheckout = () => {

    }

    const handleDecrement = async (item) => {
        try {
            let { id } = JSON.parse(localStorage.getItem("user"));
            /**  // let cloneData = [...state];
              // let checkInde = cloneData.findIndex((ele) => ele?.id == item?.id)
              // if (cloneData[checkInde].qty > 1) {
              //     cloneData[checkInde].qty = item.qty - 1;
              //     setState(cloneData);
              // } else {
              //     cloneData.splice(checkInde, 1);
              //     setState(cloneData);
              // } */

            item.qty = item.qty - 1;
            item.userId = id;
            let result = await axios.post(APis?.increaseQty, item);
            getCartData()
        } catch (error) {
            console.log(error);
        }
    }

    const handleIncrement = () => {

    }


    return (
        <div style={{ marginTop: "5%" }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6">Shopping Cart</Typography>
                <List >
                    {state.map((item) => (
                        <ListItem key={item.id} sx={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", height: "150px", margin: "10px" }}>
                            <ListItemAvatar sx={{ height: "100%" }}>
                                <img style={{ height: "100%" }} src={`https://bazaar.ui-lib.com${item.thumbnail}`} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.title}
                                secondary={`Qty: ${item.qty} - Price: $${item.price * item.qty}`}
                            />
                            <Box sx={{ marginLeft: "32%", width: "30%" }} display="flex" alignItems="center">
                                <Button
                                    variant="text"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleDecrement(item)}
                                >
                                    <RemoveIcon />
                                </Button>
                                <TextField
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    value={item?.qty}
                                    inputProps={{
                                        style: { margin: "auto", textAlign: 'center', width: "30px" },
                                        min: 1,
                                    }}
                                />
                                <Button
                                    variant="text"
                                    color="primary"
                                    // size="small"
                                    sx={{ width: "20px" }}
                                    onClick={() => handleIncrement(item)}
                                >
                                    <AddIcon />
                                </Button>
                            </Box>
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h6">Total Price: ${totalPrice}</Typography> {/* Calculate the total price here */}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={handleCheckout}
                >
                    Checkout
                </Button>
            </Paper>
        </div>
    )
}
