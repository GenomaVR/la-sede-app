import { useAuth } from '../../context/AuthContext'
import { useData } from '../../context/DataContext'


export default function Usuarios(){
const { state } = useAuth()
const { admin } = useData()
return (
<div>
<h2>Usuarios</h2>
<table>
<thead><tr><th>Nombre</th><th>Email</th><th>Rol</th><th>Activo</th><th></th></tr></thead>
<tbody>
{state.usuarios.map(u=> (
<tr key={u.id}>
<td>{u.nombre} {u.apellido}</td>
<td>{u.email}</td>
<td>{u.rol}</td>
<td>{u.activo? 'Sí':'No'}</td>
<td><button onClick={()=>admin.toggleActivo(u.id)}>Toggle</button></td>
</tr>
))}
</tbody>
</table>
</div>
)
}