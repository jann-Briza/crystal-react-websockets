import { combineReducers } from "redux";

function messages (messages = [], action) {
    switch (action.type) {
    case "CHANGE_MESSAGES":{
        let new_array = messages;
        new_array.push(action.messages)
        return new_array;
    }
    default:
        return messages;
    }
}

function message (message = "", action) {
    switch (action.type) {
    case "CHANGE_MESSAGE":
        return action.message;
    default:
        return message;
    }
}

function clients (client = [], action) {
    switch (action.type) {
    case "RECIEVE_CLIENTS":{
        let new_array = client;
        new_array.push(action.client)
        return new_array;
    }
    default:
        return client;
    }
}

function to_type (client = "all", action) {
    switch (action.type) {
    case "CHANGE_TO_TYPE":{
        return action.client;
    }
    default:
        return client;
    }
}
const Chat = combineReducers({
    message,
    messages,
    clients,
    to_type
});

export default Chat;