"use client"
import React,{useState,useEffect} from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const EditPost = (ctx) => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Tech");

  const { data: session, status } = useSession();

  const router = useRouter();

      
    useEffect(() => {
        async function fetchPost() {
            const res = await axios(`http://localhost:3000/api/post/${ctx.params.id}`, { cache: 'no-store' })
            setTitle(res.title)
            setDesc(res.desc)
            setCategory(res.category)
        }
        fetchPost()
    }, [])

    if (status === "loading") {
        <p className="text-center text-3xl font-bold">Loading</p>;
      }
    
      if (status === "unauthenticated") {
        return <p className="text-center text-3xl font-bold">Access Denied</p>;
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (title === "" || desc === "" || category === "") {
          toast.error("Please fill all fields..");
          return
        }
    
        try {
          const res = await axios.put(`http://localhost:3000/api/post${ctx.params.id}`, {
            title,
            desc,
            category,
          },
           {
            headers:  {
            'Content-Type' : 'Application/json',
            'Authorization' : `Bearer ${session?.user?.accessToken}`
           }
        }
          );
          if (!res.ok) {
            throw new Error("Error in posting data");
          }
          toast.success('Post updated successfully')
          router.push("/");
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <section className="bg-gray-100 max-w-screen-sm m-auto p-8 mt-10 mb-10">
    <div className="text-center mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Create Post</h1>
      <div className="flex mt-2 justify-center">
        <div className="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
      </div>
    </div>
    <form onSubmit={handleSubmit}>
        <div>
            <input type='text' onChange={(e) => setTitle(e.target.value)} className='w-full focus:outline-none p-2' placeholder='Title Your Work'/>
        </div>
        <div>
            <input type='text' onChange={(e) => setDesc(e.target.value)} className='w-full focus:outline-none pt-8 pb-8 pl-2 mt-4' placeholder='Share Your Thoughts...'/>
        </div>
        <div>
            <select value={category} onChange={(e) => setCategory(e.target.value)}  className='w-full focus:outline-none p-2 mt-4'>
                <option value='Sports'>Sports</option>
                <option value='Money'>Money</option>
                <option value='News'>News</option>
                <option value='Tech'>Tech</option>
                <option value='Programming'>Programming</option>
            </select>
        </div>
            <button
            type='submit'
            className='px-6 py-2.5 rounded-md bg-primary mt-3 text-white hover:bg-blue-500 hover:text-white transition-all duration-300'
            >Update</button>
     
        </form>
    </section>
  )
}

export default EditPost