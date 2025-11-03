import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()

  const linkBase =
    "text-sm font-medium text-neutral-300 hover:text-white transition"
  const active = ({ isActive }) =>
    isActive ? "text-white" : ""

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur">
      <nav className="max-w-6xl mx-auto h-14 px-4 flex items-center gap-6">
        {/* Marca */}
        <Link to="/" className="font-extrabold tracking-wide text-red-500">
          LA SEDE APP
        </Link>

        {/* Links de usuario */}
        {user && (
          <div className="hidden md:flex items-center gap-4">
            <NavLink to="/perfil" className={({isActive}) => `${linkBase} ${active({isActive})}`}>Perfil</NavLink>
            <NavLink to="/cuotas" className={({isActive}) => `${linkBase} ${active({isActive})}`}>Cuotas</NavLink>
            <NavLink to="/canchas" className={({isActive}) => `${linkBase} ${active({isActive})}`}>Canchas</NavLink>
            <NavLink to="/clases" className={({isActive}) => `${linkBase} ${active({isActive})}`}>Clases</NavLink>
            <NavLink to="/entradas" className={({isActive}) => `${linkBase} ${active({isActive})}`}>Entradas</NavLink>
            <NavLink to="/mis-actividades" className={({isActive}) => `${linkBase} ${active({isActive})}`}>
              Mis actividades
            </NavLink>

            {user.rol === 'admin' && (
              <NavLink to="/admin" className={({isActive}) => `${linkBase} ${active({isActive})} text-amber-400`}>
                Admin
              </NavLink>
            )}
          </div>
        )}

        {/* Login / Logout */}
        <div className="ml-auto flex items-center">
          {!user ? (
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-md bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 text-sm font-medium transition"
            >
              Salir
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
