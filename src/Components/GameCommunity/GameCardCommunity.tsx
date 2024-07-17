import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Avatar,
  IconButton,
  Chip,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import CommentIcon from "@mui/icons-material/Comment";
import { Publicacion, LikeDislike } from "../../store/reducers/PublicaionesReducer";
import axios from "axios";
const defaultUserIcon = "path/to/default/user/icon.png";

const GameCard: React.FC<{ publicacion: Publicacion }> = ({ publicacion }) => {
  const navigate = useNavigate();
  console.log(publicacion)
  console.log("ASDASD: ", publicacion.likesDislikes)
// Likes
  const initialLikes = Array.isArray(publicacion.likesDislikes)
  ? publicacion.likesDislikes.filter((ld) => ld.like === "L").length
  : 0;
  const [likes, setLikes] = useState<number>(initialLikes);
  const [liked, setLiked] = useState<boolean>(false);
  console.log(initialLikes)
  // Dislikes
  const initialDislikes = Array.isArray(publicacion.likesDislikes)
  ? publicacion.likesDislikes.filter((ld) => ld.like === "D").length
  : 0;
  const [dislikes, setDislikes] = useState<number>(initialDislikes);
  const [disliked, setDisliked] = useState<boolean>(false);

  // Comments
  const initialComments = Array.isArray(publicacion.comentarios)
  ? publicacion.comentarios.length
  : 0;
  const [commentsCount, setCommentsCount] = useState<number>(initialComments);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageAspectRatio, setImageAspectRatio] = useState<number>(1);

  const formattedDate = new Date(publicacion.fechaPublicacion).toLocaleDateString(
    "es-ES",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    }
  );
  
  useEffect(() => {
    setLikes(initialLikes);
    setDislikes(initialDislikes);
    setCommentsCount(initialComments);
  }, [publicacion, initialLikes, initialDislikes, initialComments]);

  const handleCardClick = () => {
    navigate(`/publicationdetails/${publicacion.id}`);
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(`https://localhost:7029/LikesDislikes/like/${publicacion.id}`, { like: "L" });
      const updatedLikesDislikes: LikeDislike[] = response.data;
      const newLikes = updatedLikesDislikes.filter((ld) => ld.like === "L").length;
      setLikes(newLikes);
      setLiked(true);

      // Update dislikes count if necessary
      if (disliked) {
        setDisliked(false);
        setDislikes(updatedLikesDislikes.filter((ld) => ld.like === "D").length);
      }
    } catch (error) {
      console.error("Error liking publication:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.post(`https://localhost:7029/LikesDislikes/dislike/${publicacion.id}`, { like: "D" });
      const updatedLikesDislikes: LikeDislike[] = response.data;
      const newDislikes = updatedLikesDislikes.filter((ld) => ld.like === "D").length;
      setDislikes(newDislikes);
      setDisliked(true);

      // Update likes count if necessary
      if (liked) {
        setLiked(false);
        setLikes(updatedLikesDislikes.filter((ld) => ld.like === "L").length);
      }
    } catch (error) {
      console.error("Error disliking publication:", error);
    }
  };


  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageLoaded(true);
    setImageAspectRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight);
  };

  const isVerticalImage = imageLoaded && imageAspectRatio < 1;

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
        <CardActionArea
          onClick={handleCardClick}
          sx={{ position: "relative", zIndex: 1 }}
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
              {/* <Typography variant="body2" sx={{ color: "#fff", fontSize: 14 }}>
                Publicado por {publicacion.authors} el {formattedDate}
              </Typography> */}
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
              {publicacion.titulo}
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
              dangerouslySetInnerHTML={{ __html: publicacion.descripcion }}
            />
            {publicacion.imagen && (
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
                      backgroundImage: `url(${publicacion.imagen})`,
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
                  image={publicacion.imagen}
                  alt={publicacion.titulo}
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
        </CardActionArea>
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
                "& .MuiChip-icon": { marginLeft: 0 },
              }}
            />
            <Chip
              icon={
                <IconButton sx={{ color: "white" }}>
                  <CommentIcon />
                </IconButton>
              }
              label={
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  {publicacion.commentsCount}
                </Typography>
              }
              sx={{
                backgroundColor: "#2C2839",
                color: "#fff",
                height: 40,
                "& .MuiChip-icon": { marginLeft: 0 },
              }}
            />
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};

export default GameCard;
