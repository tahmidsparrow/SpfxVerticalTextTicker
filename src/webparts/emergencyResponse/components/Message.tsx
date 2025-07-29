import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';
import IMessage from '../models/IMessage';

interface IMessageProps {
    message?: IMessage,
    removeMessage? : any
};

export const Message : React.FC<IMessageProps> = (props) => {

    const closeMessage = () =>{
        props.removeMessage(props.message);
    }

    return(
        <div>
            <MessageBar messageBarType={(props.message.emergencyType == 'Ignore') ? MessageBarType.success : MessageBarType.blocked} isMultiline={true} onDismiss={(props.message.emergencyType == 'Ignore') ? closeMessage : null}  dismissButtonAriaLabel="Close">
                <b>{props.message.message}</b>    
            </MessageBar>
        </div>
    )
}

export default Message;