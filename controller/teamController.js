const Team = require('../model/team')

const getAllTeams = async (req, res) => {
    //req query
   const  {name, location, uclwinner, sort, select} = req.query
   let queryObject = {};
   let result = Team.find(queryObject)
  
   if (name) {
    queryObject.name = { $regex: name, $options: 'i'}
   }
   if (location) {
    queryObject.location = { $regex: location, $options: 'i'}
   }
   if (uclwinner) {
    queryObject.uclwinner = uclwinner === 'true'? true: false;
   }
    //sorting
    if (sort){
        const sortList = sort.split(",").join (" ")
        result=result.sort(sortList)
    }
    //selecting
     if (select) {
        const selectList = select.split (",").join (" ")
        result=result.select(selectList)
     }
    //limit
  const limit = number(req.query.limit)
  result=result.limit(limit)

   result=result.find(queryObject) 
    const teams = await result
   
    res.status(200).json ({noOfTeams: teams.length, teams});
}

module.exports = getAllTeams;