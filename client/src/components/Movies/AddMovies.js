import { useState } from "react";
import { addMovie } from "../../api-helpers/api-helper";

export default function AddMovie() {
    const [input, setInput] = useState({
        title: "",
        posterUrl: "",
        trailerUrl: "",
        language: [],
        cast: [],
        description: "",
        genre: "",
        releaseDate: "",
        duration: "",
        rating: "",
    })

    const [castArray, setCastArray] = new useState([]);
    const [cast, setCast] = new useState("");
    const [languageArray, setLanguageArray] = useState([]);
    const [language, setLanguage] = new useState("");
    const [genreArray, setGenreArray] = useState([]);
    const [genre, setGenre] = new useState("");

    const handleChange = (e) => {
        setInput((prevInput) => ({
            ...prevInput,
            [e.target.name]: e.target.value,
            language: languageArray,
            cast: castArray,
            genre: genreArray,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setInput((prevInput) => ({
            ...prevInput,
            language: languageArray,
            cast: castArray,
            genre: genreArray,
        }))
        console.log("input: ",input);
        
        addMovie({ ...input, languageArray, castArray, genreArray })
            .then((res) => console.log(res))
            .catch((err) => console.error(err.message))
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={input.title}
                        placeholder="Title of the movie"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Poster Url</label>
                    <input
                        type="text"
                        className="form-control"
                        name="posterUrl"
                        value={input.posterUrl}
                        placeholder="Url of the poster"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Trailer Url</label>
                    <input
                        type="text"
                        className="form-control"
                        name="trailerUrl"
                        value={input.trailerUrl}
                        placeholder="Url of the trailer"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Language</label>
                    <input
                        type="text"
                        className="form-control"
                        name="language"
                        value={language}
                        placeholder="Language of movie"
                        onChange={(e) => setLanguage(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-primary mt-1"
                        onClick={(e) => {
                            e.preventDefault();
                            setLanguageArray((prev) => [...prev, language]);
                            setLanguage("")
                        }}
                    >
                        Add
                    </button>
                </div>

                <div className="mb-3">
                    <label className="form-label">Cast</label>
                    <input
                        type="text"
                        className="form-control"
                        name="cast"
                        value={cast}
                        placeholder="Cast name"
                        onChange={(e) => setCast(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-primary mt-1"
                        onClick={(e) => {
                            e.preventDefault();
                            setCastArray((prev) => [...prev, cast]);
                            setCast("");
                        }}
                    >
                        Add
                    </button>
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={input.description}
                        placeholder="Description of the movie"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Genre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="genre"
                        value={genre}
                        placeholder="Cast name"
                        onChange={(e) => setGenre(e.target.value)}
                    />
                    <button
                        type="button"
                        className="btn btn-primary mt-1"
                        onClick={(e) => {
                            e.preventDefault();
                            setGenreArray((prev) => [...prev, genre]);
                            setGenre("");
                        }}
                    >
                        Add
                    </button>
                </div>

                <div className="mb-3">
                    <label className="form-label">Release date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="releaseDate"
                        value={input.releaseDate}
                        placeholder="Release date"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Duration</label>
                    <input
                        type="text"
                        className="form-control"
                        name="duration"
                        value={input.duration}
                        placeholder="duration minute"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <input
                        type="text"
                        className="form-control"
                        name="rating"
                        value={input.rating}
                        placeholder="rating/10"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}