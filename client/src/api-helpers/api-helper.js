import axios from 'axios';

export const getAllMovies = async () => {
    return await axios.get("/movies").catch((err) => console.log(err));
};

export const userAuthRequest = async (data, isSignIn) => {
    try {
        const res = await axios.post(`/user/${isSignIn ? "signin" : "signup"}`, {
            ...(isSignIn ? {} : { username: data.name, phone: data.mobile }),
            email: data.email,
            password: data.password,
        });
        
        return res.data;

    } catch (err) {
        console.error('Error during API request:', err.response?.data || err.message);
    }
};