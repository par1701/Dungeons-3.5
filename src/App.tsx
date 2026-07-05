import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharacterListPage from "./pages/CharacterListPage";
import CharacterWizardPage from "./pages/CharacterWizardPage";
import CharacterSheetPage from "./pages/CharacterSheetPage";

function App() {
  return (
    <>
      <header className="app-header no-print">
        <div className="app-header-inner">
          <NavLink to="/" className="app-title">
            Creador D&amp;D 3.5
          </NavLink>
          <nav className="app-nav">
            <NavLink to="/" end>
              Inicio
            </NavLink>
            <NavLink to="/personajes">Mis personajes</NavLink>
            <NavLink to="/personajes/nuevo">Crear personaje</NavLink>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/personajes" element={<CharacterListPage />} />
          <Route path="/personajes/nuevo" element={<CharacterWizardPage />} />
          <Route path="/personajes/:id/editar" element={<CharacterWizardPage />} />
          <Route path="/personajes/:id/hoja" element={<CharacterSheetPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
