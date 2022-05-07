const data = require ('../_helpers/dataAddress');
const {uniqBy , filter} = require('lodash');
getCity = (req,res) => {
    const newData = uniqBy(data, 'province_code');
   return res.status(200).json({message: 'true',status: 'SUCCESS', data: newData})
}

getDistrict = (req,res) => {
  const cityCode = req.params.city;
  const district = filter(data , ['province_name', cityCode]);
  const newData = uniqBy(district , 'district_code')
  if(!cityCode){
      return res.status(400).json({message: 'Param city not found', status: 'ERROR'})
  }
 else return res.status(200).json({status: 'SUCCESS',message: 'Get district success', data: newData})
}

getCommune = (req,res) => {
  const districtCode = req.params.district;
  const commune = filter(data, ['district_name', districtCode]);
  if(districtCode){
      return res.status(200).json({status: 'SUCCESS', data: commune})
  }
  else return res.status(400).json({status: 'ERROR', message: 'Not found'})
}
module.exports = { getCity , getDistrict, getCommune}