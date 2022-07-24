
import axios from "axios";
// import {create} from "ipfs-http-client";


import {getStruct} from '../utils/types/struct.js'

class BackendAPI{
    constructor(url= {graphql:'http://localhost:8000/', 
                     ipfs: "http://ipfs:5001/api/v0" }) {
    this.url = {
        graphql: url.graphql,
        ipfs: url.ipfs
    }

    this.cache = {}

    }

    async request(request_data) {

        return (await axios({
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Content-Type': 'application/json'
              },
            url: this.url.graphql,
            method: 'post',
            data: request_data
        }))
    }

    refresh_cache() {
        this.cache = {}
    }
    async get_explainer_info(rawExplainObjects,
                             cache_key=null,
                             read_cache=false) { 
        

        if (cache_key && read_cache && cache_key in this.cache){
            return this.cache[cache_key]
        }
        const _explainKeys = []
        const _explainMap = {}

        for (let i=0; i<rawExplainObjects.length; i++) {
          const _explainObj = getStruct(rawExplainObjects[i])
          _explainKeys.push(_explainObj.name)
          _explainMap[_explainObj.name] = _explainObj.uri

        }
        const explainer_info = {keys:_explainKeys, 
                            hash_map: _explainMap}

        if (cache_key) {
            this.cache[cache_key] = explainer_info
        }


        return explainer_info

    }

    async launch(module='config.manager.ConfigManager', 
                      fn='find_modules',
                      kwargs={'module': 'data.regression.crypto.sushiswap.dataset.Dataset'}) 
                      
            {

        kwargs = JSON.stringify(kwargs).replace(/"/g, '\'')

        const query = `
        {
            launch(input: "{'module': '${module}', 'fn': '${fn}', 'kwargs': ${kwargs}}")
          }
          
       
        `

        let return_object =  JSON.parse((await this.request({query:query})).data.data.launch)
        return return_object[0]

    }


    async config(path='') {

        const query = `{config(path: "${path}")}`
        let return_object =  JSON.parse((await this.request({query:query})).data.data.config)
        
        return return_object.template
    }

    async moduleTree(root='app/commune')              
    {

        const query = `{moduleTree}`
        let return_object =  JSON.parse((await this.request({query:query})).data.data.moduleTree)
        
        return return_object

    }



    async moduleTree(root='app/commune')              
    {

        const query = `{moduleTree}`
        let return_object =  JSON.parse((await this.request({query:query})).data.data.moduleTree)
        
        return return_object

    }


        


    async get_ipfs_object(hash='') {
        const query = `{
            ipfs(hash:"${hash}") {
                object
            }
        }`

        let return_object= null;
        return_object = (await this.request({query:query})).data.data.ipfs[0].object

        return return_object
        
    }



}

// async function docat() {
//     var out = []
//     // console.log(await ipfs.ls(), 'ipfs')
//     for await (const result of ipfs.cat(explainHash)) {
//         out.push(result)
//     }
//     console.log(out, 'result')
//     return out
// } 











export default BackendAPI