import { combineReducers } from "redux";

function messages (messages = [], action) {
    switch (action.type) {
    case "CHANGE_MESSAGES":
        return action.messages;
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

const Chat = combineReducers({
    message,
    messages
});

export default Chat;