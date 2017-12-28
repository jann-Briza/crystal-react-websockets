import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import React from "react";
import thunkMiddleware from "redux-thunk";
import VisibleChat from "../components/Chat";
import Chat from "../reducers/Chat";

const createBookingsStore = compose(
    applyMiddleware(thunkMiddleware)
)(createStore);

export default class ChatRoot extends React.Component {

    componentWillMount() {
        this.store = createBookingsStore(Chat, {});
    }

    render() {
        return (
            <Provider store={this.store}>
                <VisibleChat/>
            </Provider>
        );
    }
}

ChatRoot.propTypes = {
};
