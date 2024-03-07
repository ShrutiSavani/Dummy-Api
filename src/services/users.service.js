export const getAllUser = async () => {
    const responseUsers = await fetch("https://dummyjson.com/users?limit=100");
    const usersRes = await responseUsers.json();
    return usersRes;
}

export const getUserById = async (userId) => {
    const responseUser = await fetch(`https://dummyjson.com/users/${userId}`);
    const usersRes = await responseUser.json();
    return usersRes;
}