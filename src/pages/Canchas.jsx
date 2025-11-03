import { useState } from 'react'
import Container from '../components/Container'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'


export default function Canchas(){
const { state } = useAuth()
const { reservarCancha } = useData()
const [canchaId,setCanchaId] = useState(1)
const [fecha,setFecha] = useState(new Date().toISOString().slice(0,10))
const [horaInicio,setHoraInicio] = useState('18:00')
const [horaFin,setHoraFin] = useState('19:00')
const [msg,setMsg] = useState('')


const reservar = e => {
e.preventDefault()
setMsg('')
try {
reservarCancha({ canchaId:Number(canchaId), fecha, horaInicio, horaFin })
setMsg('Reserva confirmada ✅')
} catch(ex){ setMsg(ex.message) }
}


// Mostrar reservas del día para la cancha seleccionada
}