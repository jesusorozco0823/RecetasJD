export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Location; // Otra interfaz para `origin`
    location: Location; // Otra interfaz para `location`
    image: string;
    episode: string[]; // Una lista de URLs de episodios
    url: string;
    created: string; // Fecha en formato ISO
  }
  
  export interface Location {
    name: string;
    url: string; // URL asociada con el lugar
  }
  