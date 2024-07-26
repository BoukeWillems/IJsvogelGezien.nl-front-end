import { useState, useEffect } from 'react';

const useUserPosts = (userId) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                setLoading(true);
                // Vervang met je backend endpoint
                const response = await fetch(`YOUR_BACKEND_ENDPOINT/user-posts?userId=${userId}`);
                const data = await response.json();
                // Sorteer posts van nieuw naar oud
                const sortedPosts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setPosts(sortedPosts);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, [userId]);

    return { posts, loading, error };
};

export default useUserPosts;
