import React from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

const ContactSection = () => {
    return (
        <Grid item xs={12} md={12} lg={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'center', md: 'flex-start' }, justifyContent: { xs: 'center', sm: 'center', md: 'flex-start' }, color: 'white' }}>
                <Typography variant="h6" gutterBottom sx={{ marginTop: '1rem' }}>
                    Páginas
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, marginTop: '1rem' }}>
                    <IconButton
                        component="a"
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            padding: 1,
                            '&:hover': {
                                backgroundColor: 'white',
                                '& svg': {
                                    color: 'blue'
                                }
                            }
                        }}
                    >
                        <FacebookIcon sx={{ color: 'black' }} />
                    </IconButton>
                    <IconButton
                        component="a"
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            padding: 1,
                            '&:hover': {
                                backgroundColor: 'white',
                                '& svg': {
                                    color: 'red'
                                }
                            }
                        }}
                    >
                        <YouTubeIcon sx={{ color: 'black' }} />
                    </IconButton>
                    <IconButton
                        component="a"
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            padding: 1,
                            '&:hover': {
                                backgroundColor: 'white',
                                '& svg': {
                                    color: 'blue'
                                }
                            }
                        }}
                    >
                        <LinkedInIcon sx={{ color: 'black' }} />
                    </IconButton>
                    <IconButton 
                        component="a" 
                        href="https://www.instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        sx={{ 
                            backgroundColor: 'white', 
                            borderRadius: '50%', 
                            padding: 1,
                            '&:hover': {
                                backgroundColor: 'white',
                                '& svg': {
                                    color: '#FF1493', // Gradiente de rosa a naranja y amarillo
                                    
                                }
                            }
                        }}
                    >
                        <InstagramIcon sx={{ color: 'black' }} />
                    </IconButton>
                </Box>
            </Box>
        </Grid>
    );
};

export default ContactSection;
