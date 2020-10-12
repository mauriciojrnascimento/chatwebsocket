"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

//Disable send button until connection is established
document.getElementById("messageInput").disabled = true;

connection.on("Message", function (message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = "Anônimo diz: " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("messageInput").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("messageInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter")
    {
        var message = document.getElementById("messageInput");
        connection.invoke("SendMessage", message.value).then(() => {
            message.value = '';
        }).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();    
    }
    
});