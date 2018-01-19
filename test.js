const constructAxiosConfigObject = ( ...configObjectAdditions ) => {
  return Object.assign( ...configObjectAdditions  )
}

console.log(constructAxiosConfigObject({ 'id': '1234' }, { 'responseType': 'JSON' }))

