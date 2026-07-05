import { Link } from "react-router-dom";
import { SOURCE_BOOKS } from "../data/sourcebooks";

export default function HomePage() {
  return (
    <div>
      <h1>Creador de personajes de Dungeons &amp; Dragons 3.5</h1>
      <p className="muted" style={{ marginBottom: 24 }}>
        Crea, guarda, exporta e imprime personajes de D&amp;D 3.5 usando el SRD y, próximamente,
        los libros Complete, el Player's Handbook II y el Dungeon Master's Guide II.
      </p>

      <div className="grid grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <h2>Crear un personaje</h2>
          <p className="muted">Asistente paso a paso: raza, clase, características, dotes, conjuros y equipo.</p>
          <Link to="/personajes/nuevo" className="btn btn-primary">
            Empezar
          </Link>
        </div>
        <div className="card">
          <h2>Mis personajes</h2>
          <p className="muted">Consulta, edita, exporta/importa y genera la hoja de personaje en PDF.</p>
          <Link to="/personajes" className="btn">
            Ver personajes
          </Link>
        </div>
      </div>

      <div className="card">
        <h2>Libros de origen</h2>
        <p className="muted">Contenido activable como reglas variantes al crear un personaje.</p>
        <table className="data-table">
          <thead>
            <tr>
              <th>Libro</th>
              <th>Descripción</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {SOURCE_BOOKS.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.description}</td>
                <td>
                  {book.implemented ? (
                    <span className="tag">Disponible</span>
                  ) : (
                    <span className="muted">Próximamente</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
