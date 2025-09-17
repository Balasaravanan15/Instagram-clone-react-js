import { useEffect, useState } from "react"

const Posts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/posts')
            .then((Response) => Response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.log(error))
    }, []);

    // console.log({ posts })

    return (
        <div className="d-flex justify-content-center">
            {posts.length > 0 ? (
                <div>
                    {posts.map((post) => (
                        <div className="my-3" key={post.id}>
                            <div className="d-flex">
                                <img className="dp rounded-circle" src={post.profileImage} alt="profile-pic" />
                                <h5>{post.username}</h5>
                            </div>
                            <img className="image" src={post.postImage} alt="post-image" />
                            <div>
                                <i className="bi bi-heart"></i>
                                <i className="bi bi-chat"></i>
                                <i className="bi bi-send"></i>
                            </div>
                            <div>
                                <b>{post.likes} Likes</b>
                            </div>
                            <p>{post.caption}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div>
                    Loading Posts...
                </div>
            )}

        </div>
    )
}

export default Posts