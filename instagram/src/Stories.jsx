import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Stories() {
    const [stories, setStories] = useState([]);

    const navigate = useNavigate();

    let tot = 0;

    useEffect(() => {
        fetch('http://localhost:8080/stories')
            .then((Response) => Response.json())
            .then((data) => setStories(data))
            .catch((error) => console.log(error))
    }, [])

    return (
        <div className="story d-flex">
            <div className="d-none">{tot=stories.length}</div>
            {stories.length > 0 ? (
                stories.map((story) => (
                    <div key={story.id} className="ms-1" onClick={()=>{navigate(`/Story/${story.id}/${tot}`)}}>
                        <div className="gradient-broder">
                            <img src={story.profileImage} className="story-dp rounded-circle" />
                        </div>
                        <p className="text-truncate" style={{ width: "50px" }}>{story.username}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Stories;