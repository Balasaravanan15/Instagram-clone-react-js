import axios from 'axios';
import { useEffect, useState } from 'react';

const Profile = () => {

    const [profile, setProfile] = useState(null);

    const [followers, setFollowers] = useState([])

    const [unfollowed, setUnfollowed] = useState(0)

    useEffect(() => {
        axios.get('http://localhost:8080/profile')
            .then(data => setProfile(data.data))
            .catch(error => console.log(error))

        axios.get('http://localhost:8080/followers')
            .then(data => setFollowers(data.data))
            .catch(error => console.log(error))
    }, [unfollowed])

    const handleUnFollow = async (id) => {
        axios.delete(`http://localhost:8080/followers/${id}`)
            .then(alert('unfollowed'))
            .then(setUnfollowed(!unfollowed))
            .catch(error => console.log(error))
    }

    const handleOnChange = (e) => {
        setProfile(prev => ({
            ...prev,
            [e.target.name]: [e.target.value]
        }))
    }

    const handleUpdate = async () => {
        axios.put('http://localhost:8080/profile', profile)
            .then(console.log('updated'))
            .catch(error => console.log(error))
    }

    return (
        <div className='m-5'>
            {profile ? (
                <div>
                    <img src={profile.profileImage} className='profile rounded-circle' />
                    <h5>{profile.username}</h5>

                    <input type='text'
                        value={profile.username}
                        name='username'
                        className='form-control my-4'
                        onChange={handleOnChange}
                    />

                    <input type='text'
                        name='profile_pic'
                        value={profile.profileImage}
                        className='form-control'
                        onChange={handleOnChange}
                    />

                    <button
                        className='btn btn-primary my-4'
                        onClick={handleUpdate}
                    >Update</button>
                </div>
            ) : (
                <div>

                </div>
            )}
            {followers.length > 0 ? (
                <div>
                    {followers.map(follower => (
                        <div key={follower.id} className='d-flex my-2'>
                            {follower.username}
                            <button className='btn btn-secondary ms-auto' onClick={() => { handleUnFollow(follower.id) }}>unfollow</button>
                        </div>

                    ))}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default Profile;