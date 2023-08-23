import axios from "axios";
import { Buffer } from 'buffer';
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

//Jira
export async function JiraASSESS(dataQuotation) {
    console.log('Entro a ASSESS Jira', dataQuotation)
    
    var data = JSON.stringify({
          "fields": {
            "customfield_10208": Number(dataQuotation.total_effort),
            "customfield_10209": null
          }
        });

    //var urlJira = 'https://salamancasolutions.atlassian.net/rest/api/3/issue/' + dataQuotation.project_code
    var urlJira = 'https://salamancasolutions.atlassian.net/rest/api/3/issue/SSI-123'
    
    var username = 'roxana.machaca@salamancasolutions.com';
    var password = 'ATATT3xFfGF0k9vFdtdoGi1R2U9pnQQnx9hnG9Dg-Juv7CJrGsg6hzszYcihfZOZ3EzZwJLSNS4GxGuUFGtx1l0GgaXoHb95DhXUkHIHOXLNu94a7e3MLOsm-o49Anrs3Av2udLfKOLp_30ezXe2JXpHPVcpxKXHGQi6w6vZ_eo2-K-34f2UZm8=0E7CBC77';
    var basicAuth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
    //var basicAuth = 'Basic ' + (username + ':' + password);

    
    var config = {
      method: 'put', 
      url: urlJira,
      headers: { 
        'Authorization': basicAuth, 
        'Content-Type': 'application/json', 
        'Cookie': 'atlassian.xsrf.token=ed98ba05fe604cefdb38696980ffc6adf16716fc_lin'
      },
      data : data
    };

    console.log("Config",config)
    
    return await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      
    })
    .catch(function (error) {
      console.log(error);
    });
    
}
