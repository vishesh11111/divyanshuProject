
import React, { useEffect, useMemo, useState } from 'react'
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
} from '@mui/material';
import axios from 'axios';
import { APis } from '../../components/Apis/Apis';
import { useParams } from 'react-router';
import { toast, ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"
import { CartLength } from '../../Redux/action';
import { TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

let productData = JSON.parse(localStorage.getItem("product"))

export const Details = () => {
  const [quantity, setQuantity] = useState(1);
  // /get/product/by/id
  const dispatch = useDispatch()

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const [state, setState] = useState({
    data: {},
  })
  const [selectedImage, setSelectedImage] = useState("");

  const { id } = useParams();
  useEffect(() => {
    getProductData();
  }, [])

  const getProductData = async () => {
    try {
      const result = await axios.post(APis?.getProductById, { id, key: "products" })
      console.log("data==>", result?.data?.data)
      setSelectedImage(result?.data?.data?.images[0])
      setState(pre => ({ ...pre, data: result?.data?.data }))
    } catch (error) {
      console.log(error);
    }
  }



  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCart = async (data) => {
    try {
      let check_user = localStorage.getItem('user');
      if (check_user) {
        let CartData = { ...data, userId: JSON.parse(check_user).id };
        let result = await axios({
          method: "post",
          data: CartData,
          url: APis?.addTocart
        })
        if (result) {
          let cartData = await GetCart();
          console.log("____----->", cartData);
          dispatch(CartLength(cartData.length))
          toast.success("Add to cart successfully");
        }
      } else {
        toast.warning("Please Login first");
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log("productData==>", state?.data)

  return (
    <div style={{ marginTop: "100px" }}>
      <Container>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ width: "400px", height: "330px" }}>
                <CardMedia
                  component="img"
                  alt={state?.data?.title}
                  height="100%"
                  image={`https://bazaar.ui-lib.com${selectedImage}`}
                  title={state?.data?.title}
                />
              </Card>
              {state?.data?.images && <Grid container spacing={1}>
                {state?.data?.images.map((image, index) => (
                  <Grid item key={index} xs={4}>
                    <Button
                      onClick={() => handleImageClick(image)}
                      variant="outlined"
                    >
                      <img
                        src={`https://bazaar.ui-lib.com${image}`}
                        alt={state?.data.title}
                        style={{ width: '50%', height: "50%" }}
                      />
                    </Button>
                  </Grid>
                ))}
              </Grid>}
            </Grid>
            <Grid sx={{ marginTop: "10%" }} item xs={12} sm={6}>
              <Typography variant="h5">{state?.data.title}</Typography>
              <Typography variant="subtitle1">
                Price: ${state?.data?.price}
              </Typography>
              {/* Add more product details here */}
              <Box sx={{ marginLeft: "32%", width: "40%" }} display="flex" alignItems="center">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleDecrement}
                >
                  <RemoveIcon />
                </Button>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  value={quantity}
                  inputProps={{
                    style: { margin: "auto", textAlign: 'center', width: "50px" },
                    min: 1,
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleIncrement}
                >
                  <AddIcon />
                </Button>
              </Box>
              <Grid sx={{ marginTop: "10%" }}>
                <Button variant="contained" onClick={() => handleCart(state?.data)}>Add to Cart</Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <ToastContainer />
    </div>
  )
}


export const GetCart = async () => {
  try {
    let check_user = localStorage.getItem('user');
    if (check_user) {
      let result = await axios.get(`${APis?.getcartList}?userId=${JSON.parse(check_user).id}`);
      return result?.data?.data
    }
  } catch (error) {
    return [];
    console.log(error)
  }
}
