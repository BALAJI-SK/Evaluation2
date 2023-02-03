const HTTPError = require('../utilities/errorHandling');
const csvToJson = require('../utilities/convertorCsvToJSON.js');
const services = require('../services/companyRanking.services.js');
// const csvToJson = require('convert-csv-to-json');
const { request } = require('http');
const axios = require('axios');
const fetchData = async (req, res) => {
    try {
        let sectorData = [];
        const urlLink = req.body.urlLink;
        await axios.get(urlLink)
            .then((response) => {
                sectorData = csvToJson(response.data);
                console.log(typeof sectorData);
            });

        // console.log(sectorData);
        await services.insertToSectorData(sectorData);
        const companyInsertedData = await services.insertToCompanyData(sectorData);
        res.status(200).json('Data inserted successfully');
    } catch (error) {
        if (error instanceof HTTPError) {
            res.status(error.statusCode).json(error.message);
        } else {
            res.status(500).json(error.message);
        }


    };


}

module.exports = { fetchData };