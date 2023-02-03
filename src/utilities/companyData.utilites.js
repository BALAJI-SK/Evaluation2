const url = require('url');
const createUrlCompanyDetails = (id) => {
    const baseUrl = 'http://54.167.46.10/company/';
    const companyUrl = `${baseUrl}${id}`;
    return companyUrl;
}

const createUrlCompanyData = (id) => {
    const baseUrl = 'http://54.167.46.10/sector?name=';
    const companyUrl = `${baseUrl}${id}`;
    return companyUrl;
}
const getCompanyDetailsUtilies = (getCompanyDetails, getCompanyData) => {
    // console.log(getCompanyData);
    let companyDetails = [];
    let companyScoreData = [];
    getCompanyDetails.map((data) => {
        companyDetails.push({
            id: data.id,
            name: data.name,
            ceo: data.ceo,
            score: scoreUtilies(getCompanyData.filter((current) => current.companyId === data.id)[0].performanceIndex),
        });
    });
    // console.log(companyDetails);

}
const scoreUtilies = (data) => {
    for (var key in json) {
    }
    const cpi = parseFloat(data);

    const cf = parseFloat(data.cf);
    const mau = parseFloat(data.mau);
    const roic = parseFloat(data.roic);
    console.log(cpi);

    // console.log(((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4);
    return 0;
};
module.exports = { createUrlCompanyData, createUrlCompanyDetails, getCompanyDetailsUtilies };
