'use client';

import { Post } from '@/service/posts';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Postcard from './Postcard';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

export default function PostsCarousel({ posts }: { posts: Post[] }) {
  return (
    <section className="mt-4">
      <h1 className="text-lg mb-1">You may like</h1>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
      >
        {posts.map((post) => (
          <Postcard key={post.path} post={post} />
        ))}
      </Carousel>
    </section>
  );
}
