import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Divider,
} from "@mui/material";

interface CommentsProps {
    gameSlug: string;
}

const Comments: React.FC<CommentsProps> = ({ gameSlug }) => {
    const [gameData, setGameData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const apiKey = "f440cc6f53ef461793a6427f1abc6020"; 

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await axios.get(`https://api.rawg.io/api/games/${gameSlug}?key=${apiKey}`);
                setGameData(response.data);
            } catch (error) {
                console.error("Error fetching game data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGameData();
    }, [gameSlug]);

    if (isLoading) {
        return <Typography variant="h6">Cargando...</Typography>; 
    }

    if (!gameData) {
        return <Typography variant="h6">No se encontraron datos del juego.</Typography>;
    }

    return (
        <Card
            variant="outlined"
            sx={{
                backgroundColor: "#1C172B",
                border: "none",
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <CardContent sx={{ padding: 4 }}>
                <Typography
                    variant="h6"
                    sx={{ color: "#ffffff", fontSize: 12, mb: 1, textAlign: "left" }}
                >
                    Actividad de la Comunidad
                </Typography>
                <Divider sx={{ backgroundColor: "#ffffff", mb: 1 }} />

                {/* Información de reseñas */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "#ffffff" }}>Reseñas</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: "#ffffff" }}>
                        {gameData.ratings_count} {/* Ahora se muestra el total de reseñas */}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Comments;
