"use client"
import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (

      <section className="bg-gray-50 w-screen">
  <div
    className="mx-auto w-full max-w-screen-xl px-4  lg:flex lg:h-screen lg:items-center"
  >
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Blog Post Web App.
        <strong className="font-bold text-indigo-700 sm:block">
         Post your blog with free of any cost
        </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed justify-normal">
      While vlogging started as a personal way to document one’s life, it has since morphed into a full-fledged form of entertainment, with some vloggers amassing millions of followers and subscribers.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          className="block w-full rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="/get-started"
        >
          Get Started
        </Link>

        <Link
          className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
          href="/about"
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
      </section>
   
  )
}

export default Hero