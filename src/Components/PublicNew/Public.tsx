import React, { useState } from "react";
import { Card, CardContent, Grid, Typography, TextField, Button, MenuItem, FormControl, Select, InputLabel, SelectChangeEvent } from '@mui/material';
import { PhotoCamera } from "@mui/icons-material";

const Public: React.FC = () => {
    const [postType, setPostType] = useState<string>('Publicación');
    const [link, setLink] = useState<string>('');

    const handlePostTypeChange = (event: SelectChangeEvent<string>) => {
        setPostType(event.target.value as string);
        if (event.target.value !== 'Oferta') {
            setLink('');
        }
    };

    return (
        <Card sx={{ backgroundColor: "#1C172B", width: "100%" }}>
            <CardContent sx={{ padding: 4 }}>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <Typography variant="h4" component="div" sx={{ fontWeight: "bold", color: "#ffffff" }}>
                            Crear Publicación
                        </Typography>
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Nombre de la publicación"
                            variant="outlined"
                            fullWidth
                            sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Descripción de la publicación"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
                        />
                    </Grid>

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
                            />
                        </Button>
                    </Grid>

                    <Grid item>
                        <FormControl fullWidth variant="outlined" sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}>
                            <InputLabel id="post-type-label">Tipo de Publicación</InputLabel>
                            <Select
                                labelId="post-type-label"
                                value={postType}
                                onChange={handlePostTypeChange}
                                label="Tipo de Publicación"
                            >
                                <MenuItem value="Publicación">Publicación</MenuItem>
                                <MenuItem value="Oferta">Oferta</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {postType === 'Oferta' && (
                        <Grid item>
                            <TextField
                                label="Link de la publicación"
                                variant="outlined"
                                fullWidth
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                sx={{ backgroundColor: "#ffffff", borderRadius: 1 }}
                            />
                        </Grid>
                    )}

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
