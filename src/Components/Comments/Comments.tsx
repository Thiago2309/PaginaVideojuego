// Ruta: src/components/Comments/Comments.tsx

import React, { useState, useRef  } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Estilos por defecto de react-quill
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";

interface Comment {
  id: number;
  text: string;
  author: string;
  date: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (content: string) => {
    setNewComment(content);
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
      author: "Usuario", // Cambiar por el nombre del usuario actual
      date: date,
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <Card variant="outlined" sx={{ backgroundColor: "#2C2839", mt: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: "#ffffff" }}>
          Comentarios
        </Typography>
        {comments.map((comment) => (
          <Box key={comment.id} sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ color: "#ffffff" }}>
              <strong>{comment.author}</strong> - {comment.date}
            </Typography>
            <Typography variant="body2" sx={{ color: "#ffffff" }}>
              {comment.text}
            </Typography>
          </Box>
        ))}
        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <Avatar sx={{ bgcolor: "#E10AAB", borderRadius: "3px", mr: 2 }}>
            U
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <ReactQuill
              theme="snow"
              value={newComment}
              onChange={handleCommentChange}
              style={{ width: "100%" }} // Ajusta el ancho del ReactQuill según sea necesario
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 1, float: "right" }}
          onClick={handleAddComment}
        >
          Comentar
        </Button>
      </CardContent>
    </Card>
  );
};

export default Comments;
