const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

console.log(username, room, " this is url parmas");

const socket = io("http://localhost:5000/", { autoConnect: false });

socket.emit("joinRoom", { username, room });

socket.on("roomUsers", ({ room, users }) => {
    console.log(room, " this is undefined room");
    console.log(users, " this is users in roomUsers");
    outputRoomName(room);
    outputUsers(users);
});

socket.on("message", message => {
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    socket.emit("chatMessage", msg);
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

function outputMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
       ${message.text}
    </p>`;
    document.querySelector(".chat-messages").appendChild(div);
}

function outputRoomName(room) {
    roomName.innerText = room;
    return room;
}

function outputUsers(users) {
    userList.innerHTML = `
    ${Array.from(users).map(user => `<li>${user.username}</li>`).join("")}
    `;
    return users;
}