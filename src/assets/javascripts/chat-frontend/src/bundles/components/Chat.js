import { connect } from "react-redux";
// TODO: Add loader to this page
//import Loader from "react-loader-advanced";
import * as ChatActions from "../actions/Chat";
import React from "react";
const server = new WebSocket("ws://" + "localhost" + ":" + "3000"); //the server of your websockets

class Chat extends React.Component {

    componentWillMount() {
        this.state = {
            messages: [],
            clients: []
        };
    }

    componentDidMount(){
        let self = this;
        var user = localStorage.getItem('user') || prompt("Enter your name").replace(/\:|\@/g, ""); //propmt will popup and get the user name
        localStorage.setItem('user', user); //store the user in session o local storage
        server.onmessage = function (event) {
            let data = JSON.parse(event.data); //parse the array
            let messages_data = [];
            let clients_data = [];
            data.map(r => {
                let string_message = JSON.parse(r);
                if(string_message.type === "ADD_MESSAGE"){
                    if(string_message.to === localStorage.getItem('user') || string_message.id === localStorage.getItem('user') ||string_message.to === "all"){
                        messages_data.push(string_message);
                    }
                }
                if(string_message.type === "USER_JOIN"){
                    clients_data.push(string_message);
                }
            });
            self.setState({
                messages: messages_data,
                clients: clients_data
            });
            document.getElementById("chat-body").scrollTop = 999999
        };
        server.onopen = function () {
            let data = new Object();
            data.id = localStorage.getItem('user');
            data.time =  new Date();
            data.type =  "USER_JOIN";
            server.send(
              JSON.stringify(data)
            );
        };
    }

    send_message(e){
        if (e.key === "Enter") { //Check if the Enter is pressed
            let data = new Object();
            data.id = localStorage.getItem('user');
            data.message = this.props.message;
            data.time =  new Date();
            data.to = this.props.to_type;
            data.type =  "ADD_MESSAGE";
            server.send(
              JSON.stringify(data)
            );
            //clear the message after sending
            this.props.clearMessage();
        }
    }

    render() {
        console.log(this.props.to_type);
        let messages = this.state.messages.map((message, i)=>{
            if(this.props.to_type === "all"){
                if (message.id !== localStorage.getItem('user')){
                    let image_src = "http://placehold.it/50/55C1E7/fff&text=" + message.id;
                    return (
                        <li className="left clearfix">
                            <span className="chat-img pull-left">
                                <img src={image_src} alt="User Avatar" className="img-circle" />
                            </span>
                            <div className="chat-body clearfix">
                                <div className="header">
                                    <strong className="primary-font">{message.message}</strong> <small className="pull-right text-muted">
                                    <span className="glyphicon glyphicon-time"></span>{message.time}</small>
                                </div>
                            </div>
                        </li>
                    );
                }else{
                    let image_src = "http://placehold.it/50/FA6F57/fff&text=" + message.id;
                    return (
                        <li className="right clearfix">
                            <span className="chat-img pull-right">
                                <img src={image_src} alt="User Avatar" className="img-circle" />
                            </span>
                            <div className="chat-body clearfix">
                                <div className="header">
                                    <small className=" text-muted"><span className="glyphicon glyphicon-time"></span>{message.time}</small>
                                    <strong className="pull-right primary-font">{message.message}</strong>
                                </div>
                            </div>
                        </li>
                    );
                }
            }
            else{
                if(message.to === localStorage.getItem('user') || message.id === localStorage.getItem('user')){
                    if (message.id !== localStorage.getItem('user')){
                        let image_src = "http://placehold.it/50/55C1E7/fff&text=" + message.id;
                        return (
                            <li className="left clearfix">
                                <span className="chat-img pull-left">
                                    <img src={image_src} alt="User Avatar" className="img-circle" />
                                </span>
                                <div className="chat-body clearfix">
                                    <div className="header">
                                        <strong className="primary-font">{message.message}</strong> <small className="pull-right text-muted">
                                        <span className="glyphicon glyphicon-time"></span>{message.time}</small>
                                    </div>
                                </div>
                            </li>
                        );
                    }else{
                        let image_src = "http://placehold.it/50/FA6F57/fff&text=" + message.id;
                        return (
                            <li className="right clearfix">
                                <span className="chat-img pull-right">
                                    <img src={image_src} alt="User Avatar" className="img-circle" />
                                </span>
                                <div className="chat-body clearfix">
                                    <div className="header">
                                        <small className=" text-muted"><span className="glyphicon glyphicon-time"></span>{message.time}</small>
                                        <strong className="pull-right primary-font">{message.message}</strong>
                                    </div>
                                </div>
                            </li>
                        );
                    }
                }
            }


        });
        let users = this.state.clients.map((message, i)=>{
            if (localStorage.getItem('user') !== message.id){
                return (<option value={message.id}>{message.id}</option>)
            }
        });
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <span className="glyphicon glyphicon-comment"></span> To: {this.props.to_type}
                                    <div className="form-group">
                                    <select onChange={this.props.handleToMessage} className="form-control" id="sel1">
                                      <option value="all">All</option>
                                      {users}
                                    </select>
                                  </div>
                                </div>
                                <div id="chat-body" className="panel-body">
                                    <ul className="chat">
                                        {messages}
                                    </ul>
                                </div>
                                <div className="panel-footer">
                                    <div className="col-md-12 input-group">
                                        <input className="form-control input-sm" value={this.props.message} placeholder="Type your message here..." onKeyPress={this.send_message.bind(this)} onChange={this.props.handleChangeMessage.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
};

function mapStateToProps(state) {
    return state;
}

const VisibleChat = connect(
    mapStateToProps,
    ChatActions
)(Chat);

export default VisibleChat;
