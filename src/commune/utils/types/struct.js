function getStruct(struct){
    let output_struct = {} 
    for ( let k of  Object.keys(struct).slice(struct.length)) {
      
      let v = struct[k]
      if (v.constructor.name == "BigNumber") {
        v = Number(v)
      }
      output_struct[k] = v
    }
    return output_struct
  
  }

export {getStruct}