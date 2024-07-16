import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, useMediaQuery, useTheme, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { Offerts, OffertsFormProps } from '../../../../Api/IOfferts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

const API_URL_CREATE = 'https://localhost:7029/Ofertas/RegistroDeOferta';
const API_URL_UPDATE = 'https://localhost:7029/Ofertas';

const OffertsModal: React.FC<OffertsFormProps> = ({ initialData, onClose, setOfertas, ofertas }) => {
    const user = useSelector((state: RootState) => state.user);
    console.log(user);
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

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

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
    };

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
            {/* <Card> */}
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {oferta.id ? 'Editar Oferta' : 'Nueva Oferta'}
                    </Typography>
                    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                        <TextField
                            fullWidth={!isMobile}
                            sx={{ flex: '0 0 48%', marginBottom: '16px' }}
                            label="Nombre"
                            name="nombre"
                            value={oferta.nombre}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth={!isMobile}
                            sx={{ flex: '0 0 48%', marginBottom: '16px' }}
                            label="Descripción"
                            name="descripcion"
                            value={oferta.descripcion}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth={!isMobile}
                            sx={{ flex: '0 0 48%', marginBottom: '16px' }}
                            label="Calificación"
                            name="calificacion"
                            type="number"
                            value={oferta.calificacion}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth={!isMobile}
                            sx={{ flex: '0 0 48%', marginBottom: '16px' }}
                            label="URL de la Foto"
                            name="foto_Url"
                            value={oferta.foto_Url}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth={!isMobile}
                            sx={{ flex: '0 0 48%', marginBottom: '16px' }}
                            label="Género"
                            name="genero"
                            value={oferta.genero}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth={!isMobile}
                            sx={{ flex: '0 0 48%', marginBottom: '16px' }}
                            label="Plataforma"
                            name="plataforma"
                            value={oferta.plataforma}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth={!isMobile}
                            sx={{ flex: '0 0 48%', marginBottom: '16px' }}
                            label="Fecha de Lanzamiento"
                            name="fecha_Lanzamiento"
                            type="date"
                            value={oferta.fecha_Lanzamiento}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            fullWidth={!isMobile}
                            sx={{ flex: '0 0 48%', marginBottom: '16px' }}
                            label="Desarrollador"
                            name="desarrollador"
                            value={oferta.desarrollador}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth={!isMobile}
                            sx={{ flex: '0 0 48%', marginBottom: '16px' }}
                            label="Editor"
                            name="editor"
                            value={oferta.editor}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth={!isMobile}
                            sx={{ flex: '0 0 48%', marginBottom: '16px' }}
                            label="Precio"
                            name="precio"
                            type="number"
                            value={oferta.precio}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth={!isMobile}
                            sx={{ flex: '0 0 48%', marginBottom: '16px' }}
                            label="Descuento"
                            name="descuento"
                            type="number"
                            value={oferta.descuento}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth={!isMobile}
                            sx={{ flex: '0 0 48%', marginBottom: '16px' }}
                            label="Enlace"
                            name="link"
                            value={oferta.link}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={onClose} sx={{ mr: 2 }}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Guardar
                        </Button>
                    </Box>
                </CardContent>
            {/* </Card> */}
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default OffertsModal;
