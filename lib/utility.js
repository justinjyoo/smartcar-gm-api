exports.getVehicleDoorCount = (gmResponseData) => {
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

exports.constructSecurityStatSmartcarObject = (gmResponseData) => {

}