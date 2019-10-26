import { firestore } from "../../../lib/firebase";
import Link from "next/link";
import { useState } from "react";

const PostEditPage = ({ post }) => {
  const [postState, setPostState] = useState({
    id: post.id,
    title: post.title,
    body: post.body,
    createdBy: post.createdBy
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
      await firestore
        .collection("posts")
        .doc(postState.id)
        .set({
          title: postState.title,
          body: postState.body,
          createdBy: postState.createdBy
        });

      alert(`${postState.id} has been updated`);
    } catch (e) {
      console.log(e.message);
      alert(`Oops, ${postState.id} has not been updated`);
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
        UPDATE
      </button>
    </>
  );
};
PostEditPage.getInitialProps = async ({ query }) => {
  const result = await firestore
    .collection("posts")
    .doc(query.post)
    .get()
    .then(snapshot => {
      return { id: snapshot.id, ...snapshot.data() };
    });
  return { post: result };
};

export default PostEditPage;
