import axios from "axios";

const api = process.env.REACT_APP_API;
//console.log(api)

//Get
export async function getClientAll() {
  return await axios.get(api + "/ssiCotizacionClients");
}

export async function getResourcesAll() {
  return await axios.get(api + "/ssiCotizacionResources");
}

export async function getProjectTypeAll() {
  return await axios.get(api + "/ssiCotizacionCatProjectType");
}

export async function getQuotationAll() {
  return await axios.get(api + "/ssiCotizacion");
}

export async function getQuotationCant() {
  return await axios.get(api + "/ssiCantQuotation");
}

export async function getQuotationOne(id) {
  return await axios.get(api + "/ssiQuotationOne/" + id);
}

export async function getStateRequirement() {
  return await axios.get(api + "/ssiCotizacionCatRequirement");
}

//Detalle
export async function getDetailQuotationAll(id) {
  return await axios.get(api + "/ssiCotizacionGetResourceByQuotationId/" + id);
}

export async function getRoleAll() {
  return await axios.get(api + "/ssiCotizacionRol");
}

export async function getStatusResource() {
  return await axios.get(api + "/ssiCotizacionCatResource");
}

export async function getYearsAll() {
  return await axios.get(api + "/ssiCotizacionGetYears");
}

export async function getMonthsAll(year) {
  return await axios.get(api + "/ssiCotizacionGetMonths/" + year);
}

export async function getWeekOfYear(year, month) {
  return await axios.get(
    api + "/ssiCotizacionGetWeeksOfyear/" + year + "/" + month
  );
}

export async function getWeekOfYearOfWeek(year, month, week) {
  return await axios.get(
    api +
      "/ssiCotizacionGetLabourDaysInformation/" +
      year +
      "/" +
      month +
      "/" +
      week
  );
}

export async function getHoursResource(resource, year, month, week) {
  return await axios.get(
    api +
      "/ssiCotizacionGetResourceAllocationDetail/" +
      resource +
      "/" +
      year +
      "/" +
      month +
      "/" +
      week
  );
}

//Post
export async function postAddQuotation(data) {
  //console.log(api + "/ssiCotizacionCreatesQuotation")
  return await axios.post(api + "/ssiCotizacionCreatesQuotation", data);
}

export async function postAddResource(data) {
  //console.log(api + "/ssiCotizacionCreatesQuotation")
  return await axios.post(api + "/ssiCotizacion/InsertResourceDetail", data);
}

//Filter
export async function postFilters(data) {
  
  return await axios.post(api + "/ssiCotizacionGetInformationByFilters", data);
}

//Email
export async function sendEmail(data) {
  console.log('data-----',data);
  return await axios.post(api + "/sedEmail", data);
}

//Jira
export async function JiraASSESS(data) {
    //console.log('Entro a ASSESS Jira', data)
    return await axios.post(api + "/APIJiraAsses", data);
}

export async function JiraEXEC(data) {
  return await axios.post(api + "/APIJiraExec", data);
}
