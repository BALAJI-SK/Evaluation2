const services = require('../../src/services/companyRanking.services.js');
const controller = require('../../src/controllers/companyRanking.controller.js');
const axios = require('axios');


describe('controllers', () => {
    describe('fecth data fuction been tested ', () => {
        it('should add data and return 200 with array of JSON object data', async () => {
            jest.spyOn(services, 'fecthingGivenUrlData').mockResolvedValue(
                {
                    'company_id': '1',
                    'company_name': 'vector',
                    'company_sector': 'banking'
                }
            );
            jest.spyOn(services, 'insertToSectorData').mockResolvedValue({
                'sectorName': 'banking',
            }
            );
            jest.spyOn(services, 'insertToCompanyData').mockResolvedValue({
                'company_id': '1',
                'company_name': 'vector',
                'company_sector': 'banking'
            }
            );
            const mockReq = {
                body: {
                    urlLink: 'https'
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            await controller.fetchData(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                'company_id': '1',
                'company_name': 'vector',
                'company_sector': 'banking'
            });
        });

        it('should return error 404 when undefined is returned by insertToCompanyData', async () => {
            jest.spyOn(services, 'fecthingGivenUrlData').mockResolvedValue(
                {
                    'company_id': '1',
                    'company_name': 'vector',
                    'company_sector': 'banking'
                }
            );
            jest.spyOn(services, 'insertToSectorData').mockResolvedValue({
                'sectorName': 'banking',
            }
            );
            jest.spyOn(services, 'insertToCompanyData').mockResolvedValue(undefined);
            const mockReq = {
                body: {
                    urlLink: 'https'
                }
            }
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            await controller.fetchData(mockReq, mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith(
                'Data Not found');

        });


    });
});


