
exports.constructVehiclesInfoResponseObject = (gmResponseData) => {
  return {
      "vin": gmResponseData.vin.value,
      "color": gmResponseData.color.value,
      "doorCount": calcVehicleDoorCount(gmResponseData),
      "driveTrain": gmResponseData.driveTrain.value
    }
}

exports.constructDoorSecResponseObject = (gmResponseData) => {
  let allDoorsSecData = [];

  gmResponseData.doors.values.forEach( (door) => {
    let doorSecData = {};
    doorSecData.location = door.location.value;
    doorSecData.locked = door.locked.value;
    allDoorsSecData.push(doorSecData);
  })

  return allDoorsSecData;
}

exports.constructEnergyRangeObject = (gmResponseData, energyType) => {
  let energyTypeDict = {
    'fuel': 'tankLevel',
    'battery': 'batteryLevel'
  }

  let gmActionType = energyTypeDict[energyType]
  let energyLevelData = {}
  energyLevelData.percentage = gmResponseData[gmActionType].value

  return energyLevelData;
}

exports.convertEngineActionType = (action) => {
  // conversions for engine action type from smartcar param to gm param
  let engineActionTypeDict = {
    "START": "START_VEHICLE",
    "STOP": "STOP_VEHICLE"
  }

  return engineActionTypeDict[action]
}

exports.constructEngineActionResponseObject = (gmResponseData) => {
  // conversions for gm result term to smartcar term
  let engineActionResultDict = {
    "EXECUTED": "success",
    "FAILED": "error"
  }

  let gmActionResultStatus = gmResponseData.actionResult.status

  return { "status": engineActionResultDict[gmActionResultStatus] }
}

const calcVehicleDoorCount = (gmResponseData) => {
  let doorCount;

  // fourDoorSedans (e.g., SUVs)
  if( gmResponseData.fourDoorSedan.value === 'True' ) {
    doorCount = 4
  // twoDoorSedans (e.g., coupes)
  } else if( gmResponseData.twoDoorSedan.value === 'True' ) {
    doorCount = 2
  // noDoorSedans (e.g., motorcycles)
  } else {
    doorCount = null;
  }

  return doorCount;
}