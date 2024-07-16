import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    TextField,
    InputAdornment,
    Modal,
    Snackbar,
    Alert,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Swal from 'sweetalert2';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import OffertsModal from './OffertsModal';
import { Offerts } from '../../../../Api/IOfferts';

const API_URL_GET = 'https://localhost:7029/Ofertas/ObtenerOfertas';
const API_URL_DELETE = 'https://localhost:7029/Ofertas';

const OffertsCrud: React.FC = () => {
    const [ofertas, setOfertas] = useState<Offerts[]>([]);
    const [filteredOfertas, setFilteredOfertas] = useState<Offerts[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editing, setEditing] = useState<Offerts | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL_GET);
            const data = response.data.result;
            setOfertas(data);
            setFilteredOfertas(data);
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const results = ofertas.filter(oferta =>
            oferta.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOfertas(results);
    }, [searchTerm]);

    const handleAdd = () => {
        setEditing(null);
        setIsModalOpen(true);
    };

    const handleEdit = (oferta: Offerts) => {
        setEditing(oferta);
        setIsModalOpen(true);
    };

    const handleDelete = useCallback(async (id: number) => {
        try {
            await axios.delete(`${API_URL_DELETE}/${id}`);
            setOfertas(ofertas.filter(o => o.id !== id));
            setAlertMessage('¡Oferta eliminada exitosamente!');
            setAlertSeverity('success');
            setAlertOpen(true);
            fetchData();
        } catch (error) {
            console.error('Error deleting offer:', error);
            setAlertMessage('Error al eliminar la oferta');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    }, [ofertas]);

    const handleDeleteConfirmation = (id: number) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id);
                Swal.fire(
                    'Eliminado!',
                    'La oferta ha sido eliminada.',
                    'success'
                );
            }
        });
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const columns: GridColDef[] = isMobile
        ? [
            { field: 'id', headerName: 'Id', width: 80 },
            { field: 'nombre', headerName: 'Nombre', width: 150 },
            {
                field: 'acciones', headerName: 'Acciones', width: 150, renderCell: (params: GridRenderCellParams) => (
                    <Box>
                        <IconButton onClick={() => handleEdit(params.row as Offerts)} color="primary">
                            <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteConfirmation(params.row.id)} color='error'>
                            <Delete />
                        </IconButton>
                    </Box>
                )
            },
        ]
        : [
            { field: 'id', headerName: 'Id', width: 80 },
            { field: 'nombre', headerName: 'Nombre', width: 160 },
            { field: 'descripcion', headerName: 'Descripción', width: 140 },
            { field: 'calificacion', headerName: 'Calificación', width: 90 },
            { field: 'foto_Url', headerName: 'Foto', width: 100, renderCell: (params: GridRenderCellParams) => (
                <img src={params.value} alt={params.row.nombre} style={{ width: '50px' }} />
            )},
            { field: 'genero', headerName: 'Género', width: 120 },
            { field: 'plataforma', headerName: 'Plataforma', width: 150 },
            { field: 'fecha_Lanzamiento', headerName: 'Lanzamiento', width: 150, renderCell: (params: GridRenderCellParams) => (
                new Date(params.value).toLocaleDateString()
            )},
            { field: 'desarrollador', headerName: 'Desarrollador', width: 150 },
            { field: 'editor', headerName: 'Editor', width: 150 },
            { field: 'precio', headerName: 'Precio', width: 120 },
            { field: 'descuento', headerName: 'Descuento', width: 120 },
            { field: 'link', headerName: 'Enlace', width: 150, renderCell: (params: GridRenderCellParams) => (
                <a href={params.value} target="_blank" rel="noopener noreferrer">Enlace</a> // literal, abre otra ventana con el enlace
            )},
            {
                field: 'acciones', headerName: 'Acciones', width: 150, renderCell: (params: GridRenderCellParams) => (
                    <Box>
                        <IconButton onClick={() => handleEdit(params.row as Offerts)} color="primary">
                            <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteConfirmation(params.row.id)} color='error'>
                            <Delete />
                        </IconButton>
                    </Box>
                )
            },
        ];

    return (
        <Box sx={{ width: '100%', mx: 'auto', mt: 4 }}>
            <Card sx={{ mt: 4 }}>
                <CardHeader
                    title="Lista de Ofertas"
                    sx={{ display: 'flex', textAlign: 'left', justifyContent: 'space-between', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }}
                    action={
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row', p: 2 , m: 2 }}>
                            <TextField
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={handleSearch}
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mr: isMobile ? 0 : 2, mb: isMobile ? 2 : 0 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}
                                onClick={handleAdd}
                                size="small"
                                sx={{ width: isMobile ? '100%' : 'auto' }}
                            >
                                Nuevo
                            </Button>
                        </Box>
                    }
                />
                <CardContent>
                    <DataGrid
                        rows={filteredOfertas}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5
                                }
                            }
                        }}
                        pageSizeOptions={[5, 10, 20]}
                        autoHeight
                        disableRowSelectionOnClick
                    />
                </CardContent>
            </Card>
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4, mx: 'auto', mt: '1rem', borderRadius: 2 }}>
                    <OffertsModal
                        initialData={editing}
                        onClose={() => {
                            setIsModalOpen(false);
                            fetchData(); // Llamada para obtener la lista de videojuegos actualizada
                        }}
                        setOfertas={setOfertas}
                        ofertas={ofertas}
                    />
                </Box>
            </Modal>
        </Box>
    );
};

export default OffertsCrud;
