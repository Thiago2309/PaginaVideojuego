import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, ButtonBase, Typography, Box } from '@mui/material';

// Importa las imágenes desde tu carpeta de assets
import img1 from '../../../assets/images/v.jpeg';
import img2 from '../../../assets/images/ofert.jpg';
import img3 from '../../../assets/images/Users.jpg';

const images = [
    {
        src: img1,
        title: 'Videojuegos',
        width: '40%',
        link: '/adminpublic' // Ruta a la que debe redirigir
    },
    {
        src: img2,
        title: 'Ofertas',
        width: '40%',
        link: '/adminpublicOffert' // Ruta a la que debe redirigir
    },
    // {
    //     src: img3,
    //     title: 'Usuarios', // Cambia esto según tu necesidad
    //     width: '40%',
    //     link: '/404' // Ruta a la que debe redirigir
    // },
];

const Root = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 300,
    width: '100%',
    justifyContent: 'space-around',
}));

const ImageContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
}));

const Image = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    marginBottom: theme.spacing(2),
    borderRadius: '16px',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $ImageBackdrop': {
            opacity: 0.15,
        },
        '& $ImageMarked': {
            opacity: 0,
        },
        '& $ImageTitle': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    opacity: 0.3, // Configura la opacidad de la imagen
    zIndex: 1,
    borderRadius: '16px',
});

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.3,
    transition: theme.transitions.create('opacity'),
    borderRadius: '16px',
}));

const ImageButton = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
});

const ImageTitle = styled(Typography)(({ theme }) => ({
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

const AdminSelect: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (link: string) => {
        navigate(link);
    };

    return (
        <Root>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1">
                    Selecciona el CRUD
                </Typography>
            </Box>
            <ImageContainer>
                {images.slice(0, 2).map((image) => (
                    <Image
                        focusRipple
                        key={image.title}
                        style={{
                            width: image.width,
                        }}
                        onClick={() => handleNavigation(image.link)}
                    >
                        <ImageSrc
                            style={{
                                backgroundImage: `url(${image.src})`,
                            }}
                        />
                        <ImageBackdrop className="imageBackdrop" />
                        <ImageButton>
                            <br />
                            <ImageTitle
                                variant="subtitle1"
                                color="inherit"
                            >
                                {image.title}
                                <ImageMarked className="imageMarked" />
                            </ImageTitle>
                        </ImageButton>
                    </Image>
                ))}
            </ImageContainer>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                {images.slice(2, 3).map((image) => (
                    <Image
                        focusRipple
                        key={image.title}
                        style={{
                            width: image.width,
                        }}
                        onClick={() => handleNavigation(image.link)}
                    >
                        <ImageSrc
                            style={{
                                backgroundImage: `url(${image.src})`,
                            }}
                        />
                        <ImageBackdrop className="imageBackdrop" />
                        <ImageButton>
                            <ImageTitle
                                variant="subtitle1"
                                color="inherit"
                            >
                                {image.title}
                                <ImageMarked className="imageMarked" />
                            </ImageTitle>
                        </ImageButton>
                    </Image>
                ))}
            </Box>
        </Root>
    );
};

export default AdminSelect;
