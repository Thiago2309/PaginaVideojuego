import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    InputAdornment,
    Modal,
} from '@mui/material';
import { Add, Edit, Delete, Search } from '@mui/icons-material';
import VideoGameModal from '../VideoGame/VideoGameModal';

interface Videojuego {
    id: number;
    nombre: string;
    descripcion: string;
    calificacion: number;
    foto_url: string;
    genero: string;
    plataforma: string;
    fecha_lanzamiento: string;
    desarrollador: string;
    editor: string;
}

const Community: React.FC = () => {
    const [videojuegos, setVideojuegos] = useState<Videojuego[]>([]);
    const [filteredVideojuegos, setFilteredVideojuegos] = useState<Videojuego[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editing, setEditing] = useState<Videojuego | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch('/api/videojuegos')
            .then(response => response.json())
            .then(data => {
                setVideojuegos(data);
                setFilteredVideojuegos(data);
            });
    }, []);

    useEffect(() => {
        const results = videojuegos.filter(videojuego =>
            videojuego.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVideojuegos(results);
    }, [searchTerm, videojuegos]);

    const handleAdd = () => {
        setEditing(null);
        setIsModalOpen(true);
    };

    const handleEdit = (videojuego: Videojuego) => {
        setEditing(videojuego);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        fetch(`/api/videojuegos/${id}`, {
            method: 'DELETE',
        }).then(() => {
            setVideojuegos(videojuegos.filter(v => v.id !== id));
        });
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Box sx={{ width: '100%', mx: 'auto', mt: 4 }}>
            <Card sx={{ mt: 4 }}>
                <CardHeader
                    title="Lista de Videojuegos"
                    sx={{ display: 'flex', textAlign: 'left', justifyContent: 'space-between' }}
                    action={
                        <Box sx={{ display: 'flex', alignItems: 'left' }}>
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
                                sx={{ mr: 2 }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-star' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Add />}
                                    onClick={handleAdd}
                                    size="small"
                                >
                                    Nuevo
                                </Button>
                            </Box>
                        </Box>
                    }
                />
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Descripción</TableCell>
                                    <TableCell>Calificación</TableCell>
                                    <TableCell>Foto</TableCell>
                                    <TableCell>Género</TableCell>
                                    <TableCell>Plataforma</TableCell>
                                    <TableCell>Fecha de Lanzamiento</TableCell>
                                    <TableCell>Desarrollador</TableCell>
                                    <TableCell>Editor</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredVideojuegos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((videojuego, index) => (
                                    <TableRow key={videojuego.id} sx={{ backgroundColor: index % 2 ? 'grey.100' : 'white' }}>
                                        <TableCell>{videojuego.nombre}</TableCell>
                                        <TableCell>{videojuego.descripcion}</TableCell>
                                        <TableCell>{videojuego.calificacion}</TableCell>
                                        <TableCell><img src={videojuego.foto_url} alt={videojuego.nombre} style={{ width: '50px' }} /></TableCell>
                                        <TableCell>{videojuego.genero}</TableCell>
                                        <TableCell>{videojuego.plataforma}</TableCell>
                                        <TableCell>{new Date(videojuego.fecha_lanzamiento).toLocaleDateString()}</TableCell>
                                        <TableCell>{videojuego.desarrollador}</TableCell>
                                        <TableCell>{videojuego.editor}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEdit(videojuego)}>
                                                <Edit />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(videojuego.id)}>
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredVideojuegos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </CardContent>
            </Card>

            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ width: 400, bgcolor: 'background.paper', p: 4, mx: 'auto', mt: '10%', borderRadius: 2 }}>
                    <VideoGameModal
                        initialData={editing}
                        onClose={() => setIsModalOpen(false)}
                        setVideojuegos={setVideojuegos}
                        videojuegos={videojuegos}
                    />
                </Box>
            </Modal>
        </Box>
    );
};

export default Community;
