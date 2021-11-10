
// const addUser = ({id, name, room}) => {
//     name = name.trim().toLowverCase();
//     room = room.trim().toLowverCase();

//     const existingUser = users.find((user) => user.room === room && user.name ===name);
//     if(existingUser) {
//         return {error :'Username is taken'};
//     }
//     const user = {id, name, room};
//     users.push(user);

//     return {user}
// }

const addUser = ({id, userNickname, room}) => {

    room = room.trim().toLowverCase();

    const user = {id, userNickname, room};
    users.push(user);

    return {user}
}
//name => userNickname으로 바꿈

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1 ) {
        return users.splice(index, i)[0]
    }
}

const getUser = (id) => users.find((user) => user.id === id);


const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.export = {addUser, removeUser,getUser,getUsersInRoom};