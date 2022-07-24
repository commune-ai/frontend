
import {Dimmer, Loader, Image, Segment } from 'semantic-ui-react'


const Loading = (loading_message, style={}) => {
    <div>
      <Segment style={style}>
        <Dimmer active> 
          <Loader indeterminate>{loading_message}</Loader>
        </Dimmer>
  
        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      </Segment>
    </div>
}
  
export default Loading