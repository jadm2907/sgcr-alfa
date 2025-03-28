interface User {
    // Define las propiedades de tu objeto User aquí
    id: string;
    username: string;
    email: string;
    // ... otras propiedades
  }
  
  interface SidenavProps {
    color: string;
    brand: string;
    routes: any[];
    transparent: boolean;
    white: boolean;
    miniSidenav: boolean;
    darkMode: boolean;
    sidenavType: string;
    mobileView: boolean;
    user?: User | null; // Added the user property
  }