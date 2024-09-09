'use client';

import { TResponseGetPost } from '@/app/api/(types)/types';
import Navbar from '@/components/shared/navbar/Navbar';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function PostPage({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [simpleDescription, setSimpleDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [likes, setLikes] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<Date>();
  const [author, setAuthor] = useState<{
    id: string;
    name: string;
  }>({
    id: "",
    name: ""
  });

  const router = useRouter();
  const { slug: initialSlug } = params;
  const slug = initialSlug
    .toLowerCase()
    .normalize("NFD") // Decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
    .replace(/\s+/g, "-") // Substitui espaços por "-"
    .replace(/ç/g, "c") // Substitui "ç" por "c"

  useEffect(() => {
    if (!slug) {
      router.push('/blog');
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/post/get?slug=${slug}`, {
          method: "GET"
        });

        const response: TResponseGetPost | { message: string } = await res.json();

        if (res.ok && response && !("message" in response)) {
          setTitle(response.title);
          setContent(response.content);
          setAuthor({
            id: response.authorId,
            name: response.authorName
          });
          setImageUrl(response.imageUrl ?? "");
          setSimpleDescription(response.simpleDescription);
          setTags(response.tags);
          setLikes(response.likes);
          setCreatedAt(response.createdAt);
        } else {
          if ("message" in response) {
            toast.error("Post não encontrado, redirecionando...");
            setTimeout(() => {
              router.push("/blog")
            }, 2000)
          } else {
            toast.error("Erro ao buscar post");
            setTimeout(() => {
              router.push("/blog")
            }, 2000)
          }
        }
      } catch (err) {
        console.log(err);
        toast.error("Erro ao buscar post");
        setTimeout(() => {
          router.push("/blog")
        }, 2000)
      }
    }

    fetchPost();

  }, [router, slug])

  return (

    <div className="h-screen w-full bg-background relative flex items-center justify-center">
      <div className="h-full max-md:w-full max-md:px-4 md:w-[600px] lg:w-[700px] xl:w-[700px] 2xl:w-[900px]">
        <Navbar active="blog" />
        <div className="flex flex-col mt-24">

        </div>
      </div>
    </div>
  );
}
