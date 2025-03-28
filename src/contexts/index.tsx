import React, { createContext, useContext, useState } from 'react';

interface IMaterialUIController {
  dispatch(dispatch: any, arg1: boolean): unknown;
  // Propiedades existentes
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  sidenavColor: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark';
  transparentSidenav: boolean;
  whiteSidenav: boolean;
  sidenavType: 'dark' | 'light' | 'white';
  darkMode: boolean;
  miniSidenav: boolean;
  fixedSidenav: boolean;
  layout: 'dashboard' | 'page';
  
  // Métodos existentes
  setTransparentNavbar: (value: boolean) => void;
  setFixedNavbar: (value: boolean) => void;
  setSidenavColor: (color: IMaterialUIController['sidenavColor']) => void;
  setTransparentSidenav: (value: boolean) => void;
  setWhiteSidenav: (value: boolean) => void;
  setSidenavType: (type: IMaterialUIController['sidenavType']) => void;
  setDarkMode: (value: boolean) => void;
  
  // Nuevos métodos
  setMiniSidenav: (value: boolean) => void;
  setFixedSidenav: (value: boolean) => void;
  setLayout: (value: IMaterialUIController['layout']) => void;
}

const MaterialUIControllerContext = createContext<IMaterialUIController | null>(null);

export const MaterialUIControllerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estados existentes
  const [transparentNavbar, setTransparentNavbar] = useState(true);
  const [fixedNavbar, setFixedNavbar] = useState(false);
  const [sidenavColor, setSidenavColor] = useState<IMaterialUIController['sidenavColor']>('primary');
  const [transparentSidenav, setTransparentSidenav] = useState(false);
  const [whiteSidenav, setWhiteSidenav] = useState(false);
  const [sidenavType, setSidenavType] = useState<IMaterialUIController['sidenavType']>('dark');
  const [darkMode, setDarkMode] = useState(false);
  
  // Nuevos estados
  const [miniSidenav, setMiniSidenav] = useState(false);
  const [fixedSidenav, setFixedSidenav] = useState(true);
  const [layout, setLayout] = useState<IMaterialUIController['layout']>('dashboard');

  return (
    <MaterialUIControllerContext.Provider
      value={{
        // Estados
        transparentNavbar,
        fixedNavbar,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        sidenavType,
        darkMode,
        miniSidenav,
        fixedSidenav,
        layout,
        
        // Métodos
        setTransparentNavbar,
        setFixedNavbar,
        setSidenavColor,
        setTransparentSidenav,
        setWhiteSidenav,
        setSidenavType,
        setDarkMode,
        setMiniSidenav,
        setFixedSidenav,
        setLayout,
      }}
    >
      {children}
    </MaterialUIControllerContext.Provider>
  );
};

export const useMaterialUIController = () => {
  const context = useContext(MaterialUIControllerContext);
  if (!context) {
    throw new Error('useMaterialUIController must be used within a MaterialUIControllerProvider');
  }
  return context;
};

// Exportar acciones específicas para facilitar su uso
export const setMiniSidenav = (dispatch: React.Dispatch<React.SetStateAction<IMaterialUIController>>, value: boolean) => 
  dispatch(prev => ({ ...prev, miniSidenav: value }));

export const setTransparentSidenav = (dispatch: React.Dispatch<React.SetStateAction<IMaterialUIController>>, value: boolean) => 
  dispatch(prev => ({ ...prev, transparentSidenav: value }));

export const setSidenavType = (dispatch: React.Dispatch<React.SetStateAction<IMaterialUIController>>, type: 'dark' | 'light' | 'white') => 
  dispatch(prev => ({ ...prev, sidenavType: type }));

export const setLayout = (dispatch: React.Dispatch<React.SetStateAction<IMaterialUIController>>, value: 'dashboard' | 'page') => 
  dispatch(prev => ({ ...prev, layout: value }));