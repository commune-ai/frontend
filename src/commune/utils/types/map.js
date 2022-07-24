

function deepMapGet(key_array, map, debug=false) {
    let return_value = Object.assign({}, map)
    key_array = key_array.split('.')
    if (debug) {
        console.log("fuck me")
    }
    console.log(key_array, map, typeof(key_array))
    for (let i=0; i<key_array.length; i++) {
        
        let k = key_array[i]
        if (debug) {
            console.log(k, return_value)
        }
        return_value = return_value[k]
    }
    return return_value
}

function deepMapSet(key_array,val, map) {


    const k = key_array[0]
    if (key_array.length > 1)  {
        if (!(k in map && map[k].constructor.name == 'Object')) {
            map[k] = {}
        }
        deepMapSet(key_array.slice(1),val, map[k])
    }
    else if (key_array.length == 1) {
        map[k] = val

    }

}

export {deepMapGet, deepMapSet}