const fechaElement = document.getElementById('fecha');

function actualizarFecha() {
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const fecha = new Date();
  const diaSemana = diasSemana[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();

  const fechaFormateada = `${diaSemana}, ${dia} de ${mes} de ${año}`;

  fechaElement.textContent = fechaFormateada;
}

actualizarFecha();

setInterval(actualizarFecha, 60000); // Actualizar la fecha cada 1 minuto
