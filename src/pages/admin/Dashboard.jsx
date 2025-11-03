import { useAuth } from '../../context/AuthContext'


export default function Dashboard(){
const { state } = useAuth()
const ingresosCuotas = state.usuarios.filter(u=>u.cuota?.estado==='paga').length * 10000 // monto mock
const entradasVendidas = state.entradas.reduce((acc,e)=>acc+e.cantidad,0)
return (
<div>
<h2>Dashboard</h2>
<p>Ingresos por cuotas (mock): ${ingresosCuotas}</p>
<p>Entradas vendidas: {entradasVendidas}</p>
</div>
)
}