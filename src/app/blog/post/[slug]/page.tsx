'use client';

import { TResponseGetPost } from '@/app/api/(types)/types';
import Loader from '@/components/shared/loader/loader';
import Navbar from '@/components/shared/navbar/Navbar';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CircleArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'
import { AspectRatio } from '@/components/ui/aspect-ratio';
// import xss from "xss";

import "@blocknote/mantine/style.css";
import "@blocknote/react/style.css";
import "@/css/blocknote.css"

export default function PostPage({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [simpleDescription, setSimpleDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [likes, setLikes] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [createdAt, setCreatedAt] = useState<Date>();
  const [formatedDate, setFormatedDate] = useState<string>("");
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
          // const sanitizedHTML = xss(response.content);
          // setContent(sanitizedHTML);
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
          const date = format(response.createdAt, 'dd MMM yyyy', { locale: ptBR })
          setFormatedDate(date)
          setLoading(false)

        } else {
          if ("message" in response) {
            setLoading(false)
            toast.error("Post não encontrado, redirecionando...");
            setTimeout(() => {
              router.push("/blog")
            }, 2000)
          } else {
            setLoading(false)
            toast.error("Erro ao buscar post");

            setTimeout(() => {
              router.push("/blog")
            }, 2000)
          }
        }
      } catch (err) {
        setLoading(false)
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
          <Loader loading={loading} />
          <Button className='max-w-fit items-center  flex flex-row gap-2' onClick={() => router.back()}><CircleArrowLeft size={20} />Voltar</Button>
          <div className='flex flex-col gap-5 mt-5'>
            <h1 className='font-extrabold text-7xl text-primary'>Como gerenciar estados globalmente no Next.js🚀</h1>
            <div className='flex flex-row gap-3 items-center'>
              <span className='text-primary'>📝 Por <span className='font-bold'>{author.name}</span> - <span className='font-bold'>{formatedDate}</span></span>
              <Separator className='flex-1' />
              {tags.map((tag, index) => (
                <span key={index} className='bg-card text-primary px-2 py-1 rounded-md cursor-pointer'>{tag}</span>
              ))}
            </div>
            <div className=''>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  alt="Photo by Drew Beamer"
                  fill
                  className="h-full w-full rounded-md object-cover"
                />
              </AspectRatio>
              <div className="bn-container">
                <div
                  className="bn-default-styles"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
