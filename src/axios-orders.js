import axios from 'axios';

/* This baseURL is for database --
    we are gonna create diff instances to store diff inputs.
*/
const instance = axios.create({
    baseURL: 'https://react-my-burger-86716.firebaseio.com/'
});

export default instance;