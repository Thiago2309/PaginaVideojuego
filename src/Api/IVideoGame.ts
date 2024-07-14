export interface VideoGame {
    id: number;
    nombre: string;
    descripcion: string;
    calificacion: number;
    foto_Url: string;
    genero: string;
    plataforma: string;
    fecha_Lanzamiento: string;
    desarrollador: string;
    editor: string;
    userId: number;
};

export interface VideoGameFormProps {
    initialData: VideoGame | null;
    onClose: () => void;
    setVideojuegos: React.Dispatch<React.SetStateAction<VideoGame[]>>;
    videojuegos: VideoGame[];
};
