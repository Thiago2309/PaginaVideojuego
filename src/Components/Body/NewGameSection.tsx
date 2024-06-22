import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import img1 from '../../assets/images/juego1.png';
import img2 from '../../assets/images/juego2.png';
import img3 from '../../assets/images/img2.png';
import img4 from '../../assets/images/img4.png';
import FooterView from '../../layout/Footer/FooterView';

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
            <Box sx={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center' }}>
                {FooterView()}
            </Box>
        </Box>

    );
};

export default NewGameSection;
