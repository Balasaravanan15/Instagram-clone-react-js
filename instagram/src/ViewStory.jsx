import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function ViewStory() {

    const { id, tot } = useParams();

    const [story, setStory] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/stories/${id}`)
            .then((Response) => Response.json())
            .then((data) => setStory(data))
            .catch((error) => console.log(error))
    }, [id])

    if (id > tot || id <= 0) {
        navigate('/')
    }

    return (
        <div>
            {story ?
                <div className="d-flex justify-content-center align-items-center">
                    <Link to={`http://localhost:5173/Story/${Number(id)-1}/${tot}`}><i className="bi bi-arrow-left-circle-fill"></i></Link>
                    <img className="vh-100" src={story.postImage}/>
                    <Link to={`http://localhost:5173/Story/${Number(id)+1}/${tot}`}><i className="bi bi-arrow-right-circle-fill"></i></Link>
                </div> :
                <div>Loading...</div>}
        </div>
    )
}

export default ViewStory;