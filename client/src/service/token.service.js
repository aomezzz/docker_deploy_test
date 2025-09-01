const getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
  }

const setUser = (user) => {
    localStorage.setItem('user',JSON.stringify(user))
}

const getlocalAccessToken = () => {
    const user = getUser();
    return user?.accessToken;
}

const removeUser = () => {
    localStorage.removeItem('user');
}

const tokenService = {
    getUser,
    setUser,
    getlocalAccessToken,
    removeUser
}

export default tokenService;