import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const HomePage = () => {
    const [sightings, setSightings] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    // Implenting editing feature for Notes
    const [editing, setEditing] = useState(null); //Track WHICH sighting is being edited
    const [editedNotes, setEditedNotes] = useState(''); // STORES the current edited Notes

    useEffect(() => {
        axios.get(`${apiUrl}/sightings`)
            .then(async response => {
                const sightingsData = await Promise.all(response.data.map(async sighting => {
                    try {
                        const wikiResponse = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(sighting.species)}`);
                        sighting.image_url = wikiResponse.data.thumbnail ? wikiResponse.data.thumbnail.source : '';
                    } catch (error) {
                        console.error('Error fetching Wikipedia data:', error);
                    }
                    return sighting;
                }));
                setSightings(sightingsData);
            })
            .catch(error => console.error('Error fetching sightings:', error));
    }, [apiUrl]);

    // Added funciton to handle delete a sighting in the event a bird longer appears/ may be 💀
    const deleteSighting = (id) => {
        axios.delete(`${apiUrl}/sightings/${id}`)
            .then(() => {
                setSightings(sightings.filter(sighting => sighting.sighting_id != id));
            })
            .catch(error => console.error('Error deleting sighting:', error))
    };


    // Added function to handle editing NOTES
    const startEditing = (id, currentNotes) => {
        setEditing(id);
        setEditedNotes(currentNotes);
    };

    const saveNotes = (id) => {
        axios.put(`${apiUrl}/sightings/${id}`, { notes: editedNotes })
            .then(() => {
                setSightings(sightings.map(sighting =>
                    sighting.sighting_id === id ? { ...sighting, notes: editedNotes } : sighting
                ));
                setEditing(null);
            })
            .catch(error => console.error('Error saving notes:', error));
    };

    const cancelEditing = () => {
        setEditing(null);
        setEditedNotes('');
    };

    return (
        <div className="homepage">
            <h2>Bird Sightings</h2>
            <div className="map">Map of Rehabilitated Birds</div>
            <h3>Recent Sightings</h3>
            <table>
                <thead>
                    <tr>
                        <th>Bird Image</th>
                        <th>Bird Species</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Notes</th>
                        <th>Bye Bye, Birdie 🐦</th>
                    </tr>
                </thead>
                <tbody>
                    {sightings.map(sighting => (
                        <tr key={sighting.sighting_id}>
                            <td>
                                <img
                                    src={sighting.image_url}
                                    alt={sighting.species}
                                    className="bird-image"
                                />
                            </td>
                            <td>{sighting.species}</td>
                            <td>{sighting.location}</td>
                            <td>{sighting.date}</td>
                            <td>{sighting.time}</td>

                            <td>
                                {editing === sighting.sighting_id ? (
                                    <div>
                                        <textarea
                                            value={editedNotes}
                                            onChange={(e) => setEditedNotes(e.target.value)}
                                        />
                                        <button onClick={() => saveNotes(sighting.sighting_id)}>Save</button>
                                        <button onClick={cancelEditing}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <span>{sighting.notes}</span>
                                        <button onClick={() => startEditing(sighting.sighting_id, sighting.notes)}>Edit</button>
                                    </div>
                                )}
                            </td>
                            <td>
                                <button onClick={() => deleteSighting(sighting.sighting_id)}>
                                    <i className="fa-duotone fa-solid fa-feather-pointed"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <button className="add-sighting-button">Add New Sighting</button> */}
        </div>
    );
};

export default HomePage;
