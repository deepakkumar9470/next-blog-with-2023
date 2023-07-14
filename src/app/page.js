"use client"
import Hero from "./components/Hero";
import PostCard from "./components/PostCard";
import dynamic from "next/dynamic";

const getData = async () =>{
   try {
        const res = await fetch('http://localhost:3000/api/post')
        return res.json()
      } catch (error) {
    console.log(error)
   }
}

 async function Home() {
  const data = await getData()
  
  return (
    <main>
      <Hero/>
      <div className="">
        {
          data?.length > 0 ?
          data?.map((post)=>(
            <PostCard key={post._id} post={post}/>
          ))
          :
          (<h3>No blog post</h3>)
        }
      </div>
    </main>
  )
}

export default dynamic (() => Promise.resolve(Home), {ssr: false})
