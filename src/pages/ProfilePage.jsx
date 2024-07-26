import React, { useState, useEffect } from 'react';
import { fetchUserPosts } from '../services/postService.jsx';

const ProfilePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchUserPosts().then(data => setPosts(data));
    }, []);

    return (
        <div>
            <h1>Mijn Waarnemingen</h1>
            {posts.map(post => (
                <div key={post.id}>
                    <p>{post.description}</p>
                    <img src={post.imageUrl} alt="IJsvogel" />
                </div>
            ))}
        </div>
    );
};

export default ProfilePage;
