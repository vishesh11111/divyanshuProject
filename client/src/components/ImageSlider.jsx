import axios from 'axios';
import React, { useMemo, useState } from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { APis } from './Apis/Apis';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';

const spanStyle = {
    marginRight: "30%",
}

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: '100%',
    height: '450px'
}
const slideImages = [
    {
        url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: 'Slide 1'
    },
    {
        url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
        caption: 'Slide 2'
    },
    {
        url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: 'Slide 3'
    },
];

const autoSlideDuration = 2000;

export const ImageSlider = () => {
    const [banner, setBanner] = useState([]);


    const getBannerData = async () => {
        try {
            const getBannerData = await axios.get(APis.getBannerData);
            const result = [...getBannerData?.data?.data]
            result?.map((item, index) => {
                result[index].url = `https://bazaar.ui-lib.com${item?.imgUrl}`
            })
            setBanner(result);
            console.log(getBannerData?.data?.data)
        } catch (error) {
            console.log(error);
        }
    }

    useMemo(() => {
        getBannerData();
    }, []);

    return (
        <div className="slide-container">
            <Slide scale={0.4} nextArrow={false} prevArrow={false} duration={autoSlideDuration}>
                {banner.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                            <div style={spanStyle}>
                                <h1 className='banner-title'>{slideImage.title}</h1>
                                <p className="banner-description">{slideImage.description}</p>
                                <Box>
                                    <Typography variant="h4" sx={{margin: "0px"}} gutterBottom style={{color: "lightgreen"}}>
                                        Special Offer
                                    </Typography>
                                    <Typography variant="h6">
                                        Get {slideImage?.discount}% Off on Your Purchase
                                    </Typography>
                                </Box>
                                <Button style={{marginTop: "20px"}} variant="contained">{slideImage?.buttonText}</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    )
}

