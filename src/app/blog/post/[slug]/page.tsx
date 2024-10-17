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
import { cn } from '@/lib/utils';

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
          console.log(response)
          const post = response.allPosts[0];
          setTitle(post.title);
          const processedHtml = post.content.replace(/<div class="bn-block-content"[^>]*data-url="(.*?)"[^>]*>.*?<img.*?>.*?<\/div>/g, (match, url) => {
            return `<img src="${url}" alt="Imagem" />`;
          });
          setContent(processedHtml);
          setAuthor({
            id: post.authorId,
            name: post.authorName
          });
          const verifiedImageUrl = await verifyImageUrl(post.imageUrl ?? "");
          setImageUrl(verifiedImageUrl ?? "");
          setSimpleDescription(post.simpleDescription);
          setTags(post.tags);
          setLikes(post.likes);
          setCreatedAt(post.createdAt);
          const date = format(post.createdAt, 'dd MMM yyyy', { locale: ptBR })
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

  const verifyImageUrl = async (url: string) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        if (response.ok) {
          return url;
        }
      } catch (error) {
        console.error("Erro ao verificar a URL da imagem:", error);
      }
    }
    return undefined;
  }
  return (

    <div className="h-screen w-full bg-background relative flex items-center justify-center">
      <div className="h-full max-md:w-full max-md:px-4 md:w-[600px] lg:w-[700px] xl:w-[700px] 2xl:w-[900px]">
        <Navbar active="blog" />
        <div className="flex flex-col mt-24">
          <Loader loading={loading} />
          <Button className='max-w-fit items-center  flex flex-row gap-2' onClick={() => router.back()}><CircleArrowLeft size={20} />Voltar</Button>
          <div className='flex flex-col gap-5 mt-5'>
            <h1 className='font-extrabold text-6xl max-sm:text-5xl text-primary'>{title}</h1>
            <div className='flex flex-row gap-3 items-center'>
              <span className='text-primary'>📝 Por <span className='font-bold'>{author.name}</span> - <span className='font-bold'>{formatedDate}</span></span>
              <Separator className='flex-1' />
              {tags.map((tag, index) => (
                <span key={index} className='bg-card text-primary px-2 py-1 rounded-md cursor-pointer'>{tag}</span>
              ))}
            </div>
            <div className='flex flex-col gap-3'>
              {imageUrl &&
                <AspectRatio ratio={16 / 9} className={cn("bg-muted rounded-md border border-border ", imageUrl ? "block" : "hidden")}>
                  <Image
                    src={imageUrl}
                    alt="Capa do Post (imagem)"
                    fill
                    className="h-full w-full rounded-md object-cover"
                  />
                </AspectRatio>
              }
              <Separator />
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
