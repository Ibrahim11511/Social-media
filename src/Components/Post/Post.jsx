/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./post.module.css";
export default function Post({
  title,
  body,
  userImage,
  postImage,
  commentsCount,
  name,
  postDate,
}) {
  return (
    <div className={styles.postContainer}>
      <div className={styles.userProfile}>
        {typeof userImage === "object" ? (
          <img
            src={"/public/8380015-removebg-preview.png"}
            alt="User"
            className={styles.profileImage}
          />
        ) : (
          <img src={userImage} alt="User" className={styles.profileImage} />
        )}
        <div className={styles.userInfo}>
          <Link to={"/profile"} className={styles.userName}>
            {name}
          </Link>
          <span className={styles.postDate}>{postDate}</span>
        </div>
      </div>

      <div className={styles.postContent}>
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
        <div className={styles.commentCount}>{commentsCount} Comments</div>
        <div className={styles.commentInputWrapper}>
          <input
            type="text"
            placeholder="Write a comment..."
            className={styles.commentInput}
          />
          <button className={styles.commentButton}>Submit</button>
        </div>
      </div>
    </div>
  );
}
