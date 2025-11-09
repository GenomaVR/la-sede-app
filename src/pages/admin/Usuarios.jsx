import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'
import Container from '../../components/Container'
import Table from '../../components/ui/Table'
import Button from '../../components/ui/Button'

export default function Usuarios() {
  const { state } = useAuth()
  const { admin } = useData()

  const headers = ['Nombre', 'Email', 'Rol', 'Activo', 'Acciones']
  
  const rows = state.usuarios.map(u => [
    `${u.nombre} ${u.apellido}`,
    u.email,
    u.rol,
    u.activo ? 'Sí' : 'No',
    <Button 
      key={u.id}
      variant="secondary" 
      size="sm"
      onClick={() => admin.toggleActivo(u.id)}
    >
      Toggle
    </Button>
  ])

  return (
    <Container>
      <h2 className="text-xl font-bold mb-4">Usuarios</h2>
      <Table headers={headers} rows={rows} />
    </Container>
  )
}