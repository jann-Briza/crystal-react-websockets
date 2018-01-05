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

function recieveClients(client) {
    return {
        type: "RECIEVE_CLIENTS",
        client
    };
}

function changeToType(client) {
    return {
        type: "CHANGE_TO_TYPE",
        client
    };
}

export function handleChangeMessage(event){
    return(dispatch) => {
        dispatch(changeMessage(event.target.value));
    };
}

export function handleGetMessage(data){
    return(dispatch, getState) => {
        dispatch(recieveMessages(data));
    };
}

export function handleGetClients(data){
    return(dispatch, getState) => {
        dispatch(recieveClients(data));
    };
}

export function clearMessage(){
    return(dispatch) => {
        dispatch(changeMessage(""));
        //make the message empty
    };
}

export function handleToMessage(event){
    return(dispatch) => {
        dispatch(changeToType(event.target.value));
    };
}
