
import useUserPosts from '../hooks/useUserPosts';
import '../styles/UserPostsPage.css';

const UserPostsPage = ({ userId }) => {
    const { posts, loading, error } = useUserPosts(userId);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="user-posts-page">
            <h1>Mijn Waarnemingen</h1>
            <div className="posts-container">
                {posts.map((post, index) => (
                    <div key={index} className="polaroid">
                        <div className="polaroid-date-time">
                            <span className="polaroid-date">{new Date(post.date).toLocaleDateString()}</span>
                            <span className="polaroid-time">{post.time}</span>
                        </div>
                        <div className="polaroid-location">{post.municipality}</div>
                        <img src={post.photo} alt="Waarneming" className="polaroid-img" />
                        <div className="polaroid-info">
                            <div className="polaroid-user">{post.username}</div>
                            <p className="polaroid-description">{post.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPostsPage;
