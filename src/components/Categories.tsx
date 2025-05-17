"use client";

import { useState } from "react";
import {
  CodeXml,
  Wrench,
  BookOpen,
  Heart,
  Users,
  Camera,
  Coffee,
  MessageCircle,
} from "lucide-react";

export default function Categories() {
  const categories = [
    {
      id: 1,
      title: "Technology & Development",
      description: "Explore topics in technology and software development.",
      link: "/articles/tech",
      icon: <CodeXml className="w-24 h-24 mb-4" />,
    },
    {
      id: 2,
      title: "Hardware & DIY",
      description: "Learn about hardware projects and DIY guides.",
      link: "/articles/hardware-diy",
      icon: <Wrench className="w-24 h-24 mb-4" />,
    },
    {
      id: 3,
      title: "Education & Learning",
      description: "Discover resources for education and learning.",
      link: "/articles/education-learning",
      icon: <BookOpen className="w-24 h-24 mb-4" />,
    },
    {
      id: 4,
      title: "Health & Well-being",
      description: "Find tips and advice on health and well-being.",
      link: "/articles/health-wellbeing",
      icon: <Heart className="w-24 h-24 mb-4" />,
    },
    {
      id: 5,
      title: "Community & Support",
      description: "Engage with communities and find support.",
      link: "/articles/community-support",
      icon: <Users className="w-24 h-24 mb-4" />,
    },
    {
      id: 6,
      title: "Creative & Media",
      description: "Explore creativity and media-related topics.",
      link: "/articles/creative-media",
      icon: <Camera className="w-24 h-24 mb-4" />,
    },
    {
      id: 7,
      title: "Lifestyle & Hobbies",
      description: "Dive into lifestyle and hobby-related content.",
      link: "/articles/lifestyle-hobbies",
      icon: <Coffee className="w-24 h-24 mb-4" />,
    },
    {
      id: 8,
      title: "Philosophy & Discussions",
      description: "Engage in philosophical topics and discussions.",
      link: "/articles/philosophy-discussions",
      icon: <MessageCircle className="w-24 h-24 mb-4" />,
    },
  ];

  return (
    <div className="w-screen min-h-screen flex flex-col items-center">
      <main className="w-9/12 flex-1 flex flex-col items-center mt-8">
        <h1 className="text-4xl font-bold">Categories</h1>
        <p className="text-lg mt-4">
          Explore a variety of categories on different topics.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="border p-4 rounded-lg flex flex-col items-center text-center"
            >
              {category.icon}
              <h2 className="text-xl font-semibold text-blue-500 hover:underline">
                {category.title}
              </h2>
              <p className="text-neutral-300 mt-2">{category.description}</p>
            </a>
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
