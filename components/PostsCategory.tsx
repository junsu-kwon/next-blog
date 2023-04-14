'use client';

import { Post } from '@/service/posts';
import { useEffect, useState } from 'react';
import Postcard from './Postcard';

async function getPosts() {
  const res = await fetch('/api/posts');
  const { posts }: { posts: Post[] } = await res.json();
  const categorySet = new Set<string>(posts.map((post) => post.category)); // 중복제거
  const categoryArray = Array.from(categorySet.values()); // Set -> Array
  return { posts, categoryArray };
}

export default function PostsCategory() {
  const [posts, setPosts] = useState<Post[]>([]); // 게시글들
  const [categoryArray, setCategoryArray] = useState<string[]>([]); // 카테고리 분류
  const [selectCategory, setSelectCategory] = useState<string>(''); // 선택된 카테고리

  useEffect(() => {
    getPosts().then(({ posts, categoryArray }) => {
      setCategoryArray(categoryArray);
      setPosts(posts);
    });
  }, []);

  const onClick = (category: string) => {
    getPosts().then(({ posts, categoryArray }) => {
      setSelectCategory(category);
      setCategoryArray(categoryArray);
      if (category) {
        const filteredPosts = posts.filter(
          (post: Post) => post.category === category,
        );
        setPosts(filteredPosts);
      } else {
        setPosts(posts);
      }
    });
  };

  return (
    <div className="flex">
      <section className="flex-auto w-10/12">
        <div className="flex flex-auto flex-wrap">
          {posts.map((post) => (
            <div key={post.path} className="w-80">
              <Postcard post={post} />
            </div>
          ))}
        </div>
      </section>
      <section className="flex-auto w-2/12 text-center pt-4">
        <ul className="p-2">
          <li className="font-bold mb-2">
            <span className="border-solid border-b-2 border-sky-500 py-1">
              Category
            </span>
          </li>
          <li key="all" className="py-1">
            <span
              onClick={() => onClick('')}
              className={`cursor-pointer ${
                !selectCategory ? 'text-sky-500' : 'hover:text-sky-500'
              }`}
            >
              all
            </span>
          </li>
          {categoryArray.map((category) => (
            <li key={category} className="py-1">
              <span
                onClick={() => onClick(category)}
                className={`cursor-pointer ${
                  selectCategory === category
                    ? 'text-sky-500'
                    : 'hover:text-sky-500'
                }`}
              >
                {category}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
