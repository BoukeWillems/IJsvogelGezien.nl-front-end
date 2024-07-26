export const fetchRecentPosts = async () => {
    const response = await fetch('/api/recent-posts');
    const data = await response.json();
    return data;
};

export const fetchLocalPosts = async () => {
    const response = await fetch('/api/local-posts');
    const data = await response.json();
    return data;
};

export const addPost = async (formData) => {
    const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    return data;
};

export const fetchMapPosts = async () => {
    const response = await fetch('/api/map-posts');
    const data = await response.json();
    return data;
};

export const fetchUserPosts = async () => {
    const response = await fetch('/api/user-posts');
    const data = await response.json();
    return data;
};

export const searchPosts = async (criteria) => {
    const response = await fetch(`/api/search-posts?criteria=${criteria}`);
    const data = await response.json();
    return data;
};
