import { promises } from 'fs';
import path from 'path';

export type Post = {
  title: string;
  description: string;
  date: string;
  category: string;
  path: string;
  featured: boolean;
};

// 전체 게시글 정보
export async function getPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), 'data', 'posts.json');
  const data = await promises.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

// 게시글 정보
export async function getPostByPath(
  postPath: string,
): Promise<Post | undefined> {
  const posts = await getPosts();
  const post = posts.find((post) => post.path === postPath);
  return post;
}

// 게시글 상세 정보
export async function getPostDetailByPath(postPath: string): Promise<string> {
  const filePath = path.join(process.cwd(), 'data', 'posts', `${postPath}.md`);
  return await promises.readFile(filePath, 'utf8');
}
