import axios from 'axios'

const url = 'http://localhost:5000/api/beers/';

class PostService {
    // Get Posts
    static getPosts() {
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map( post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            } catch(err) {
                reject(err);
            }
        });
    }

    // Create Post
    static insertPost(name, description, image, rating) {
        return axios.post(url, {
            name, description, image, rating
        });
    }

    // Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;
