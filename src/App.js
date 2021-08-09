import "./styles.css";
import { useState, useEffect } from "react";
export default function App() {
  return (
    <div className="App">
      <Post></Post>
    </div>
  );
}

function Post() {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((posts) => {
        buildData(posts);
      });
  }, []);

  const buildData = (postData) => {
    postData.map((post, index) => {
      post.key = new Date().getTime().toString() + index;
      post.like = false;
      post.show = true;
      return post;
    });
    setPost(postData.slice(7));
  };

  const handleDelete = (key) => {
    let updatedPost = posts.map((post) => {
      if (key === post.key) {
        post.show = false;
      }
      return post;
    });
    setPost([...updatedPost]);
  };

  const handleLike = (key) => {
    let updatedPost = posts.map((post) => {
      if (key === post.key) {
        post.like = !post.like;
      }
      return post;
    });
    setPost([...updatedPost]);
  };

  return (
    <div>
      {posts.map((post) => {
        return (
          <div
            className={`container1 ${post.show ? " " : "hide"} ${
              post.like ? "active" : ""
            }`}
            key={post.key}
          >
            <div className="title">{post.name}</div>
            <div className="desc">{post.email}</div>
            <button onClick={() => handleDelete(post.key)}>Delete</button>
            <button onClick={() => handleLike(post.key)}>Like</button>
          </div>
        );
      })}
    </div>
  );
}
