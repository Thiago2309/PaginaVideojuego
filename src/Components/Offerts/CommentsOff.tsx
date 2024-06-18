import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
} from "@mui/material";
import "../../assets/styles/global.css";

interface Comment {
  id: number;
  text: string;
  author: string;
  date: string;
}

const CommentsOff: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [mostrarEditor, setMostrarEditor] = useState(false);
  const editorRef = useRef<ReactQuill>(null);
  const [liked, setLiked] = useState(false);
  const [likedComments, setLikedComments] = useState<{
    [key: number]: boolean;
  }>({});
  const [dislikedComments, setDislikedComments] = useState<{
    [key: number]: boolean;
  }>({});

  const handleLikeClick = () => {
    setLiked(!liked);
  };
  const handleLikeComment = (id: number) => {
    setLikedComments((prev) => ({ ...prev, [id]: !prev[id] }));
    setDislikedComments((prev) => ({ ...prev, [id]: false }));
  };

  const handleDislikeComment = (id: number) => {
    setDislikedComments((prev) => ({ ...prev, [id]: !prev[id] }));
    setLikedComments((prev) => ({ ...prev, [id]: false }));
  };

  const handleCommentChange = (content: string) => {
    setNewComment(content);
  };

  const handleTextFieldFocus = () => {
    setMostrarEditor(true);
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const comment: Comment = {
      id: comments.length + 1,
      text: newComment,
      author: "Usuario",
      date: date,
    };

    setComments([...comments, comment]);
    setNewComment("");
    setMostrarEditor(false);
  };

  useEffect(() => {
    if (mostrarEditor && editorRef.current) {
      editorRef.current.focus();
    }
  }, [mostrarEditor]);

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
          19 Comments
        </Typography>
        <Divider sx={{ backgroundColor: "#ffffff", mb: 1 }} />
        {!mostrarEditor && (
          <>
            <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start" }}>
              <Avatar
                sx={{
                  bgcolor: "#E10AAB",
                  width: 35,
                  height: 35,
                  borderRadius: "3px",
                  mr: 2,
                }}
              >
                U
              </Avatar>
              <Box
                sx={{
                  flexGrow: 1,
                  minWidth: 0,
                  cursor: "pointer",
                  border: "2px solid #ccc",
                  borderRadius: "3px",
                  padding: "8px",
                }}
                onClick={handleTextFieldFocus}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#ffffff", textAlign: "left" }}
                >
                  Añadir un comentario...
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ backgroundColor: "#ffffff", mt: 2, mb: 1 }} />
          </>
        )}

        {mostrarEditor && (
          <>
            <Box sx={{ mt: 2, display: "flex", alignItems: "flex-start" }}>
              <Avatar
                sx={{
                  bgcolor: "#E10AAB",
                  width: 35,
                  height: 35,
                  borderRadius: "3px",
                  mr: 2,
                }}
              >
                U
              </Avatar>
              <Box
                sx={{
                  flexGrow: 1,
                  minWidth: 0,
                  borderRadius: "3px",
                  border: "1px solid #ccc",
                  "& .ql-toolbar .ql-formats .ql-picker-item svg": {
                    fill: "#ffffff",
                  },
                }}
              >
                <ReactQuill
                  theme="snow"
                  value={newComment}
                  onChange={handleCommentChange}
                  modules={{
                    toolbar: [
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link"],
                      ["clean"],
                    ],
                  }}
                  style={{ width: "100%" }}
                  ref={editorRef}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <Button
                variant="contained"
                sx={{
                  mt: 1,
                  float: "right",
                  bgcolor: "#E10AAB",
                  "&:hover": { bgcolor: "#E10AAB" },
                }}
                onClick={handleAddComment}
              >
                Comentar
              </Button>
            </Box>
            <Divider sx={{ backgroundColor: "#ffffff", mt: 2, mb: 1 }} />
          </>
        )}
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          {liked ? (
            <FavoriteIcon
              sx={{
                color: "#E10AAB",
                mr: 1,
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={handleLikeClick}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{
                color: "#ffffff",
                mr: 1,
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={handleLikeClick}
            />
          )}
          <Typography variant="body2" sx={{ color: "#ffffff" }}>
            23
          </Typography>
        </Box>

        {comments.map((comment) => (
          <Box
            key={comment.id}
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#E10AAB",
                width: 35,
                height: 35,
                borderRadius: "3px",
                mr: 2,
              }}
            >
              U
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                sx={{ color: "#ffffff", fontWeight: "bold", fontSize: 13 }}
              >
                {comment.author}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#C7BEBE", fontSize: 10, fontWeight: "medium" }}
              >
                {comment.date}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#ffffff",
                  fontSize: 13,
                  mt: 1,
                  "& p": {
                    margin: 0,
                  },
                }}
                dangerouslySetInnerHTML={{ __html: comment.text }}
              />
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                {likedComments[comment.id] ? (
                  <ThumbUpIcon
                    sx={{
                      color: "#ffffff",
                      mr: 1,
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleLikeComment(comment.id)}
                  />
                ) : (
                  <ThumbUpOffAltIcon
                    sx={{
                      color: "#ffffff",
                      mr: 1,
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleLikeComment(comment.id)}
                  />
                )}
                {dislikedComments[comment.id] ? (
                  <ThumbDownIcon
                    sx={{
                      color: "#ffffff",
                      mr: 1,
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDislikeComment(comment.id)}
                  />
                ) : (
                  <ThumbDownOffAltIcon
                    sx={{
                      color: "#ffffff",
                      mr: 1,
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDislikeComment(comment.id)}
                  />
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default CommentsOff;
