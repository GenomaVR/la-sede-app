import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('socio@aj.com')
  const [password, setPassword] = useState('socio')
  const [error, setError] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()
    setError(null)
    try {
      login(email, password)
      nav('/perfil')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    // Full pantalla visible (descontando tu navbar overlay de 56px)
    <div className="relative h-[100svh] w-full overflow-hidden">
      {/* Fondo opcional (podés borrar si no querés imagen acá) */}
      <img
        src="/images/bg-aj.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />

      {/* Contenido centrado */}
      <div className="relative h-full flex items-center justify-center px-4 pt-20">
        <div className="neon-card bg-neutral-950/70 backdrop-blur-md border border-neutral-800 rounded-2xl p-6 sm:p-8 w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-center text-neutral-400">
            Portal del socio · La Sede <span className="text-red-500 font-semibold">APP</span>
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Email</label>
              <input
                className="w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="socio@aj.com"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm text-neutral-300 mb-1">Password</label>
              <input
                type="password"
                className="w-full rounded-md bg-neutral-900 border border-neutral-800 px-3 py-2 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              className="w-full mt-2 rounded-md bg-red-600 text-white font-medium px-4 py-2.5 hover:bg-red-700 transition"
            >
              Ingresar
            </button>

            <p className="text-xs text-neutral-500 text-center mt-2">
              Admin: <span className="text-neutral-300">admin@aj.com</span> / <span className="text-neutral-300">admin</span>
            </p>
            <p className="text-xs text-neutral-500 text-center mt-2">
             <span className="text-neutral-300">Solo para test luego los datos de admin no aparece</span> 
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
