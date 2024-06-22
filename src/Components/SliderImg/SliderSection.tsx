import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import img1 from '../../assets/images/img1.png';
import img2 from '../../assets/images/img2.png';
import img3 from '../../assets/images/img3.png';
import img4 from '../../assets/images/img4.png';
import img5 from '../../assets/images/img5.png';

const SliderSection = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const images = [
        { src: img1, alt: 'Image 1' },
        { src: img2, alt: 'Image 2' },
        { src: img3, alt: 'Image 3' },
        { src: img4, alt: 'Image 4' },
        { src: img5, alt: 'Image 5' }
    ];

    return (
        <Box sx={{ padding: '23px' }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
                Más Populares
            </Typography>
            <br />
            <Slider {...settings}>
                {images.map((image, index) => (
                    <Box key={index} sx={{ padding: '0 8px', margin: '0 8px' }}>
                        <img src={image.src} alt={image.alt} style={{ borderRadius: '8px' }} />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default SliderSection;
