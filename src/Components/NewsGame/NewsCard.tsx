import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Article } from '../../Api/Types/index';

interface NewsCardProps {
    article: Article;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 'auto', backgroundColor: '#1C172B', color: '#ffffff' }}>
            {article.urlToImage && (
                <CardMedia
                    component="img"
                    height="140"
                    image={article.urlToImage}
                    alt={article.title}
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily: 'TuTipografía' }}>
                    {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'TuTipografía', color: '#ffffff' }}>
                    {article.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NewsCard;
