'use client';

import { useRouter } from 'next/navigation';

export default function MoveButton({
  href,
  text,
  className,
}: {
  href: string;
  text: string;
  className: string;
}) {
  const router = useRouter();
  return (
    <button
      className={className}
      onClick={() => {
        router.push(href);
      }}
    >
      {text}
    </button>
  );
}
