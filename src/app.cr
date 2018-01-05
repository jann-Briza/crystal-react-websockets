require "kemal"
require "json"

messages = [] of String
users = [] of String
sockets = [] of HTTP::WebSocket

public_folder "src/assets"

ws "/" do |socket|
  sockets.push socket
  # Handle incoming message and dispatch it to all connected clients
  socket.on_message do |message|
    data_message = JSON.parse(message) # parse the message
    case data_message["type"] #determine the type of the message
    when "ADD_MESSAGE" #if the data is message
      messages.push message
      sockets.each do |a_socket|
        a_socket.send messages.to_json
      end
    when "USER_JOIN" #if a user subscribe
      exist = true
      messages.each do |m| # check all the current users and if the new user is name is unique
        subscriber = JSON.parse(m)
        if subscriber["id"] == data_message["id"] && subscriber["type"] == "USER_JOIN"
          exist = false
        end
      end
      if exist == true
        messages.push message
        sockets.each do |a_socket|
          a_socket.send messages.to_json
        end
      end
    end
  end

  # Handle disconnection and clean sockets
  socket.on_close do |_|
    sockets.delete(socket)
    puts "Closing Socket: #{socket}"
  end
end

Kemal.run
