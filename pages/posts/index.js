import { firestore } from "../../lib/firebase";
import Link from "next/link";

const PostPage = props => {
  return (
    <>
      <h1>pages/posts/index</h1>
      <ul>
        {props.posts.map(post => {
          return (
            <li key={post.id}>
              <Link href="/posts/[post]" as={`/posts/${post.id}`}>
                <a>{post.title}</a>
              </Link>
              <ul>
                <li>{post.title}</li>
                <li>{post.body}</li>
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
};

PostPage.getInitialProps = async () => {
  const result = await firestore
    .collection("posts")
    .get()
    .then(snapshot => {
      let data = [];
      snapshot.forEach(doc => {
        data.push(
          Object.assign(
            {
              id: doc.id
            },
            doc.data()
          )
        );
      });

      return data;
    });
  return { posts: result };
};

export default PostPage;
