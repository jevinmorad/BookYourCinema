
export default function addMovie() {
    const [input, setInput] = useState({
        name: "",
        mobile: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <div class="container">
            <form>
                <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Title of the movie"
                        onClick={handleChange}
                    />
                </div>

                <div class="mb-3">
                    <label class="form-label">Poster Url</label>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Url of the poster"
                        onClick={handleChange}
                    />
                </div>

                <div class="mb-3">
                    <label class="form-label">Trailer Url</label>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Url of the trailer"
                        onClick={handleChange}
                    />
                </div>

                <div class="mb-3">
                    <label class="form-label">Language</label>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Language of movie"
                        onClick={handleChange}
                    />
                </div>

                <div class="mb-3">
                    <label class="form-label">Cast</label>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Cast name"
                        onClick={handleChange}
                    />
                </div>

                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Description of the movie"
                        onClick={handleChange}
                    />
                </div>

                <div class="mb-3">
                    <label class="form-label">Release date</label>
                    <input
                        type="date"
                        class="form-control"
                        placeholder="Release date"
                        onClick={handleChange}
                    />
                </div>

                <div class="mb-3">
                    <label class="form-label">Rating</label>
                    <input
                        type="text"
                        class="form-control"
                        placeholder="rating/10"
                        onClick={handleChange}
                    />
                </div>

                <button type="submit" class="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}