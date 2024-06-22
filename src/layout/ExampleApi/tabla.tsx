import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';

interface Pokemon {
    name: string;
    sprites: {
        front_default: string;
    };
}

const ApiExample: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
                const results = response.data.results;
                const detailedPokemons = await Promise.all(
                    results.map((pokemon: any) =>
                        axios.get(pokemon.url).then((res) => res.data)
                    )
                );
                setPokemons(detailedPokemons);
            } catch (error) {
                console.error('Error fetching pokemons:', error);
            }
        };

        fetchPokemons();
    }, []);

    return (
        <Box sx={{ flexGrow: 1, padding: 4, color: 'white' }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                Pokémon API Example
            </Typography>
           
                <Grid container spacing={2}>
                    {pokemons.map((pokemon, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card sx={{ maxWidth: 345, margin: 'auto' }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {pokemon.name}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
        </Box>
    );
};

export default ApiExample;