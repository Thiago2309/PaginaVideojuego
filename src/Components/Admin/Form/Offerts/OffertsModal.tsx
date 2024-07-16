import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, TextField, Typography, CardContent, useMediaQuery, useTheme, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import axios from 'axios';
import { Offerts, OffertsFormProps } from '../../../../Api/IOfferts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import GameOfferSearch from '../../../GameCatalog/GameOfferSearch';
import { Deal } from '../../../GameCatalog/dataApiOffert';
import { searchGames, getGameDetails } from '../../../../services/apiRAWG';

const API_URL_CREATE = 'https://localhost:7029/Ofertas/RegistroDeOferta';
const API_URL_UPDATE = 'https://localhost:7029/Ofertas';

const OffertsModal: React.FC<OffertsFormProps> = ({ initialData, onClose, setOfertas, ofertas }) => {
    const user = useSelector((state: RootState) => state.user);
    const [oferta, setOferta] = useState<Offerts>({
        id: 0,
        nombre: '',
        descripcion: '',
        calificacion: 0,
        foto_Url: '',
        genero: '',
        plataforma: '',
        fecha_Lanzamiento: '',
        desarrollador: '',
        editor: '',
        userId: user.id ?? 0,
        precio: 0,
        descuento: 0,
        link: ''
    });
    const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
    const [offers, setOffers] = useState<Deal[]>([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (initialData) {
            setOferta(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOferta((prev) => ({
            ...prev,
            [name]: name === 'calificacion' || name === 'precio' || name === 'descuento' ? parseFloat(value) : value
        }));

        if (name === 'foto_Url') {
            setPreviewImage(value);
        }
    };

    const fetchRAWGData = useCallback(async (title: string) => {
        try {
            const games = await searchGames(title);
            if (games.length > 0) {
                const gameDetails = await getGameDetails(games[0].id);
                setOferta((prev) => ({
                    ...prev,
                    descripcion: gameDetails.description_raw,
                    calificacion: gameDetails.rating,
                    genero: gameDetails.genres.map((genre: { name: string }) => genre.name).join(', '),
                    plataforma: gameDetails.platforms.map((platform: { platform: { name: string } }) => platform.platform.name).join(', '),
                    fecha_Lanzamiento: gameDetails.released,
                    desarrollador: gameDetails.developers.map((dev: { name: string }) => dev.name).join(', '),
                    editor: gameDetails.publishers.map((pub: { name: string }) => pub.name).join(', '),
                    foto_Url: gameDetails.background_image || prev.foto_Url,
                }));
                setPreviewImage(gameDetails.background_image || null);
            }
        } catch (error) {
            console.error('Error fetching game details from RAWG:', error);
        }
    }, []);

    const handleSelectDeal = useCallback((deal: Deal) => {
        setSelectedDeal(deal);
        setOferta((prev) => ({
            ...prev,
            nombre: deal.title,
            descripcion: '',
            calificacion: 0,
            foto_Url: '',
            genero: '',
            plataforma: '',
            fecha_Lanzamiento: '',
            desarrollador: '',
            editor: '',
            precio: deal.normalPrice,
            descuento: deal.salePrice,
            link: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
        }));
        fetchRAWGData(deal.title); // Llama a RAWG para obtener más detalles
    }, [fetchRAWGData]);

    const handleEdit = useCallback(async () => {
        try {
            const response = await axios.put(`${API_URL_UPDATE}/${oferta.id}`, oferta);
            const updatedOferta = response.data;
            setOfertas(ofertas.map(o => (o.id === oferta.id ? updatedOferta : o)));
            setAlertMessage('¡Oferta Editada exitosamente!');
            setAlertSeverity('success');
            setAlertOpen(true);
            setTimeout(onClose, 1200); // Cierra el modal después de 2 segundos
        } catch (error) {
            console.error('Error updating offer:', error);
            setAlertMessage('Error al editar la oferta');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    }, [oferta, setOfertas, ofertas, onClose]);

    const handleCreate = useCallback(async () => {
        try {
            const { id, ...ofertaSinId } = oferta;
            const response = await axios.post(API_URL_CREATE, ofertaSinId);
            const newOferta = response.data;
            setOfertas([...ofertas, newOferta]);
            setAlertMessage('¡Oferta Creada exitosamente!');
            setAlertSeverity('success');
            setAlertOpen(true);
            setTimeout(onClose, 1200); // Cierra el modal después de 2 segundos
        } catch (error) {
            console.error('Error creating offer:', error);
            setAlertMessage('Error al crear la oferta');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    }, [oferta, setOfertas, ofertas, onClose]);

    const handleSave = () => {
        if (oferta.id) {
            handleEdit();
        } else {
            handleCreate();
        }
    };

    const handleDealsFetched = useCallback((fetchedDeals: Deal[]) => {
        const bestDeals = fetchedDeals.slice(0, 5);
        setOffers(bestDeals);
    }, []);

    const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const selectedDealID = e.target.value as string;
        const selectedDeal = offers.find(offer => offer.dealID === selectedDealID);
        if (selectedDeal) {
            handleSelectDeal(selectedDeal);
        }
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: isMobile ? '95%' : '50%',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
            }}
        >
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {oferta.id ? 'Editar Oferta' : 'Nueva Oferta'}
                </Typography>
                <GameOfferSearch onDealsFetched={handleDealsFetched} onSelectDeal={handleSelectDeal} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Nombre"
                            name="nombre"
                            value={oferta.nombre}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Descripción"
                            name="descripcion"
                            value={oferta.descripcion}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={2}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Calificación"
                            name="calificacion"
                            value={oferta.calificacion}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="URL de la Foto"
                            name="foto_Url"
                            value={oferta.foto_Url}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    {previewImage && (
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                                <img src={previewImage} alt="Preview" style={{ maxWidth: "100%", height: "auto" }} />
                            </Box>
                        </Grid>
                    )}
                    <Grid item xs={6}>
                        <TextField
                            label="Género"
                            name="genero"
                            value={oferta.genero}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Plataforma"
                            name="plataforma"
                            value={oferta.plataforma}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Fecha de Lanzamiento"
                            name="fecha_Lanzamiento"
                            value={oferta.fecha_Lanzamiento}
                            onChange={handleChange}
                            fullWidth
                            type="date"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Desarrollador"
                            name="desarrollador"
                            value={oferta.desarrollador}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                    {offers.length > 0 && (
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="select-offer-label">Seleccionar Oferta</InputLabel>
                        <Select
                            labelId="select-offer-label"
                            value={selectedDeal?.dealID || ''}
                            label="Seleccionar Oferta"
                            onChange={(e) => {
                                const selectedDeal = offers.find(offer => offer.dealID === e.target.value);
                                if (selectedDeal) {
                                  handleSelectDeal(selectedDeal);
                                }
                              }}                        >
                            {offers.map((offer) => (
                                <MenuItem key={offer.dealID} value={offer.dealID}>
                                    {`${offer.title} - ${offer.storeName} - $${offer.salePrice.toFixed(2)} (Normal Price: $${offer.normalPrice.toFixed(2)}) - ${((1 - offer.salePrice / offer.normalPrice) * 100).toFixed(2)}% off`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Editor"
                            name="editor"
                            value={oferta.editor}
                            onChange={handleChange}
                            fullWidth
                            required 
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Precio"
                            name="precio"
                            value={oferta.precio}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Descuento"
                            name="descuento"
                            value={oferta.descuento}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Enlace"
                            name="link"
                            value={oferta.link}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            {oferta.id ? 'Guardar Cambios' : 'Crear'}
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default OffertsModal;
