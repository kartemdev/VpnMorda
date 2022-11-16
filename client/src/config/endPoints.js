const { REACT_APP_HOST: host } = process.env;

export const signUp = () => `${host}/auth/signup`;
export const signIn = () => `${host}/auth/signin`;
export const signOut = () => `${host}/auth/signout`;
export const checkAuth = () => `${host}/auth/check`;

export const getAllUsers = () => `${host}/lk/allusers`;
export const editAllUsers = (id) => `${host}/lk/allusers/${id}`;
export const editUser = (id) => `${host}/lk/user/${id}`;
export const getUser = (id) => `${host}/lk/user/${id}`;
export const blockUser = (id) => `${host}/lk/blockuser/${id}`;

export const getAllAccAdm = (id) => `${host}/lk/allaccs/${id}`;
export const getOneAcc = (id) => `${host}/lk/oneacc/${id}`;
export const newAcc = () => `${host}/lk/newacc`;
export const editAllAcc = (id) => `${host}/lk/accs/${id}`;
export const getUserAllAcc = () => `${host}/lk/myaccs`;
