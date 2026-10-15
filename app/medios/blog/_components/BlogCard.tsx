import Image from 'next/image';
import Link from 'next/link';
import { IoArrowForward, IoTimeOutline } from 'react-icons/io5';
import { LuUserRound } from 'react-icons/lu';
import { formatPostDate, type BlogPost } from '@/app/data/blog';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => (
  <article
    data-reveal
    className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_32px_rgba(15,23,42,0.10)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(15,23,42,0.18)]"
  >
    <Link
      href={`/medios/blog/${post.slug}`}
      className="relative block h-56 overflow-hidden"
      tabIndex={-1}
      aria-hidden
    >
      <Image
        src={post.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <span className="absolute left-4 top-4 rounded-full bg-gold-500 px-4 py-1 text-xl font-semibold text-white">
        {post.category}
      </span>
    </Link>

    <div className="flex flex-1 flex-col p-8">
      <h3 className="mb-3 font-playfair text-3xl font-bold leading-snug text-navy-900 transition-colors duration-300 group-hover:text-gold-700">
        <Link href={`/medios/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mb-6 text-2xl leading-relaxed text-navy-700">
        {post.excerpt}
      </p>

      <div className="mb-6 mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 text-xl text-navy-600">
        <span className="flex items-center gap-2">
          <LuUserRound className="text-gold-600" />
          {post.author}
        </span>
        <span className="flex items-center gap-2">
          <IoTimeOutline className="text-gold-600" />
          {post.readTime}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-5">
        <time dateTime={post.date} className="text-xl text-navy-500">
          {formatPostDate(post.date)}
        </time>
        <Link
          href={`/medios/blog/${post.slug}`}
          className="flex items-center gap-2 text-xl font-semibold text-gold-700 hover:text-gold-800"
        >
          Leer más
          <IoArrowForward />
          <span className="sr-only">sobre {post.title}</span>
        </Link>
      </div>
    </div>
  </article>
);

export default BlogCard;
