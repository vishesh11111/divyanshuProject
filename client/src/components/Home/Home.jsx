import axios from 'axios'
import React, { useMemo, useState } from 'react'
import { APis } from '../Apis/Apis'
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { ImageSlider } from '../ImageSlider';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const [state, setState] = useState({
        data: [],
    })
    const navigate = useNavigate();



    const getProcductsData = async () => {
        try {
            const result = await axios.get(APis?.getProductsData)
            let data = result?.data?.data;
            setState(pre => ({ ...pre, data: data }))
        } catch (error) {
            console.log(error);
        }
    }


    useMemo(() => {
        getProcductsData();
    }, [])

    const handleChange = () => {

    }


    const handleProduct = (value) => {
        localStorage.setItem("product", JSON.stringify(value));
        navigate(`/product/details/${value?.id}`)
    }

    console.log("++>", state?.data)

    return (
        <>
            <ImageSlider />
            <div style={{ marginTop: "15px" }}>
                <Grid container spacing={2}>
                    <Grid item >
                        <Grid container justifyContent="center" spacing={2}>
                            {state?.data?.map((value) => (
                                <Card onClick={() => handleProduct(value)} style={{ margin: "10px" }} sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={`https://bazaar.ui-lib.com${value?.thumbnail}`}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {value?.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                                species, ranging across all continents except Antarctica
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>

                                    <CardActions sx={{ justifyContent: "space-between" }}>
                                        <Button size="small" color="primary">
                                            <ShareIcon />
                                        </Button>
                                        <Typography gutterBottom variant="h6" component="div">
                                            ₹{value?.price}/-
                                        </Typography>
                                    </CardActions>
                                </Card>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
