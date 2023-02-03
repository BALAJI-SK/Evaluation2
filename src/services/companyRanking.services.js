const HTTPError = require('../utilities/errorHandling');
// const convertorCsvToJSON = require('../utilities/covertorCsvToJSON.js');
const { createUrlCompanyData, createUrlCompanyDetails, getCompanyDetailsUtilies } = require('../utilities/companyData.utilites.js');
const { Sector, company } = require('../../database/models');
const { request } = require('http');
const axios = require('axios');
const convertorOfCsv = async (body) => {
    const data = convertorCsvToJSON(body);
    if (data === undefined) {
        throw new HTTPError(500, error.message);
    }
    return data;

}
const insertToSectorData = async (sectorData) => {
    // const sectorInsertedData = await Sector.bulkCreate({
    //     sectorName: sectorData.company_sector,
    // });
    // if (sectorInsertedData === undefined) {
    //     throw new HTTPError(500, error.message);
    // }
    // console.log(sectorData);
};
const insertToCompanyData = async (sectorData) => {
    let getCompanyDetails = [];

    let urldata = [];
    sectorData.map((data) => {
        urldata.push(createUrlCompanyDetails(data.company_id));
    });
    urldata = urldata.filter(function (current, index, array) { return array.indexOf(current) === index; });
    await axios.all(urldata.map((currentUrl) => axios.get(currentUrl)))
        .then(axios.spread((...responses) => {
            responses.map((response) => {
                getCompanyDetails.push(response.data);
            });
        }))
        .catch((errors) => {
            console.log(errors);
        });
    //  console.log(getCompanyDetails);
    urldata = [];
    let company = [];

    sectorData.map((data) => {
        urldata.push(createUrlCompanyData(data.company_sector));
    });
    urldata = urldata.filter(function (current, index, array) { return array.indexOf(current) === index; });
    let getCompanyData = [];
    await axios.all(urldata.map((currentUrl) => axios.get(currentUrl)))
        .then((responses) => {
            responses.map((response) => {
                const data = response.data;
                getCompanyData.push(...data);
            });
        })
        .catch((errors) => {
            console.log(errors);
        });
    // console.log(getCompanyData);
    getCompanyDetailsUtilies(getCompanyDetails, getCompanyData);

}


module.exports = {
    convertorOfCsv,
    insertToSectorData,
    insertToCompanyData
};
const convertorCsvToJSON = (csv) => {

    var lines = csv.split("\n");

    var result = [];


    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}