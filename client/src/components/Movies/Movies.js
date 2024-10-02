import { useEffect, useState } from "react";
import { getAllMovies } from "../../api-helpers/api-helper";
import { Link } from "react-router-dom";

export default function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then((movie) => {
                setMovies(movie.data)
            })
            .catch((err) => console.log(err))

    }, []);

    return (
        <div className="container">
          <div className="row">
            {movies.map((movie) => (
              <div className="col-md-3 mb-4" key={movie._id}>
                <Link to={`/movie/${movie._id}`} className="text-decoration-none">
                  <div className="card border-0" style={{ width: "18rem" }}>
                    <img 
                      src={movie.posterUrl} 
                      className="card-img-top" 
                      alt={movie.title}
                      style={{width: '261px', height: '392px'}}  
                    />
                    <div className="card-body px-0">
                      <h5 className="card-title">{movie.title}</h5>
                      <p className="card-text text-muted">{movie.genre.join(", ")}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
}