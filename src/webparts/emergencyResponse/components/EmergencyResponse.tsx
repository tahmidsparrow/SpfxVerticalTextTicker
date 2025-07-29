import * as React from 'react';
import styles from './EmergencyResponse.module.scss';
import { IEmergencyResponseProps } from './IEmergencyResponseProps';

import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Message } from './Message';
import { Fabric } from 'office-ui-fabric-react';
import IMessage from '../models/IMessage';
import { GetLoggedInUserProperty } from '../services/UserService';
import { GetEmergencyResponseMessages } from '../services/DataService';

export const EmergencyResponse : React.FC<IEmergencyResponseProps> = (props) => {
  
  const [messages, setMessages] = React.useState<IMessage[]>();

  React.useEffect(() => {
    GetLoggedInUserProperty("Office").then((location: string)=> {

      // location = '2.15.232, Cumilla 02'; 
      // location = 'Dhaka, No Seat Req Bangladesh';
      
      let locArr = location.split(',');
      location = locArr[1] ? ((locArr[0] == 'NSR') ? null: locArr[1]) : null;       
      location = (location) ? location.slice(0, location.length-2).trim().toUpperCase() : null;

      GetEmergencyResponseMessages(location, props.maxMessages).then((data : IMessage[]) => {
        setMessages(data);
      });
    });
  }, [props]);
    
  const responsive: ResponsiveType = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1, },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1, },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1, },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, },
  };

  const removeMessage = (message: IMessage) => {
    console.log(message);
    let data = messages.filter(msg => msg.id != message.id);
    setMessages(data);
  } 
  
  return (
    <Fabric>
      <Carousel responsive={responsive} autoPlay={true} showDots={false} arrows={false} autoPlaySpeed={props.transitionSpeed} infinite={true}>
        {
          messages ? 
          messages.map(function(message) {
            return(
              <Message message={message} removeMessage={removeMessage}/>
            );
          })
          : <div></div>
        }
      </Carousel>
    </Fabric>
  );
}

export default EmergencyResponse;