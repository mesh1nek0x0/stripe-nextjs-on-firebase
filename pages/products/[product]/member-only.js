import withAuthMember from "../../../components/helpers/withAuthMember";
import { useState, useEffect } from "react";
import { firestore } from "../../../lib/firebase";
import Link from "next/link";
const MemberOnly = props => {
  const [postsState, setPostsState] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await firestore
        .collection("posts")
        .get()
        .then(snapshot => {
          let posts = [];
          snapshot.forEach(doc => {
            posts.push({ key: doc.id, value: doc.data() });
          });
          setPostsState(posts);
        });
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>products/[product]/member-only/</h1>
      <h2>posts</h2>
      <ul>
        {postsState.map(post => {
          return (
            <li key={post.key}>
              <h3>{post.value.title}</h3>
              <ul>
                <li key={post.key}>
                  <p>{post.value.body}</p>
                </li>
              </ul>
              <p>
                {props.currentUser.uid == post.value.createdBy ? (
                  <Link
                    href="/posts/[post]/edit"
                    as={`/posts/${post.key}/edit`}
                  >
                    <a>EDIT</a>
                  </Link>
                ) : (
                  "READ ONLY"
                )}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default withAuthMember(MemberOnly);
