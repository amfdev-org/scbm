export const combineInitialStates = allInitialStates => {
  
    var result;
    result = Object.keys(allInitialStates).reduce(function (r, k) {
        return r.concat(allInitialStates[k]);
    }, []);
      
  let merged = Object.assign(...result);

  return merged;
};