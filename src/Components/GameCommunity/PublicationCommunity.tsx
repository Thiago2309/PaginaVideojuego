import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Box, Typography, Button, Card, CardContent, Avatar, TextField, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/global.css";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../store/store";
import {
  fetchPublicacionesStart,
  fetchPublicacionesSuccess,
  fetchPublicacionesFailure,
  updateComentarios,
  updateLikesDislikes,
  Publicacion,
} from "../../store/reducers/PublicaionesReducer";

interface PublicationsProps {
  onPublicationAdded: () => void;
}
const Publications: React.FC<PublicationsProps> = ({ onPublicationAdded }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [mostrarEditor, setMostrarEditor] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const user = useSelector((state: RootState) => state.user); 
  const isLoggedIn = !!user.id;
  
  const handleTextFieldFocus = () => {
    setMostrarEditor(true);
  };

  const handleAddPublication = async () => {
    if (!isLoggedIn) {
      setOpenAlert(true);
      return;
    }

    if (newTitle.trim() === "" || newContent.trim() === "") return;

    const { cleanContent, image } = extractContentAndImage(newContent);

    const publicationData = {
      userId: user.id,
      titulo: newTitle,
      descripcion: cleanContent,
      imagen: image || "", 
      fechaPublicacion: new Date().toISOString(),
    };

    try {
      await axios.post("https://localhost:7029/Publicaciones/RegistrarPublicacion", publicationData);
      setNewTitle("");
      setNewContent("");
      setMostrarEditor(false);
      onPublicationAdded();
      dispatch(fetchPublicacionesStart());
    } catch (error) {
      console.error("Error al publicar la publicación:", error);
    }
  };

  const handleCancel = () => {
    setNewTitle("");
    setNewContent("");
    setMostrarEditor(false);
  };

  useEffect(() => {
    if (mostrarEditor && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
      });

      const style = document.createElement('style');
      style.innerHTML = `
        .ql-snow .ql-stroke {
          stroke: white;
        }
        .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill {
          fill: white;
        }
      `;
      document.head.appendChild(style);

      quillRef.current.on('text-change', () => {
        setNewContent(quillRef.current?.root.innerHTML || '');
      });
    }
  }, [mostrarEditor]);

  const extractContentAndImage = (content: string) => {
    const div = document.createElement("div");
    div.innerHTML = content;
    const img = div.querySelector("img");
    const imageUrl = img ? img.src : null;
    if (img) {
      img.remove();
    }
    return { cleanContent: div.innerHTML, image: imageUrl };
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "transparent",
          border: "none",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <CardContent
          sx={{
            padding: 0,
            paddingBottom: 0,
            "&:last-child": {
              paddingBottom: 0,
            },
          }}
        >
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
                    padding: "16px",
                    pt: "30px",
                    pb: "30px",
                  }}
                  onClick={handleTextFieldFocus}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#ffffff", textAlign: "left" }}
                  >
                    Agregar nueva publicación...
                  </Typography>
                </Box>
              </Box>
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
                <Box sx={{ flexGrow: 1, minWidth: 0, borderRadius: "3px" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Título"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    sx={{
                      mb: 2,
                      borderRadius: "3px",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#ccc",
                        },
                        "&:hover fieldset": {
                          borderColor: "#fff",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#fff",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "#fff",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        color: "#fff",
                        opacity: 1,
                      },
                    }}
                    InputProps={{
                      style: { color: '#fff' },
                    }}
                  />
                  <Box
                    sx={{
                      borderRadius: "3px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <div ref={editorRef} />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    mr: 1,
                    mt: 1,
                    float: "right",
                  }}
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    mt: 1,
                    float: "right",
                  }}
                  onClick={handleAddPublication}
                >
                  Publicar
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/login')}>
              Iniciar sesión
            </Button>
          }
          onClose={() => setOpenAlert(false)}
        >
          Debes logearte para poder publicar
        </Alert>
      </Snackbar>
    </>
  );
};

export default Publications;
