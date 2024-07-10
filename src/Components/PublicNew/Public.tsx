import React, { useState } from "react";
import { Card, CardContent, CardHeader, Grid, TextField, Button, Box, Tab } from '@mui/material';
import { PhotoCamera } from "@mui/icons-material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Public: React.FC = () => {
    const [value, setValue] = useState<string>('Publicación');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const getTitle = () => {
        switch (value) {
            case 'Publicación':
                return 'Crear Publicación';
            case 'Novedad':
                return 'Crear Novedad';
            case 'Oferta':
                return 'Crear Oferta';
            default:
                return 'Crear Publicación';
        }
    };

    return (
        <Card sx={{ backgroundColor: "#1C172B", width: "100%", maxWidth: "800px", margin: "auto" }}>
            <CardHeader
                title={getTitle()}
                titleTypographyProps={{ variant: 'h4', fontWeight: 'bold', color: '#ffffff' }}
                sx={{ textAlign: 'center' }}
            />
            <CardContent>
                <Grid container direction="column" spacing={3}>
                    {selectedImage && (
                        <Grid item>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={selectedImage} alt="Selected" style={{ maxHeight: '200px', borderRadius: '8px' }} />
                            </Box>
                        </Grid>
                    )}

                    <Grid item>
                        <Box sx={{ width: '100%', typography: 'body1', color: 'white' }}>
                            <TabContext value={value}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider', textAlign: 'center' }}>
                                    <TabList onChange={handleTabChange} aria-label="tipo de publicación" sx={{ justifyContent: 'center', '& .MuiTabs-flexContainer': { justifyContent: 'center' }, '& .MuiTab-root': { color: 'white' } }}>
                                        <Tab label="Publicación" value="Publicación" />
                                        <Tab label="Novedad" value="Novedad" />
                                        <Tab label="Oferta" value="Oferta" />
                                    </TabList>
                                </Box>
                                <TabPanel value="Publicación">
                                    <Grid container direction="column" spacing={3}>
                                        <Grid item>
                                            <TextField
                                                label="Nombre de la publicación"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Descripción de la publicación"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                                <TabPanel value="Novedad">
                                    <Grid container direction="column" spacing={3}>
                                        <Grid item>
                                            <TextField
                                                label="Nombre del juego (API de Luis)"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Imagen del juego (API de Luis)"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Descripción"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Categoría"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                                <TabPanel value="Oferta">
                                    <Grid container direction="column" spacing={3}>
                                        <Grid item>
                                            <TextField
                                                label="Nombre del juego (API de Luis)"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Imagen del juego (API de Luis)"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Desarrolladores (API de Luis)"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Categoría del juego (API de Luis)"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Plataformas (API de Luis)"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Descripción"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Categoría de la publicación"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                label="Link de la Oferta"
                                                variant="outlined"
                                                fullWidth
                                                sx={{ backgroundColor: "#ffffff", borderRadius: 1, fontFamily: 'TuTipografía' }}
                                            />
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                            </TabContext>
                        </Box>
                        <Grid item>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<PhotoCamera />}
                            sx={{ backgroundColor: "#E10AAB", color: "#ffffff" }}
                        >
                            Seleccionar imágenes
                            <input
                                type="file"
                                hidden
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Button>
                    </Grid>
                    </Grid>

                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#E10AAB", color: "#ffffff", padding: "10px 20px" }}
                        >
                            Publicar
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Public;
