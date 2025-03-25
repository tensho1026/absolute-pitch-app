"use client";

import { motion } from "framer-motion";
import TechCard from "./tech-card";
import { Button } from "./button";
import Link from "next/link";
import { Home } from "lucide-react";

export default function TechShowcase() {
  const technologies = [
    {
      name: "Next.js",
      description:
        "React framework for production that enables server-side rendering and static site generation for React applications.",
      icon: "/next.png",
      color: "#f7c948",
    },
    {
      name: "TypeScript",
      description:
        "Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
      icon: "/ts.png",
      color: "#f7c948",
    },
    {
      name: "Clerk",
      description:
        "Complete user management solution with authentication, user profiles, and access control.",
      icon: "/clerk.png",
      color: "#f7c948",
    },
    {
      name: "Supabase",
      description:
        "Open source Firebase alternative with a PostgreSQL database, authentication, and storage.",
      icon: "/supabase.png",
      color: "#f7c948",
    },
    {
      name: "Tone.js",
      description:
        "Web audio framework for creating interactive music in the browser, with advanced scheduling and audio processing capabilities.",
      icon: "/tone.png",
      color: "#f7c948",
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <div className='absolute top-0 left-0 p-4'>
        <Link href='/'>
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full hover:bg-gray-100'
          >
            <Home className='h-6 w-6' />
            <span className='sr-only'>Home</span>
          </Button>
        </Link>
      </div>

      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TechCard
            name={tech.name}
            description={tech.description}
            icon={tech.icon}
            color={tech.color}
          />
        </motion.div>
      ))}
    </div>
  );
}
