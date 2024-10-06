import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';

export default function MovieBooking() {
    const [movie, setMovie] = useState({});
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/movies/${id}`);
                setMovie(response.data.movie);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };

        fetchData();
    }, [id]);

    // Helper function to get the year from releaseDate
    function formatDate(dateString) {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    }

    function formatRuntime(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    }

    const handlePosterClick = () => {
        setShowModal(true); // Show modal when poster is clicked
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close modal
    };

    return (
        <div className='details'>
            <div
                className="text-white"
                style={{
                    backgroundColor: "rgb(26, 26, 26)",
                    backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), 
                          url(${movie.posterUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right center"
                }}
            >
                <div className="d-flex align-items-center container p-4">
                    {/* Left side: Movie Poster */}
                    <div className="text-center position-relative">
                        <img
                            src={movie.posterUrl}
                            alt={`${movie.title} Poster`}
                            className="img-fluid rounded shadow-sm"
                            img-fluid rounded shadow-sm
                            style={{ width: '261px', height: '392px', objectFit: 'contain', cursor: 'pointer', cursor: 'pointer' }}
                            onClick={handlePosterClick}
                        />

                        {/* Overlay with Play symbol and Trailer text */}
                        <div className="overlay text-white position-absolute top-50 start-50 translate-middle px-2 "
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "10px", textAlign: "center" }}>
                            <FontAwesomeIcon icon={faPlay} /> Trailer
                        </div>
                    </div>

                    {/* Right side: Movie Details */}
                    <div className="movie-detail" style={{marginLeft: "45px"}}>
                        <h2 className="fs-1 fw-bold">{movie.title}</h2>

                        <div className="mb-2 star d-flex p-3" style={{backgroundColor: "#333", borderRadius: "5px"}}>
                            <div className="icon px-2"><FontAwesomeIcon icon={faStar} /></div>
                            <div className='px-2'>{movie.rating ? movie.rating : 'N/A'}/10</div>
                        </div>
                        <div>
                            {movie.runtime ? formatRuntime(movie.runtime) : 'N/A'}
                            <span className="mx-2">&bull;</span>
                            {movie.genre && movie.genre.length > 0 ? movie.genre.join(', ') : 'N/A'}
                            <span className="mx-2">&bull;</span>
                            {formatDate(movie.releaseDate)}
                        </div>

                        {/* Book Tickets Button */}
                        <button className="btn btn-primary mt-3">Book Tickets</button>
                    </div>
                </div>

                {/* Bootstrap Modal for Trailer */}
                {showModal && (
                    <div className="modal show d-block" tabIndex="-1" onClick={handleCloseModal}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Watch Trailer</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="ratio ratio-16x9">
                                        <iframe
                                            src={movie.trailerUrl}
                                            title="Movie Trailer"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='container'>
                <div className='my-5 about'>
                    <h3>About the movie</h3>
                    <p>{movie.description}</p>
                </div>
                <hr />
                <div className='my-5 cast'>
                    <h3>Cast</h3>
                    <div>{movie.cast}</div>
                </div>
            </div>
        </div>
    )
}
