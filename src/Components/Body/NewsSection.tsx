import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import imgNews from '../../assets/images/GTA.png'; 

const NewsSection = () => {
    return (
        <Box sx={{ flexGrow: 1, padding: 4, color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.075)'  }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
                Novedades
            </Typography>
            <br />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <Typography variant="body1" gutterBottom sx={{ textAlign: 'left' }}>
                            Lorem ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
                            libro de textos especimen.
                            No sólo sobrevivió 500 años, sino que también ingresó como texto de 
                            relleno en documentos electrónicos, quedando esencialmente igual al 
                            original. Fue popularizado en los 60s con la creación de las hojas "Letraset".
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Typography variant="body1" gutterBottom sx={{ textAlign: 'left' }}>
                            Lorem ipsum es simplemente el texto de relleno 
                            de las imprentas y archivos de texto. Lorem Ipsum 
                            ha sido el texto de relleno estándar de las industrias 
                            desde el año 1500, cuando un impresor (N. del T. persona que 
                            se dedica a la imprenta) desconocido usó una galería de textos 
                            y los mezcló de tal manera que logró hacer un libro de textos 
                            especimen. No sólo sobrevivió 500 años, sino que también ingresó 
                            como texto de relleno en documentos electrónicos, quedando 
                            esencialmente igual al original. Fue popularizado en los 60s 
                            con la creación de las hojas "Letraset". libro de textos especimen.
                            No sólo sobrevivió 500 años, sino que también ingresó como texto de 
                            relleno en documentos electrónicos, quedando esencialmente igual al 
                            original. Fue popularizado en los 60s con la creación de las hojas "Letraset".
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <img src={imgNews} alt="Grand Theft Auto" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewsSection;
