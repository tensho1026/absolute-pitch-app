"use client"

import { motion } from "framer-motion"
import TechCard from "./tech-card"

export default function TechShowcase() {
  const technologies = [
    {
      name: "Next.js",
      description:
        "React framework for production that enables server-side rendering and static site generation for React applications.",
      icon: "/next-js.svg",
      color: "#f7c948",
    },
    {
      name: "TypeScript",
      description:
        "Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
      icon: "/typescript.svg",
      color: "#f7c948",
    },
    {
      name: "Clerk",
      description: "Complete user management solution with authentication, user profiles, and access control.",
      icon: "/clerk.svg",
      color: "#f7c948",
    },
    {
      name: "Supabase",
      description: "Open source Firebase alternative with a PostgreSQL database, authentication, and storage.",
      icon: "/supabase.svg",
      color: "#f7c948",
    },
    {
      name: "Tone.js",
      description:
        "Web audio framework for creating interactive music in the browser, with advanced scheduling and audio processing capabilities.",
      icon: "/tone-js.svg",
      color: "#f7c948",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TechCard name={tech.name} description={tech.description} icon={tech.icon} color={tech.color} />
        </motion.div>
      ))}
    </div>
  )
}

