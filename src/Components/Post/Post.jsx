/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import styles from "./post.module.css";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { ForcedRender } from "../../context/forcedRender";
export default function Post({
  title,
  body,
  userImage,
  postImage,
  commentsCount,
  name,
  postDate,
  postID,
  userID,
}) {
  const [comment, setComment] = useState("");
  const [comment_count, setComment_count] = useState(commentsCount);
  const { user } = useContext(UserContext);
  const { forcedRender, setForcedRender } = useContext(ForcedRender);
  const Navigate = useNavigate("");

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${user.token}`,
  };

  const handelComment = () => {
    axios
      .post(
        `https://tarmeezacademy.com/api/v1/posts/${postID}/comments`,
        JSON.stringify({ body: comment }),
        { headers: headers }
      )
      .then(() => {
        toast.success("Comment Successfully");
        setComment_count(() => comment_count + 1);
        setComment("");
      })
      .catch((error) => {
        Object.entries(error?.response?.data?.errors).map(([, value]) =>
          toast.error(`${value}`)
        );
      });
  };

  const handelDeletePost = () => {
    const headers = {
      "Content-type": "multipart/form-data",
      authorization: `Bearer ${user.token}`,
    };
    axios
      .delete(`https://tarmeezacademy.com/api/v1/posts/${postID}`, {
        headers: headers,
      })
      .then(() => {
        setForcedRender(!forcedRender);
        toast.success("Your Post Successfully Deleted");
      });
  };

  return (
    <div className={styles.postContainer}>
      {user.user.id == userID ? (
        <button className={styles.deleteBtn} onClick={handelDeletePost}>
          Delete
        </button>
      ) : null}
      <div className={styles.userProfile}>
        {typeof userImage === "object" ? (
          <FaUser />
        ) : (
          <img
            src={userImage}
            alt="User"
            className={styles.profileImage}
            onClick={() => Navigate(`/profilePage/${userID}`)}
          />
        )}

        <div className={styles.userInfo}>
          <Link to={`/profilePage/${userID}`} className={styles.userName}>
            {name}
          </Link>
          <span className={styles.postDate}>{postDate}</span>
        </div>
      </div>

      <div
        className={styles.postContent}
        onClick={() => Navigate(`/postPage/${postID}`)}
      >
        <h2>{title}</h2>
        <p>{body}</p>
        {typeof postImage === "string" ? (
          <img
            src={postImage}
            alt="Post Content"
            className={styles.postImage}
          />
        ) : null}
      </div>

      <div className={styles.commentSection}>
        <div className={styles.commentCount}>{comment_count} Comments</div>
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
