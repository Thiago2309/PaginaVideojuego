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
          maxWidth: "100px",
        }}
      >
        Ordenar por
      </Typography>
      <FormControl
        variant="outlined"
        size="small"
        sx={{
          minWidth: "150px",
          maxWidth: "200px",
          "& .MuiOutlinedInput-input": {
            whiteSpace: "normal !important",
          },
          "& .MuiOutlinedInput-root": {
            color: "white",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
      >
        <Select
          value={sort}
          onChange={(e: SelectChangeEvent) => setSort(e.target.value as string)}
          displayEmpty
          sx={{
            maxWidth: "100%",
            whiteSpace: "normal",
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                maxWidth: "200px",
                overflowWrap: "break-word",
              },
            },
          }}
        >
          <MenuItem
            value="nombre-asc"
            sx={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              maxWidth: "200px",
            }}
          >
            Nombre A-Z
          </MenuItem>
          <MenuItem
            value="nombre-desc"
            sx={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              maxWidth: "200px",
            }}
          >
            Nombre Z-A
          </MenuItem>
          <MenuItem
            value="fecha_Lanzamiento-asc"
            sx={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              maxWidth: "200px",
            }}
          >
            Fecha Ascendente
          </MenuItem>
          <MenuItem
            value="fecha_Lanzamiento-desc"
            sx={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              maxWidth: "200px",
            }}
          >
            Fecha Descendente
          </MenuItem>
          <MenuItem
            value="calificacion-asc"
            sx={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              maxWidth: "200px",
            }}
          >
            Calificación Ascendente
          </MenuItem>
          <MenuItem
            value="calificacion-desc"
            sx={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              maxWidth: "200px",
            }}
          >
            Calificación Descendente
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortOptions;
