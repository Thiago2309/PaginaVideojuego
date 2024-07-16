export interface Offerts {
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
    precio: number;
    descuento: number;
    link: string;
};

export interface OffertsFormProps {
    initialData: Offerts | null;
    onClose: () => void;
    setOfertas: React.Dispatch<React.SetStateAction<Offerts[]>>;
    ofertas: Offerts[];
};
