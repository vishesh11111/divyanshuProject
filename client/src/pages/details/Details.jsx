
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

let productData = JSON.parse(localStorage.getItem("product"))

export const Details = () => {
  // /get/product/by/id

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
              <Grid sx={{ marginTop: "10%" }}>
                <Button variant="contained">Add to Cart</Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>

    </div>
  )
}
