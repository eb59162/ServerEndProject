function leaveRoom(userEmail, chatRoomUsers) {
    return chatRoomUsers.filter((user) => user.email != userEmail);
}

module.exports = leaveRoom;