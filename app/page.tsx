import { getPosts } from '@/service/posts';
import Postcard from '@/components/Postcard';
import Profile from './Profile';
import PostsCarousel from '@/components/PostsCarousel';

export default async function Home() {
  const allPosts = await getPosts();
  const featuredPosts = allPosts.slice(0, 5);
  const youMayLikePosts = allPosts.slice(5);

  return (
    <>
      <Profile />
      <section className="mt-4">
        <h1 className="text-lg mb-1">Featured Posts</h1>
        <div className="flex flex-auto flex-wrap">
          {featuredPosts.map((post) => (
            <Postcard key={post.path} post={post} />
          ))}
        </div>
      </section>
      <PostsCarousel posts={youMayLikePosts} />
    </>
  );
}
