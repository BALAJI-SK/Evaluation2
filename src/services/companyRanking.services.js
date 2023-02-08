const HTTPError = require('../utilities/errorHandling');
// const convertorCsvToJSON = require('../utilities/covertorCsvToJSON.js');
const { createUrlCompanyData, createUrlCompanyDetails, getCompanyDetailsUtilies } = require('../utilities/companyData.utilites.js');
const { Sector, company } = require('../../database/models');
const axios = require('axios');
const utilites = require('../utilities/convertorCsvToJSON.js');


const insertToSectorData = async (sectorData) => {
    const sectorName = [];

    sectorData.map((data) => {
        if (sectorName.includes(data.company_sector)) {
            return;
        } else {
            sectorName.push(data.company_sector);
        }
    });
    sectorName.map(async (data) => {
        const sectorInsertedData = await Sector.create({
            sectorName: data,
        });

        if (sectorInsertedData === undefined) {
            throw new HTTPError(500, error.message);
        }
    });
}
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
            new HTTPError(404, errors);
        });
    //  console.log(getCompanyDetails);
    urldata = [];

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
            new HTTPError(404, errors);
        });
    // console.log(getCompanyData);
    getCompanyData = getCompanyDetailsUtilies(getCompanyDetails, getCompanyData);
    return getCompanyData;


}
const fecthingGivenUrlData = async (urlLink) => {
    let sectorData = [];
    await axios.get(urlLink)
        .then((response) => {
            sectorData = utilites.convertorCsvToJSON(response.data);
        });
    return sectorData;
}

module.exports = {
    insertToSectorData,
    insertToCompanyData,
    fecthingGivenUrlData
};
