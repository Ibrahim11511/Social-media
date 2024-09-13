import { useContext, useState } from "react";
import Post from "../../Components/Post/Post";
import Styles from "./createpost.module.css";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function CreatePost() {
  const { user } = useContext(UserContext);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    imagePreview: null,
  });
  const Navigate = useNavigate("");
  const handelPostImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      setNewPost((prev) => ({ ...prev, image: file }));
      reader.readAsDataURL(file);
      reader.onload = function () {
        setNewPost((prev) => ({ ...prev, imagePreview: reader.result }));
      };
    }
  };

  const createPost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("body", newPost.body);
    if (newPost.image) formData.append("image", newPost.image);
    const headers = {
      "Content-type": "multipart/form-data",
      authorization: `Bearer ${user.token}`,
    };
    axios
      .post("https://tarmeezacademy.com/api/v1/posts", formData, {
        headers: headers,
      })
      .then(() => {
        setNewPost({ title: "", body: "", imagePreview: null });
        Navigate("/home");
        toast.success("Your Post Successfully Created");
      })
      .catch(function (error) {
        Object.entries(error.response.data.errors).map(([, value]) =>
          toast.error(`${value}`)
        );
      });
  };

  return (
    <div className={Styles.CreatePost}>
      <form onSubmit={createPost}>
        <input
          type="text"
          placeholder="Post Title..."
          onChange={(e) =>
            setNewPost((prev) => ({ ...prev, title: e.target.value }))
          }
          value={newPost.title}
        />
        <input
          type="text"
          placeholder="Post Body..."
          onChange={(e) =>
            setNewPost((prev) => ({ ...prev, body: e.target.value }))
          }
          value={newPost.body}
        />
        <div className={Styles.pictureWrapper}>
          <input
            type="file"
            className={Styles.inputfile}
            id="file"
            onChange={handelPostImage}
          />
          <label htmlFor="file">Picture</label>
        </div>
        <input type="submit" value="Create" />
      </form>
      <Post
        title={newPost.title}
        body={newPost.body}
        userImage={user?.user?.profile_image}
        postImage={newPost.imagePreview}
        commentsCount={0}
        name={user?.user?.name}
        postDate={"1 minute ago"}
        postID={""}
        userID={""}
      />
    </div>
  );
}
