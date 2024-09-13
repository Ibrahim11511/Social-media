/* eslint-disable react-hooks/exhaustive-deps */
import { FaUser } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import Styles from "./profilepage.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "../../Components/Post/Post";
import { ForcedRender } from "../../context/forcedRender";
export default function SinglePage() {
  const { user__ID } = useParams();
  const [userData, setUserData] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const { forcedRender } = useContext(ForcedRender);

  const getUserData = () => {
    axios
      .get(`https://tarmeezacademy.com/api/v1/users/${user__ID}`)
      .then((response) => {
        setUserData(() => response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserPosts = () => {
    axios
      .get(`https://tarmeezacademy.com/api/v1/users/${user__ID}/posts`)
      .then((response) => {
        setUserPosts(() => response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserData();
    getUserPosts();
  }, [forcedRender]);
  return (
    <div className={Styles.profilePage}>
      <div className={Styles.header}>
        <div className={Styles.leftSide}>
          {typeof userData.profile_image === "object" ? (
            <FaUser />
          ) : (
            <img
              src={userData?.profile_image}
              alt="User"
              className={Styles.profileImage}
            />
          )}
          <span>Name : {userData.name}</span>
          <span>UserName :@{userData.username}</span>
        </div>
        <div className={Styles.rightSide}>
          {userData.email === null ? (
            <span>Email : No Email</span>
          ) : (
            <span>Email : {userData.email}</span>
          )}
          <span>Posts : {userData.posts_count} Posts</span>
        </div>
      </div>
      <div className={Styles.postWrapper}>
        {userPosts.map((post) => (
          <Post
            key={`user-post-key-${post.id}`}
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
    </div>
  );
}
