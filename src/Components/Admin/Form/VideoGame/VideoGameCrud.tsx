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
    Snackbar,
    Alert,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Swal from 'sweetalert2'; 
import Modal from "@mui/material/Modal";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import VideoGameModal from '../VideoGame/VideoGameModal';
import { VideoGame } from '../../../../Api/IVideoGame';

const API_URL_GET = 'https://localhost:7029/Videojuegos/ObtenerVideojuegos';
const API_URL_DELETE = 'https://localhost:7029/Videojuegos';

const Community: React.FC = () => {
    const [videojuegos, setVideojuegos] = useState<VideoGame[]>([]);
    const [filteredVideojuegos, setFilteredVideojuegos] = useState<VideoGame[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editing, setEditing] = useState<VideoGame | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // hook para conocer la medida de la pantalla
    const isTablet = useMediaQuery(theme.breakpoints.down('md')); // hook para conocer la medida de la pantalla en tablets

    const fetchData = async () => {
        try {
            const response = await axios.get(API_URL_GET);
            const data = response.data.result;
            setVideojuegos(data);
            setFilteredVideojuegos(data);
        } catch (error) {
            console.error('Error fetching video games:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //para el de busqueda
    useEffect(() => {
        const results = videojuegos.filter(videojuego =>
            videojuego.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVideojuegos(results);
    }, [searchTerm]);

    const handleAdd = () => {
        setEditing(null);
        setIsModalOpen(true);
    };

    const handleEdit = (videojuego: VideoGame) => {
        setEditing(videojuego);
        setIsModalOpen(true);
    };

    const handleDelete = useCallback(async (id: number) => {
        try {
            await axios.delete(`${API_URL_DELETE}/${id}`);
            setVideojuegos(videojuegos.filter(v => v.id !== id));
            setAlertMessage('¡Videojuego eliminado exitosamente!');
            setAlertSeverity('success');
            setAlertOpen(true);
            fetchData();
        } catch (error) {
            console.error('Error deleting video game:', error);
            setAlertMessage('Error al eliminar el videojuego');
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    }, [videojuegos]);

    //Mensaje de alerta de eliminar
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
                    'El videojuego ha sido eliminado.',
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
                        <IconButton onClick={() => handleEdit(params.row as VideoGame)} color="primary">
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
            {
                field: 'acciones', headerName: 'Acciones', width: 150, renderCell: (params: GridRenderCellParams) => (
                    <Box>
                        <IconButton onClick={() => handleEdit(params.row as VideoGame)} color="primary">
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
                    title="Lista de Videojuegos"
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
                        rows={filteredVideojuegos}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[10, 25, 50]}
                        autoHeight
                        sx={{
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#13072E',
                                color: '#13072E',
                            },
                            '& .MuiDataGrid-row': {
                                backgroundColor: '#f5f5f5', // Color de fondo para las filas
                            },
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: '#a7b3fc', // Color de fondo al pasar el cursor
                            },
                            '& .MuiDataGrid-cell': {
                                color: '#000000',
                            },
                            '& .MuiDataGrid-row.Mui-selected': {
                                backgroundColor: '#d1d9ff', // Color de fondo para la fila seleccionada
                            },
                            '& .MuiDataGrid-row.Mui-selected:hover': {
                                backgroundColor: '#bec9ff', // Color de fondo para la fila seleccionada al pasar el cursor
                            },
                        }}
                    />
                </CardContent>
            </Card>
            <Snackbar open={alertOpen} onClose={handleAlertClose}>
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
                    <VideoGameModal
                        initialData={editing}
                        onClose={() => {
                            setIsModalOpen(false);
                            fetchData(); // Llamada para obtener la lista de videojuegos actualizada
                        }}
                        setVideojuegos={setVideojuegos}
                        videojuegos={videojuegos}
                    />
                </Box>
            </Modal>
        </Box>
    );
};

export default Community;
