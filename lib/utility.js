const mockSmartcarResponses = require('./mockSmartcarResponses')

exports.vehiclesInfoObject = ( gmResData ) => {
  gmResData = areSmartcarKeysInGMObject(gmResData, mockSmartcarResponses.vehiclesInfo)

  return {
      "vin": gmResData.vin.value,
      "color": gmResData.color.value,
      "doorCount": calcVehicleDoorCount(gmResData),
      "driveTrain": gmResData.driveTrain.value
    }
}

exports.doorSecObject = ( gmResData ) => {
  gmResData = areSmartcarKeysInGMObject(gmResData, mockSmartcarResponses.securityObject)

  const allDoorsSecData = []
  gmResData.doors.values.forEach( (door) => {
    let doorSecData = {}
    doorSecData.location = door.location.value
    doorSecData.locked = door.locked.value === 'True' ? true : false
    allDoorsSecData.push(doorSecData)
  })

  return allDoorsSecData
}

exports.energyRangeObject = ( gmResData, energyType ) => {
  gmResData = areSmartcarKeysInGMObject(gmResData, mockSmartcarResponses.fuelBatteryObject)
  // conversions for energy range from smartcar param to gm param
  const energyTypeDict = {
    'fuel': 'tankLevel',
    'battery': 'batteryLevel'
  }

  let gmActionType = energyTypeDict[energyType]
  let energyLevelData = {}
  energyLevelData.percent = parseInt( gmResData[gmActionType].value )

  return energyLevelData
}

exports.engineActionType = ( action ) => {
  // conversions for engine action type from smartcar param to gm param
  const engineActionTypeDict = {
    "START": "START_VEHICLE",
    "STOP": "STOP_VEHICLE"
  }

  return engineActionTypeDict[action]
}

exports.engineActionObject = ( gmResData ) => {
  gmResData = areSmartcarKeysInGMObject(gmResData, mockSmartcarResponses.actionEngineObject)
  // conversions for gm result term to smartcar term
  let engineActionResultDict = {
    "EXECUTED": "success",
    "FAILED": "error"
  }

  let gmActionResultStatus = gmResData.actionResult.status

  return { "status": engineActionResultDict[gmActionResultStatus] }
}

//
// Below are methods private to the code in this file
//


// simple function to extract doorCount
const calcVehicleDoorCount = ( gmResData ) => {
  // assume a motorcycle if all cases fail
  let doorCount = 0

  // fourDoorSedans (e.g., SUVs)
  if( gmResData.fourDoorSedan.value === 'True' ) {
    doorCount = 4
  // twoDoorSedans (e.g., coupes)
  } else if( gmResData.twoDoorSedan.value === 'True' ) {
    doorCount = 2
  // noDoorSedans (e.g., motorcycles)
  }

  return doorCount
}


// quick check to make sure all smartcarResponseKeys are correctly placed in the gmResData
// if there is an object missing
const areSmartcarKeysInGMObject = function ( gmRes, smartcarMockRes ) {
  // if gmRes is undefined or has no keys
  // Object.keys also works for arrays
  if( !gmRes || !Object.keys(gmRes) ) {
    // return our default mock response
    return smartcarMockRes
  }

  // check whether our responses are objects or array of objects
 const isgmResObject = Array.isArray(gmRes) === false && typeof gmRes === 'object'
 const isSmartcarMockResObject = Array.isArray(smartcarMockRes) === false && typeof gmRes === 'object'

 // decide whether to take the response object or the first object in an array of objects
 const smartcarKeys = isSmartcarMockResObject === true ? Object.keys(smartcarMockRes) : Object.keys(smartcarMockRes[0])
 const gmResObject = isgmResObject === true ? gmRes : gmRes[0]

  smartcarKeys.forEach( ( smartcarKey ) => {
    // if the key doesn't exist, set it to the default value of our mock object
    if( !gmResObject[smartcarKey] ) {
      gmResObject[smartcarKey] = smartcarMockRes[smartcarKey]
    }
  })

  return gmResObject

}