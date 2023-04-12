import { getPostByPath, getPostDetailByPath } from '@/service/posts';
import ReactMarkdown from 'react-markdown';

export default async function PostDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const post = await getPostByPath(slug);
  const postDetail = await getPostDetailByPath(slug);

  return <ReactMarkdown>{postDetail}</ReactMarkdown>;
}
