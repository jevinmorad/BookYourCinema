import axios from 'axios';

export const getAllMovies = async () => {
    return await axios.get("/movies").catch((err) => console.log(err));
};

export const userAuthRequest = async (data, isSignIn) => {
    const res = await axios
        .post(`/user/${isSignIn ? "signin" : "signup"}`, {
            username: isSignIn ? undefined : data.name,
            email: data.email,
            password: data.password,
            phone: isSignIn ? undefined : data.mobile,
        })
        .catch((err) => console.log(err));

    return res.data;
};
