import React from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

interface SortOptionsProps {
  sort: string;
  setSort: (sort: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ sort, setSort }) => {
  
  return (
    <Box display="flex" alignItems="center" sx={{ maxWidth: "100%" }}>
      <Typography
        variant="body1"
        sx={{
          mr: 2,
          fontWeight: "bold",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100px", // Ajusta este valor según sea necesario
          // display: { xs: 'none', md: 'block' } // Ocultar en modo móvil
        }}
      >
        Ordenar por
      </Typography>
      <FormControl
        variant="outlined"
        size="small"
        sx={{
          minWidth: "150px", // Establece un ancho mínimo para el Select
          maxWidth: "200px", // Establece un ancho máximo para el Select
          "& .MuiOutlinedInput-input": {
            whiteSpace: "normal !important", // Forzar whiteSpace: normal
          },
          "& .MuiOutlinedInput-root": {
            color: "white", // Color del texto
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Color del borde al pasar el mouse
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Color del borde cuando está enfocado
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Color del borde por defecto
            },
          },
          "& .MuiSvgIcon-root": {
            color: "white", // Color de la flecha
          },
        }}
      >
        <Select
          value={sort}
          onChange={(e: SelectChangeEvent) => setSort(e.target.value as string)}
          displayEmpty
          sx={{
            maxWidth: "100%", // Asegura que el contenido del select no desborde su contenedor
            whiteSpace: "normal", // Forzar whiteSpace: normal
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxWidth: "200px", // Ancho máximo del menú desplegable
                overflowWrap: "break-word", // Permite que el texto largo se ajuste
              },
            },
          }}
        >
          <MenuItem
            value="title-asc"
            sx={{
              whiteSpace: "normal", // Forzar whiteSpace: normal
              wordBreak: "break-word",
              maxWidth: "200px", // Ajusta este valor según sea necesario
            }}
          >
            Título A-Z
          </MenuItem>
          <MenuItem
            value="title-desc"
            sx={{
              whiteSpace: "normal", // Forzar whiteSpace: normal
              wordBreak: "break-word",
              maxWidth: "200px", // Ajusta este valor según sea necesario
            }}
          >
            Título Z-A
          </MenuItem>
          <MenuItem
            value="releaseDate-asc"
            sx={{
              whiteSpace: "normal", // Forzar whiteSpace: normal
              wordBreak: "break-word",
              maxWidth: "200px", // Ajusta este valor según sea necesario
            }}
          >
            Fecha Ascendente
          </MenuItem>
          <MenuItem
            value="releaseDate-desc"
            sx={{
              whiteSpace: "normal", // Forzar whiteSpace: normal
              wordBreak: "break-word",
              maxWidth: "200px", // Ajusta este valor según sea necesario
            }}
          >
            Fecha Descendente
          </MenuItem>
          <MenuItem
            value="likes-asc"
            sx={{
              whiteSpace: "normal", // Forzar whiteSpace: normal
              wordBreak: "break-word",
              maxWidth: "200px", // Ajusta este valor según sea necesario
            }}
          >
            Likes Ascendente
          </MenuItem>
          <MenuItem
            value="likes-desc"
            sx={{
              whiteSpace: "normal", // Forzar whiteSpace: normal
              wordBreak: "break-word",
              maxWidth: "200px", // Ajusta este valor según sea necesario
            }}
          >
            Likes Descendente
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortOptions;
