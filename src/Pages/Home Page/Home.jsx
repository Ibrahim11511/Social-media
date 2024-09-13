/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Post from "../../Components/Post/Post";
import Styles from "./home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState({ currentPage: 1, lastPage: 5 });

  const getPost = () => {
    axios
      .get(
        `https://tarmeezacademy.com/api/v1/posts?limit=10&page=${page.currentPage}`
      )
      .then(function (response) {
        setPage((prev) => ({
          ...prev,
          lastPage: response.data.meta.last_page,
        }));
        if (page.currentPage === 1) {
          setPosts(() => response.data.data);
        } else {
          setPosts((prev) => [...prev, ...response.data.data]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPost();
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight &&
        page.currentPage <= page.lastPage
      ) {
        setPage((prev) => ({ ...prev, currentPage: page.currentPage + 1 }));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page.currentPage]);

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
          postID={post.id}
          userID={post.author.id}
        />
      ))}
    </div>
  );
}
