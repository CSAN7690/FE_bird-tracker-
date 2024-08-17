import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NewSightingPage.css';

const NewSightingPage = () => {
    const [sighting, setSighting] = useState({
        bird_id: '',
        location: '',
        date: '',
        time: '',
        notes: '',
        photo_url: ''
    });
    const [birds, setBirds] = useState([]);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${apiUrl}/birds`)
            .then(response => setBirds(response.data))
            .catch(error => console.error(error));
    }, [apiUrl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSighting({ ...sighting, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", sighting);
        axios.post(`${apiUrl}/sightings`, sighting)
            .then(() => navigate('/'))
            .catch(error => console.error(error));
    };

    return (
        <div className="new-sighting-page">
            <h2>Add New Sighting</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Bird Species:
                    <select
                        name="bird_id"
                        value={sighting.bird_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a bird species</option>
                        {birds.map(bird => (
                            <option key={bird.bird_id} value={bird.bird_id}>
                                {bird.species}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={sighting.location}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={sighting.date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Time:
                    <input
                        type="time"
                        name="time"
                        value={sighting.time}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Notes:
                    <textarea
                        name="notes"
                        value={sighting.notes}
                        onChange={handleChange}
                    ></textarea>
                </label>
                <label>
                    Photo URL:
                    <input
                        type="text"
                        name="photo_url"
                        value={sighting.photo_url}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewSightingPage;
