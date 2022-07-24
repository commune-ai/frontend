

  
export function generateSprawlBlocks(
            center_point = {x: window.innerWidth/2, y: window.innerHeight/2},
            domainBlocks={width:5, height:5}, 
            blockDims= {width: 100, height:100},
            bufferDims= {width: 40, height:40} ) {
    let block_sprawl_array =[]
  
    blockDims.width += bufferDims.width
    blockDims.height += bufferDims.height
  
    for (let h=-domainBlocks.height; h<domainBlocks.height; h++) {
      for (let w=-domainBlocks.width; w<domainBlocks.width; w++) {
  
        if (!(h==0 && w==0)) {
          block_sprawl_array.push({
            x: center_point.x + (w*blockDims.width),
            y: center_point.y + (h*blockDims.height),
            r: (h*blockDims.height)**2 + (w*blockDims.width)**2  
          })
        }
        
      }
  
  
  
    }
    block_sprawl_array.sort(function(a,b){return a.r-b.r})
  
    return block_sprawl_array
  }



  export function equidistantCircleNodes({radius=10, 
                                          blocks=10,
                                          block_per_ring=5,
                                          center_point={x:0, y:0}, 
                                          inner_radius_factor=0.8}={}
                                          ) {
    let node_styles =[]
    console.log({radius:radius, 
      blocks:blocks,
      center_point:center_point, 
      inner_radius_factor:inner_radius_factor}, 'args')
    
    const block_dims = {width: (1- inner_radius_factor)*radius, height: (1-inner_radius_factor)*radius}
    for (let i=0; i<=blocks; i++) {
      let rad = (2*Math.PI/blocks)*i


      node_styles.push({left: Math.cos(rad)*radius + center_point.x - block_dims.width*0.5, 
                        top: Math.sin(rad)*radius + center_point.y - block_dims.height*0.5,
                        position: 'absolute', ...block_dims})

    }
  
  
    return node_styles
  }
  


export function packBlocks({
    center_point = {x: 0, y: 0},
    blocks = 10,
    parentDims= {width: 500, height:500},
    margin = {height:0.05, width:0.05},
    padding = {height: [0.0,0.05], width: [0.0,0.05]},
    return_bundle_style = false
}={})
{

  let pack_block_dims = {}
  pack_block_dims.width = parseInt(Math.sqrt(blocks)) 
  pack_block_dims.height =parseInt(blocks / pack_block_dims.width) + parseInt(blocks % pack_block_dims.width)


  let block_styles =[]


  padding = {width:padding.width.map((e) => {return parentDims.width*e}),
          height:padding.width.map((e) => {return parentDims.height*e})}


  margin = {
                height: (margin.height*parentDims.height)/pack_block_dims.height,
                width: (margin.width*parentDims.width)/pack_block_dims.width
              }
  let blockDims  = {
                  width: (parentDims.width-(padding.width[0] + padding.width[1] +(pack_block_dims.width)*margin.width) ) / pack_block_dims.width,
                   height: (parentDims.height-(padding.height[0] + padding.height[1] + (pack_block_dims.height)*margin.height) ) / pack_block_dims.height
                  }
        

  console.log(padding, 'padding')

for (let h=0; h<pack_block_dims.height; h++) {
for (let w=0; w<pack_block_dims.width; w++) {



let shift = {x:0, y:0}

  block_styles.push({
    position: 'absolute',
    left: (w*blockDims.width +(w)*margin.width + padding.width[0]),
    top:  (h*blockDims.height+ (h)*margin.height + padding.height[0]),
    ...blockDims
  })

}

}

if (return_bundle_style) {

  let block_bundle_style = {
    top: Math.min(...block_styles.map(x=>x.top)),
    left: Math.min(...block_styles.map(x=>x.left)),
  }

  block_bundle_style.width =  Math.max(...block_styles.map(x=>x.width+x.left)) - block_bundle_style.left 
  block_bundle_style.height =  Math.max(...block_styles.map(x=>x.height+x.top)) - block_bundle_style.top 
  return [block_styles, block_bundle_style]
} else  {
  return block_styles
}

}

  