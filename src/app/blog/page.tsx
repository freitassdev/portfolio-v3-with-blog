'use client';

import { useEffect, useState } from "react";
import { TResponseGetPost } from "../api/(types)/types";


export default function Blog() {
    const [posts, setPosts] = useState<TResponseGetPost[]>([]);
    useEffect(() => {
        const fetchAllPosts = async () => {
            const res = await fetch(`/api/blog/post/get`, {
                method: "GET"
            });

            const response: TResponseGetPost[] = await res.json();

            if (res.ok) {
                setPosts(response);
            }
        }

        fetchAllPosts();
    }, [])
    return (
        <div className="flex flex-col gap-10">
            {posts.map((post) => (
                <div key={post.id}>
                    <p>{post.slug}</p>
                </div>
            ))}
        </div>
    )
}