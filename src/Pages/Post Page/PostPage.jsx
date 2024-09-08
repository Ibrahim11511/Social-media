/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import styles from "./postpage.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
export default function Post() {
  const [comment, setComment] = useState("");
  const [postData, setPostData] = useState([]);
  const { user } = useContext(UserContext);
  const { post__ID } = useParams();

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${user.token}`,
  };

  const handelComment = () => {
    axios
      .post(
        `https://tarmeezacademy.com/api/v1/posts/${postData.id}/comments`,
        JSON.stringify({ body: comment }),
        { headers: headers }
      )
      .then(() => {
        setComment("");
      });
  };

  const getPostData = () => {
    axios
      .get(`https://tarmeezacademy.com/api/v1/posts/${post__ID}`)
      .then((response) => {
        setPostData(() => response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPostData();
  }, [post__ID]);

  return (
    <div className={styles.postContainer}>
      <div className={styles.userProfile}>
        {typeof userImage === "object" ? (
          <img
            src={postData.author.profile_image}
            alt="User"
            className={styles.profileImage}
          />
        ) : (
          <img
            src={"/public/8380015-removebg-preview.png"}
            alt="User"
            className={styles.profileImage}
          />
        )}
        <div className={styles.userInfo}>
          <Link to={"/profile"} className={styles.userName}>
            {postData?.author?.name}
          </Link>
          <span className={styles.postDate}>{postData.created_at}</span>
        </div>
      </div>

      <div className={styles.postContent}>
        <h2>{postData.title}</h2>
        <p>{postData.body}</p>
        {typeof postData.image === "string" ? (
          <img
            src={postData.image}
            alt="Post Content"
            className={styles.postImage}
          />
        ) : null}
      </div>
      <div className={styles.commentSection}>
        <div className={styles.commentCount}>
          {postData.comments_count} Comments
        </div>
        <div className={styles.commentInputWrapper}>
          <input
            type="text"
            placeholder="Write a comment..."
            className={styles.commentInput}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className={styles.commentButton} onClick={handelComment}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
