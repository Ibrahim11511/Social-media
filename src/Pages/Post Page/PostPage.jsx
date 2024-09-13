/* eslint-disable react-hooks/exhaustive-deps */

import { FaUser } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./postpage.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";
export default function Post() {
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [postData, setPostData] = useState([]);
  const [render, setRender] = useState(true);
  const { user } = useContext(UserContext);
  const { post__ID } = useParams();
  const Navigate = useNavigate("");

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
        toast.success("Comment Successfully");
        setComment("");
        setRender(!render);
      })
      .catch((error) => {
        Object.entries(error.response.data.errors).map(([, value]) =>
          toast.error(`${value}`)
        );
      });
  };

  const getPostData = () => {
    axios
      .get(`https://tarmeezacademy.com/api/v1/posts/${post__ID}`)
      .then((response) => {
        setPostData(() => response.data.data);
        setAllComment(response.data.data.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPostData();
  }, [render]);

  return (
    <div className={styles.postContainer}>
      <div className={styles.userProfile}>
        {typeof postData?.author?.profile_image === "string" ? (
          <img
            src={postData.author.profile_image}
            alt="User"
            className={styles.profileImage}
            onClick={() => Navigate(`/profilePage/${postData?.author?.id}`)}
          />
        ) : (
          <FaUser className={styles.profileImage} style={{ padding: "5px" }} />
        )}
        <div className={styles.userInfo}>
          <Link
            to={`/profilePage/${postData?.author?.id}`}
            className={styles.userName}
          >
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
        <div className={styles.allCommentsWrapper}>
          {allComment.map((comment) => (
            <div
              className={styles.singleComment}
              key={`comment-key-${comment.id}`}
            >
              <div className={styles.commentAuthor}>
                {typeof comment?.author?.profile_image === "object" ? (
                  <img
                    src="/public/8380015-removebg-preview.png"
                    alt="User"
                    className={styles.commentAuthorImage}
                    onClick={() =>
                      Navigate(`/profilePage/${comment?.author?.id}`)
                    }
                  />
                ) : (
                  <img
                    src={comment?.author?.profile_image}
                    alt="User"
                    className={styles.commentAuthorImage}
                    onClick={() =>
                      Navigate(`/profilePage/${comment?.author?.id}`)
                    }
                  />
                )}
                <Link to={`/profilePage/${comment?.author?.id}`}>
                  {comment.author.name}
                </Link>
              </div>
              <p>{comment.body}</p>
            </div>
          ))}
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
