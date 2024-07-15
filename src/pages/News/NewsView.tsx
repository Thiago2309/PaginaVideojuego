import React, { useEffect, useState, useCallback, useRef, Suspense } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { getVideoGameNews } from "../../Api/newsApi";
import FooterView from "../../layout/Footer/FooterView";
import Navegador from "../../layout/Navegador/Navegador";
import { Article } from "../../Api/Types/index";

const NewsCard = React.lazy(() => import("../../Components/NewsGame/NewsCard"));

const NewsView: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver>();

  const fetchNews = useCallback(async (page: number) => {
    setLoading(true);
    const news = await getVideoGameNews(page);
    setArticles((prevArticles) => [...prevArticles, ...news]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNews(page);
  }, [page, fetchNews]);

  const lastArticleRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  return (
    <div>
      <Navegador />
      <Box
        sx={{
          padding: { xs: 2, sm: 3, md: 4, lg: 8, xl: 10 },
          pt: { xs: 2, sm: 3, md: 3, lg: 3, xl: 3 },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 45,
            textAlign: "left",
            marginBottom: "30px",
          }}
        >
          Noticias de videojuegos
        </Typography>
        <br />
        <Grid container spacing={3}>
          {articles.map((article, index) => {
            if (articles.length === index + 1) {
              return (
                <Grid item xs={12} sm={6} md={4} key={index} ref={lastArticleRef}>
                  <Suspense fallback={<CircularProgress />}>
                    <NewsCard article={article} />
                  </Suspense>
                </Grid>
              );
            } else {
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Suspense fallback={<CircularProgress />}>
                    <NewsCard article={article} />
                  </Suspense>
                </Grid>
              );
            }
          })}
        </Grid>
        {loading && <CircularProgress />}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          marginTop: "1rem",
          justifyContent: "center",
        }}
      >
        {FooterView()}
      </Box>
    </div>
  );
};

export default NewsView;
