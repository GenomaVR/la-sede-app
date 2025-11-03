export const seed = {
usuarios: [
{ id: 1, nombre: 'Admin', apellido: 'Club', dni: '100', email: 'admin@aj.com', password: 'admin', rol: 'admin', activo: true, cuota: { mes: 11, anio: 2025, estado: 'paga', medio: 'efectivo' } },
{ id: 2, nombre: 'Lucas', apellido: 'Socio', dni: '200', email: 'socio@aj.com', password: 'socio', rol: 'user', activo: true, cuota: { mes: 10, anio: 2025, estado: 'pendiente', medio: null } },
],
canchas: [
{ id: 1, nombre: 'La Paternal 1', tipo: '5', estado: 'ok' },
{ id: 2, nombre: 'La Paternal 2', tipo: '5', estado: 'ok' },
{ id: 3, nombre: 'La Paternal 3', tipo: '5', estado: 'ok' },
],
reservas: [],
clases: [
{ id: 1, disciplina: 'boxeo', diaSemana: 'Lunes', hora: '19:00', cupo: 15, inscriptos: [] },
{ id: 2, disciplina: 'natacion', diaSemana: 'Miércoles', hora: '18:00', cupo: 12, inscriptos: [] },
],
partidos: [
{ id: 1, torneo: 'Liga', rival: 'Racing', fechaHora: '2025-11-15T19:00:00', estadio: 'Diego A. Maradona', stockEntradas: 200 },
],
entradas: [],
}