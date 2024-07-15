import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea, Box, Avatar, IconButton, Chip, CardActions } from "@mui/material";
import { CommunityGame, communitygame } from "../dataCommunity";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import CommentIcon from "@mui/icons-material/Comment";

const defaultUserIcon = "path/to/default/user/icon.png";

interface PublicationsProps {
  handleBackClick: () => void;
  publicationId: number;
}

const Publications: React.FC<PublicationsProps> = ({ handleBackClick, publicationId }) => {
  const [publication, setPublication] = useState<CommunityGame | undefined>(undefined);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);

  useEffect(() => {
    const pub = communitygame.find(pub => pub.id === publicationId);
    if (pub) {
      setPublication(pub);
      setLikes(pub.likes);
      setDislikes(pub.dislikes);
    }
  }, [publicationId]);

  const formattedDate = publication ? new Date(publication.releaseDate).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }) : "";

  const handleLike = () => {
    setLiked(!liked);
    setDisliked(false);

    setLikes(prev => (liked ? prev - 1 : prev + 1));
    if (disliked) {
      setDislikes(prev => prev - 1);
    }
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    setLiked(false);

    setDislikes(prev => (disliked ? prev - 1 : prev + 1));
    if (liked) {
      setLikes(prev => prev - 1);
    }
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageLoaded(true);
    setImageAspectRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight);
  };

  const isVerticalImage = imageLoaded && imageAspectRatio < 1;

  if (!publication) {
    return <Typography variant="h6" color="error">Publicación no encontrada</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Card
        sx={{
          maxWidth: "100%",
          width: "100%",
          backgroundColor: "#1C172B",
          boxShadow: "none",
          borderRadius: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
          <CardContent
            sx={{
              backgroundColor: "transparent",
              pr: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
              pl: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
              pt: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
              pb: 0, // Remove bottom padding
            }}
          >
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar
                src={defaultUserIcon}
                alt="User Icon"
                sx={{ width: 30, height: 30, mr: 1 }}
              />
              <Typography variant="body2" sx={{ color: "#fff", fontSize: 14 }}>
                Publicado por {publication.authors} el {formattedDate}
              </Typography>
            </Box>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 36,
                textAlign: "left",
                marginBottom: 1,
              }}
            >
              {publication.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#fff",
                textAlign: "left",
                marginBottom: 2,
                fontSize: 18,
                overflow: "hidden",
              }}
              dangerouslySetInnerHTML={{ __html: publication.description }}
            />
            {publication.image && (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 300, sm: 400, md: 540 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {imageLoaded && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${publication.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "blur(20px)",
                      zIndex: 0,
                      display: "block",
                    }}
                  />
                )}
                <CardMedia
                  component="img"
                  image={publication.image}
                  alt={publication.title}
                  onLoad={handleImageLoad}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "100%",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </Box>
            )}
          </CardContent>
          <CardActions
          sx={{
            backgroundColor: "transparent",
            pr: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
            pl: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
            pb: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
            pt: { xs: 2, sm: 3, md: 3, lg: 3, xl: 3 },
          }}
        >
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent={{ xs: "center", sm: "space-between" }}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <Chip
              icon={
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                  sx={{ color: liked ? "#E10AAB !important" : "white" }}
                >
                  {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                </IconButton>
              }
              label={
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="body2"
                    sx={{ color: "#fff", marginRight: 1 }}
                  >
                    {likes}
                  </Typography>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDislike();
                    }}
                    sx={{ color: disliked ? "#E10AAB" : "white" }}
                  >
                    {disliked ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />}
                  </IconButton>
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    {dislikes}
                  </Typography>
                </Box>
              }
              sx={{
                backgroundColor: "#2C2839",
                color: "#fff",
                height: 40,
                marginBottom: { xs: 1, sm: 0 },
                marginRight: { xs: 0, sm: 1 },
                "& .MuiChip-icon": {
                  color: "white",
                  marginLeft: "10px",
                  paddingRight: "8px",
                },
                "& .MuiChip-label": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "auto",
                  paddingLeft: "8px",
                  paddingRight: "10px",
                },
              }}
            />
            {/* <Chip
              icon={<CommentIcon sx={{ color: "white" }} />}
              label={`${communitygame.comment}`}
              sx={{
                backgroundColor: "#2C2839",
                color: "#fff",
                height: 40,
                marginLeft: { xs: 0, sm: 1 },
                "& .MuiChip-icon": {
                  color: "white",
                  marginLeft: "10px",
                },
                "& .MuiChip-label": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "auto",
                  paddingRight: "10px",
                },
              }}
              onClick={(e) => e.stopPropagation()}
            /> */}
          </Box>
        </CardActions>

      </Card>
    </Box>
  );
};

export default Publications;
