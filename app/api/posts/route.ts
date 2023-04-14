import { getPosts } from '@/service/posts';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const posts = await getPosts();

  // 날짜기준 내림차순
  posts.sort((prev, next) => {
    const date1 = new Date(prev.date);
    const date2 = new Date(next.date);
    return date2.getTime() - date1.getTime();
  });

  return NextResponse.json({ posts });
}
