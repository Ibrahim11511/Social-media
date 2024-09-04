import axios from "axios";
import Post from "../../Components/Post/Post";
import Styles from "./home.module.css";
import { useEffect, useState } from "react";
export default function Home() {
  const [posts, setPosts] = useState([]);

  const getPost = () => {
    axios
      .get("https://tarmeezacademy.com/api/v1/posts?limit=20")
      .then(function (response) {
        setPosts(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className={Styles.homePage}>
      {posts.map((post) => (
        <Post
          key={`post-key-${post.id}`}
          title={post.title}
          body={post.body}
          userImage={post.author.profile_image}
          postImage={post.image}
          commentsCount={post.comments_count}
          name={post.author.name}
          postDate={post.created_at}
        />
      ))}
    </div>
  );
}
