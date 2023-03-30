export function Resource (campos, getHoursResource, validacionHoras, setValidacionHoras ){

    getHoursResource(
        campos[index].id_resource,
        campos[index].year,
        campos[index].month,
        campos[index].week
      ).then(({ data }) => {
        console.log("Horas recurso", data);

        var horasRecurso = 0;
        if (data.message) {
          horasRecurso = 0;

          let horasDisponibles = [...validacionHoras];
          horasDisponibles[index] = {
            message: data.message,
          };
          setValidacionHoras(horasDisponibles);
        } else {
          horasRecurso =
            Number(data[0].totalefforthoursresource) -
            detalle[index].backupEffort +
            detalle[index].effort;

          console.log("horas asignadas: ", Number(data[0]?.hoursassigned));
          let horasDisponibles = [...validacionHoras];
          let horasSemana =
            Number(data[0]?.totalefforthoursresource) +
            Number(data[0]?.totalhoursnotassigned);

          horasDisponibles[index] = {
            horasDisponibles: Number(data[0]?.totalhoursnotassigned),
            horasSemana: horasSemana,
            horasAsignadas: Number(data[0]?.hoursassigned),
            horasReservadas: Number(data[0]?.hoursassignedfcast),
          };
          setValidacionHoras(horasDisponibles);
        }

        
      });
}