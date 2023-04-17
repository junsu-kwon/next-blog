import { getPostByPath, getPostDetailByPath, getPosts } from '@/service/posts';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { BiRightArrowAlt } from 'react-icons/bi';
import { notFound } from 'next/navigation';
import MarkdownViewer from '@/components/MarkdownViewer';
import Image from 'next/image';
import Link from 'next/link';

export default async function PostDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const posts = await getPosts();

  const postIndex = posts.findIndex((post) => post.path === slug);
  const prevPost =
    postIndex - 1 < 0 ? posts[posts.length - 1] : posts[postIndex - 1];
  const nextPost =
    postIndex + 1 > posts.length - 1 ? posts[0] : posts[postIndex + 1];

  const post = await getPostByPath(slug);

  if (!post) {
    notFound();
  }

  const postDetail = await getPostDetailByPath(slug);

  return (
    <section className="rounded-2xl overflow-hidden mt-10 bg-gray-900">
      <Image
        className="w-full h-96 object-fill"
        src={`/images/posts/${slug}.png`}
        alt="대표이미지"
        width={500}
        height={300}
      />
      <div className="py-2 px-5">
        <p className="text-right text-xs text-sky-300">
          <BsFillCalendarDateFill className="inline mr-2" />
          {post.date}
        </p>
        <h1 className="my-1 text-5xl font-bold">{post.title}</h1>
        <h2 className="my-1 text-sm">{post.description}</h2>
        <div className="my-5 text-gray-400 border-b-4 border-sky-400 w-60"></div>
        <MarkdownViewer content={postDetail} />
      </div>

      <div className="flex mt-5 h-52 overflow-hidden">
        <Link
          href={`/posts/${prevPost.path}`}
          className="h-full w-full hover:opacity-90"
        >
          <div
            className="h-full flex-auto flex justify-center items-center relative"
            style={{
              backgroundImage: `url('/images/posts/${prevPost.path}.png')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <div className="w-full h-full bg-gray-800 opacity-60 absolute top-0 left-0"></div>
            <BiLeftArrowAlt className="absolute left-3 text-7xl text-yellow-200" />
            <div className="relative text-center">
              <h1 className="text-3xl">{prevPost.title}</h1>
              <h3 className="mt=1 text-sm">{prevPost.description}</h3>
            </div>
          </div>
        </Link>
        <Link
          href={`/posts/${nextPost.path}`}
          className="h-full w-full hover:opacity-90"
        >
          <div
            className="h-full flex-auto flex justify-center items-center relative"
            style={{
              backgroundImage: `url('/images/posts/${nextPost.path}.png')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <div className="w-full h-full bg-gray-800 opacity-60 absolute top-0 left-0"></div>
            <BiRightArrowAlt className="absolute right-3 text-7xl text-yellow-200" />
            <div className="relative text-center">
              <h1 className="text-3xl">{nextPost.title}</h1>
              <h3 className="mt=1 text-sm">{nextPost.description}</h3>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ path }) => ({
    slug: path,
  }));
}
