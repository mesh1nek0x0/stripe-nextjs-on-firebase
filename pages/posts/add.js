import { firestore } from "../../lib/firebase";
import Link from "next/link";
import { useState } from "react";
import withAuth from "../../components/helpers/withAuth";

const PostEditPage = props => {
  const [postState, setPostState] = useState({
    title: "",
    body: "",
    createdBy: props.currentUser.uid
  });

  const handleTitle = event => {
    const changedContents = {
      title: event.target.value
    };
    setPostState({ ...Object.assign(postState, changedContents) });
  };

  const handleBody = event => {
    const changedContents = {
      body: event.target.value
    };
    setPostState({ ...Object.assign(postState, changedContents) });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await firestore.collection("posts").add({
        title: postState.title,
        body: postState.body,
        createdBy: postState.createdBy
      });

      alert(`success to create a post: ${postState.title}`);
    } catch (e) {
      console.log(e.message);
      alert(`Oops, fail to create a post : ${postState.title} `);
    }
  };

  return (
    <>
      <h1>pages/posts/[post]/edit</h1>
      <Link href="/posts">
        <a>Go Back to Posts List</a>
      </Link>
      <h2>POST DETAIL</h2>
      <ul>
        <li>
          TITLE:
          <input
            type="text"
            value={postState.title}
            onChange={handleTitle}
          ></input>
        </li>
        <li>
          BODY:
          <textarea
            defaultValue={postState.body}
            onChange={handleBody}
          ></textarea>
        </li>
      </ul>
      <button type="submit" onClick={handleSubmit}>
        ADD
      </button>
    </>
  );
};

export default withAuth(PostEditPage);
