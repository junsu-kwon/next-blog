'use client';

import Image from 'next/image';
import { Post } from '@/service/posts';
import { useRouter } from 'next/navigation';

export default function Postcard({ post }: { post: Post }) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/posts/${post.path}`);
  };

  return (
    <div
      className="pb-4 m-2 mr-3 cursor-pointer hover:bg-gray-800 rounded-lg shadow-md shadow-slate-700 overflow-hidden hover:shadow-lg hover:shadow-gray-500"
      onClick={onClick}
    >
      <Image
        src={`/images/posts/${post.path}.png`}
        alt="이미지"
        width={500}
        height={300}
        className="m-auto"
      />
      <p className="text-sm text-gray-400 text-right mt-2 mr-2">{post.date}</p>
      <div className="text-center">
        <p className="text-md">{post.title}</p>
        <p className="text-xs text-gray-300">{post.description}</p>
        <button
          type="button"
          className="text-xs text-gray-600 bg-green-200 rounded-full px-2"
        >
          {post.category}
        </button>
      </div>
    </div>
  );
}
