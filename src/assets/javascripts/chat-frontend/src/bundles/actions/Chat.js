function changeMessage(message) {
    return {
        type: "CHANGE_MESSAGE",
        message
    };
}

function recieveMessages(messages) {
    return {
        type: "CHANGE_MESSAGES",
        messages
    };
}

export function handleChangeMessage(event){
    return(dispatch) => {
        dispatch(changeMessage(event.target.value));
    };
}

export function handleGetMessage(messages){
    return(dispatch) => {
        dispatch(recieveMessages(messages));
    };
}

export function clearMessage(){
    return(dispatch) => {
        dispatch(changeMessage(""));
        //make the message empty
    };
}
