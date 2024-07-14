export interface VideoGame {
    id: number;
    nombre: string;
    descripcion: string;
    calificacion: number;
    foto_url: string;
    genero: string;
    plataforma: string;
    fecha_lanzamiento: string;
    desarrollador: string;
    editor: string;
};

export interface VideoGameFormProps {
    initialData: VideoGame | null;
    onClose: () => void;
    setVideojuegos: React.Dispatch<React.SetStateAction<VideoGame[]>>;
    videojuegos: VideoGame[];
};
