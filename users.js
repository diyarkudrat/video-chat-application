const users = [];

const userJoin = (id, username, room) => {
    const user = { id, username, room };
    users.push(user);

    return user;
}

const getCurrentUser = (id) => {
    const currUser = users.find((user) => user.id === id);

    return currUser;
}

const getAllUsers = () => {
    return users;
}

const userLeave = (id) => {
    const idx = users.findIndex((user) => user.id === id);

    if (idx !== -1) {
        const user = users.splice(idx, 1)[0];

        return user;
    }
}

module.exports = {
    userJoin,
    getCurrentUser,
    getAllUsers,
    userLeave
}
