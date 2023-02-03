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
   return companyDetails;

}
const scoreUtilies = (data) => {
    const performanceIndex = data.reduce((PI, curr) => {
        PI[curr.key] = curr.value;
        return PI;
    }, {});
    

    return (((performanceIndex.cpi * 10) + (performanceIndex.cf / 10000) + (performanceIndex.mau * 10) + performanceIndex.roic) / 4);
};
module.exports = { createUrlCompanyData, createUrlCompanyDetails, getCompanyDetailsUtilies };
