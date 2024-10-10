import axios from 'axios';

export const getAllMovies = async () => {
    return await axios.get("/movies")
        .catch((err) => console.error('Error during API request:', err.response?.data || err.message));
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

export const adminAuthRequest = async (data, isSignIn) => {
    try {
        const res = await axios.post(`/admin/${isSignIn ? "signin" : "signup"}`, {
            ...(isSignIn ? {} : { adminName: data.name, phone: data.mobile }),
            email: data.email,
            password: data.password,
        });

        return res.data;

    } catch (err) {
        console.error('Error during API request:', err.response?.data || err.message);
    }
}

export const addMovie = async (data) => {
    console.log(data);

    try {
        const res = await axios.post(`/movies/`, {
            title: data.title,
            posterUrl: data.posterUrl,
            trailerUrl: data.trailerUrl,
            language: data.language,
            cast: data.cast,
            description: data.description,
            genre: data.genre,
            releaseDate: data.releaseDate,
            duration: data.duration,
            rating: data.rating,
            admin: localStorage.getItem('adminId'),
        },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.error('Error during API request:', err.response?.data || err.message);
    }
}