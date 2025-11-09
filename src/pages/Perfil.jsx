import Container from '../components/Container'
import { useAuth } from '../context/AuthContext'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import PageHeader from '../components/layout/PageHeader'

export default function Perfil() {
  const { user, state } = useAuth()
  const socio = state.usuarios.find(u => u.id === user.id)

  return (
    <Container>
      <PageHeader title="Mi Perfil" />
      
      <Card>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-400">Nombre completo</label>
            <p className="text-lg text-white mt-1">
              {socio.nombre} {socio.apellido}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-400">Email</label>
            <p className="text-lg text-white mt-1">{socio.email}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-400">Rol</label>
            <div className="mt-1">
              <Badge variant={socio.rol === 'admin' ? 'info' : 'default'}>
                {socio.rol}
              </Badge>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-400">Estado de cuota</label>
            <div className="mt-1">
              {socio.cuota?.estado === 'paga' ? (
                <Badge variant="success">
                  Paga ({socio.cuota.mes}/{socio.cuota.anio})
                </Badge>
              ) : (
                <Badge variant="warning">Pendiente</Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Container>
  )
}