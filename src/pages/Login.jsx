import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Alert from '../components/ui/Alert'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { Mail, Lock, LogIn } from 'lucide-react'

// Notas:
// Puse componentes por default reutilizables
// El link del admin hace el set para las credeniciales del admin para el test, desp debemos cambiar esto por el de Registrarse
// Included algunas validaciones para el form, pero cuando haya backend se deben agregar las validaciones del backend
// 

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('socio@aj.com')
  const [password, setPassword] = useState('socio')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = { email: '', password: '' }

    if (!email) {
      newErrors.email = 'El correo electrónico es requerido'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El correo electrónico no es válido'
      isValid = false
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida'
      isValid = false
    } else if (password.length < 5) {
      newErrors.password = 'La contraseña debe tener al menos 5 caracteres'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      await login(email, password)
      navigate('/perfil')
    } catch (err) { 
      setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-900 to-neutral-800 
                    flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-neutral-800/80 backdrop-blur-sm rounded-xl shadow-2xl 
                        overflow-hidden border border-neutral-700/50">
          {/* Header */}
          <div className="bg-neutral-900/80 px-8 py-6 border-b border-neutral-700/50">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <LogIn className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Iniciar sesión</h1>
            </div>
            <p className="text-center mt-2 text-neutral-400">Ingresá a tu cuenta</p>
          </div>

          {/* Form */}
          <div className="px-8 py-6">
            {error && (
              <div className="mb-4">
                <Alert type="error" message={error} />
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                  Correo electrónico
                </label>
                <div className="relative">
                  <div className="absolute top-0 left-0 h-full pl-3 flex items-center pointer-events-none z-10">
                    <Mail className="h-5 w-5 text-neutral-500" />
                  </div>
                  <Input
                    label=""
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) {
                        setErrors({...errors, email: ''})
                      }
                    }}
                    error={errors.email}
                    className="pl-10"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute top-0 left-0 h-full pl-3 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-neutral-500" />
                  </div>
                  <Input
                    label=""
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) {
                        setErrors({...errors, password: ''})
                      }
                    }}
                    error={errors.password}
                    className="pl-10"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Iniciando sesión...
                  </>
                ) : 'Iniciar sesión'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <button
                onClick={() => {
                  setEmail('admin@aj.com')
                  setPassword('admin')
                  setErrors({ email: '', password: '' })
                }}
                className="text-red-400 hover:text-red-300 font-medium transition-colors"
              > 
                Acceso rápido para administradores
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}