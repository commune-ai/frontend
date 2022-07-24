
  export default function children_id(start) {
    let q = [start]
    let e = [start]
    let id = {}
    
    while (q.length !== 0){
      let v = q.shift()
      console.log(v.id)
      
      for (let i=0; i < v.data.children.length; i++){
        if (!e.includes(v.data.children[i]) && !v.data.children.hidden){
          if (v.data.children[i].data.children.length !== 0){
            q.push(v.data.children[i])
          }
          e.push(v.data.children[i])
          var current_depth = v.id in id ? id[v.id].depth + 1 : 1
          v.data.children[i].hidden = current_depth > 1 && v.data.children[i].hidden ? v.data.children[i].hidden : v.data.children[i].hidden ? false : true
          id[v.data.children[i].id] = {"hidden" : v.data.children[i].hidden, "depth" : current_depth  }  
          
          console.log(id[v.data.children[i].id] )
        }

      }
   
    }
  
    return id
  
  }

export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
 
/*
 // Possible use for later but as of this moment, no use.
  function every(dic, bool, depth){
    for(var key in dic){
      if (dic[key].depth === depth && dic[key].hidden !== bool){
        return false
      }
    }
    return true
  }
*/