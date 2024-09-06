import { MdDeleteForever } from "react-icons/md";
import { useContext, useState } from "react";
import Post from "../../Components/Post/Post";
import Styles from "./createpost.module.css";
import { UserContext } from "../../context/userContext";
import axios from "axios";
export default function CreatePost() {
  const { user } = useContext(UserContext);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    imagePreview: null,
  });

  const handelPostImage = (e) => {
    console.log("start handel picture");
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
      })
      .catch(function (error) {
        console.log(error);
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
          <label htmlFor="file">Choose Your Post Image</label>
        </div>
        <MdDeleteForever />
        <input type="submit" value="Create" />
      </form>
      <Post
        commentsCount={0}
        name={user?.user?.name}
        userImage={user?.user?.profile_image}
        title={newPost.title}
        body={newPost.body}
        postImage={newPost.imagePreview}
      />
    </div>
  );
}
