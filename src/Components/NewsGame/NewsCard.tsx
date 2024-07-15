import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Article } from '../../Api/Types/index';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

interface NewsCardProps {
    article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 'auto', backgroundColor: '#1C172A', color: '#ffffff', display: 'flex', flexDirection: 'column', height: '100%', borderRadius: '10px' }}>
            {article.urlToImage && (
                <CardMedia
                    component="img"
                    image={article.urlToImage}
                    alt={article.title}
                    sx={{ height: 200 }}
                />
            )}
            <CardContent sx={{  display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontSize: '17px', fontWeight: 'bold', textAlign: 'left' }}>
                    {article.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', marginTop: '5px'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        <AccessTimeIcon sx={{ marginRight: '4px', height: '20px' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', color: '#ffffff'}}>
                            {new Date(article.publishedAt).toLocaleDateString()}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ marginRight: '4px', height: '20px' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', color: '#ffffff'}}>
                            {article.author || 'Desconocido'}
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', color: '#ffffff', marginBottom: '10px', textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {article.description}
                </Typography>
                <Box sx={{ textAlign: 'center', marginTop: '10px', display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button variant="contained" sx={{ backgroundColor: '#E10AAB' }} href={article.url} target="_blank">
                        LEER MÁS
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default NewsCard;