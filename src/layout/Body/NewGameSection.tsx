import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import img1 from '../../img/juego1.png';
import img2 from '../../img/juego2.png';
import img3 from '../../img/img2.png';
import img4 from '../../img/img4.png';

interface Game {
    image: string;
    orders: number;
    rating: number;
}

const games: Game[] = [
    {
        image: img1,
        orders: 175,
        rating: 4.5,
    },
    {
        image: img2,
        orders: 175,
        rating: 4.5,
    },
    {
        image: img3,
        orders: 175,
        rating: 4.5,
    },
    {
        image: img4,
        orders: 175,
        rating: 4.5,
    },
    // más juegos..
];

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
    <Card sx={{ maxWidth: 150, margin: 'auto', backgroundColor: 'transparent', color: 'white', boxShadow: 'none' }}>
        <CardActionArea
            sx={{
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #fff',
            }}
        >
            <CardMedia
                component="img"
                height="150"
                width="150"
                image={game.image}
                sx={{ borderRadius: '50%', objectFit: 'cover' }}
            />
        </CardActionArea>
    </Card>
);

const NewGameSection: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1, padding: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'left', color: 'white' }}>
                Ofertas Especiales
            </Typography>
            <br />
            <Grid container spacing={2} justifyContent="center">
                {games.map((game, index) => (
                    <Grid item xs={4} sm={3} md={2} key={index}>
                        <GameCard game={game} />
                    </Grid>
                ))}
            </Grid>
            <br />
            <Typography variant="body2" color="inherit" align="center" sx={{ mt: 4 }}>
                © 2024 Destiny. Thiago Ramirez Soberano.
            </Typography>
        </Box>

    );
};

export default NewGameSection;
