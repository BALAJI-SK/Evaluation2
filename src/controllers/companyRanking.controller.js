const HTTPError = require('../utilities/errorHandling');
const services = require('../services/companyRanking.services.js');
// const csvToJson = require('convert-csv-to-json');
const axios = require('axios');
const fetchData = async (req, res) => {
    try {
        let sectorData = [];
        const urlLink = req.body.urlLink;
        sectorData = await services.fecthingGivenUrlData(urlLink);
        

        await services.insertToSectorData(sectorData);
        const companyInsertedData = await services.insertToCompanyData(sectorData);
        if (companyInsertedData === undefined) {
            throw new HTTPError(404, 'Data Not found');
        } else
            res.status(200).json(companyInsertedData);

    }
    catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.statusCode).json(error.message);
        } else {
            res.status(500).json('internal error');
        }
    };


}

module.exports = { fetchData };