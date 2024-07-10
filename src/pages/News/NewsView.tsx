import React, { useEffect, useState, Suspense } from 'react';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import { getVideoGameNews } from '../../Api/newsApi';
import FooterView from '../../layout/Footer/FooterView';
import Navegador from '../../layout/Navegador/Navegador';
import { Article } from '../../Api/Types/index';

const NewsCard = React.lazy(() => import('../../Components/NewsGame/NewsCard'));

const NewsView: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            const news = await getVideoGameNews();
            setArticles(news);
            setLoading(false);
        };

        fetchNews();
    }, []);

    return (
        <div>
            <Navegador />
            <Typography
                variant="h4"
                sx={{
                    textAlign: 'center',
                    margin: '20px 0',
                    fontFamily: 'TuTipografía',
                    color: '#ffffff',
                }}
            >
                Noticias Recientes de Videojuegos
            </Typography>
            <br />
            <Suspense fallback={<CircularProgress />}>
                <Grid container spacing={3}>
                    {articles.map((article, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <NewsCard article={article} />
                        </Grid>
                    ))}
                </Grid>
            </Suspense>
            <Box
                sx={{
                    display: 'flex',
                    gap: '1rem',
                    marginTop: '1rem',
                    justifyContent: 'center',
                }}
            >
                {FooterView()}
            </Box>
        </div>
    );
};

export default NewsView;
