import axios from 'axios';

export const getAllMovies = async () => {
    return await axios.get("http://localhost:5000/movies").catch((err) => console.log(err));
};
