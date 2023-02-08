const axois = require('axios');

const services = require('../../src/services/companyRanking.services');
const utilites = require('../../src/utilities/convertorCsvToJSON');
describe('Services', () => {
    describe('fecthingGivenUrlData return data fecting data from given URL', () => {
        it('should return data when proper URL is given', async () => {
            const urlLink = 'http://localhost:4000/input.csv';
            jest.spyOn(axois, 'get').mockResolvedValue({
                'company_id': '1',
                'company_name': 'vector',
                'company_sector': 'banking'
            });
            jest.spyOn(utilites, 'convertorCsvToJSON').mockResolvedValue({
                'company_id': '1',
                'company_name': 'vector',
                'company_sector': 'banking'
            });
            const data = await services.fecthingGivenUrlData(urlLink);
            expect(data).toEqual({
                'company_id': '1',
                'company_name': 'vector',
                'company_sector': 'banking'
            });
        });
    });
})