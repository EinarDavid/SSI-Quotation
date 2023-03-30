export function ConvertDate (sqlDate) {
    var sqlDateArr1 = sqlDate.split("-");
    var sYear = sqlDateArr1[0];
    var sMonth = (Number(sqlDateArr1[1]) ).toString();
    var sqlDateArr2 = sqlDateArr1[2].split("T");
    var sDay = sqlDateArr2[0];
    var fecha = `${sYear}-${sMonth}-${sDay}`;

    return (fecha);
}