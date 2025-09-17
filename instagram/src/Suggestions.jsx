import axios from "axios";
import { useEffect, useState } from "react";

function Suggestions() {

    const [profile, setProfile] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/profile')
            .then((Response) => Response.json())
            .then((data) => setProfile(data))
            .catch((error) => console.log(error))

        fetch('http://localhost:8080/suggestions')
            .then((Response) => Response.json())
            .then((data) => setSuggestions(data))
            .catch((error) => console.log(error))
    }, [])

    const handleFollow = async (id, username) => {
        axios.post('http://localhost:8080/followers', { "id": id, "username": username })
            .then(alert('followed'))
            .catch(error=>console.log(error))
    }
    return (
        <div>
            <div className="suggestions w-75 m-4">
                <div className="d-flex">
                    <img className="dp rounded-circle" src={profile.profileImage} alt="profile-pic" />
                    <h5>{profile.username}</h5>
                    <small className="ms-auto text-primary">Switch</small>
                </div>
                <div className="d-flex">
                    <p>Suggested for you</p>
                    <b className="ms-auto">See All</b>
                </div>
                {suggestions.length > 0 ? (
                    <div>
                        {suggestions.map((suggestion) => (
                            <div key={suggestion.id}>
                                <div className="d-flex">
                                    <img className="dp rounded-circle" src={suggestion.profileImage} alt="profile-pic" />
                                    <h5>{suggestion.username}</h5>
                                    <a className="text-primary ms-auto" onClick={()=>{handleFollow(suggestion.id, suggestion.username)}}>Follow</a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>

    )
}

export default Suggestions;