import AxiosInstance from "../../axios.config";

const getUser = (userId) => {
    return AxiosInstance?.get(`/users/${userId}`);
}

const getBook = (userId, bookId) => {
    return AxiosInstance?.get(`/users/${userId}/books/${bookId}`);
}

const getAllBooks = (userId) => {
    return AxiosInstance?.get(`/users/${userId}/books/`);
}

const getUsersByEmail = (email) => {
    return AxiosInstance?.get(`/users?email=${email}`);
}

const saveUser = (user) => {
    return AxiosInstance?.post(`/users/`, user);
}

const saveBook = (ownerId, book) => {
    return AxiosInstance?.post(`/users/${ownerId}/books/`, book);
}

const updateUser = (userId, userData) => {
    return AxiosInstance?.put(`/users/${userId}`, userData);
}

const updateBook = (bookOwnerId, bookId, data) => {
    return AxiosInstance?.put(`/users/${bookOwnerId}/books/${bookId}`, data);
}

const deleteUser = (userId) => {
    return AxiosInstance?.delete(`/users/${userId}`);
}

const deleteBook = (ownerId, bookId) => {
    return AxiosInstance?.delete(`/users/${ownerId}/books/${bookId}`);
}

export default {
    updateBook,
    getAllBooks,
    getBook,
    getUsersByEmail,
    saveUser,
    saveBook,
    deleteBook,
    deleteUser,
    updateUser,
    getUser,
}
