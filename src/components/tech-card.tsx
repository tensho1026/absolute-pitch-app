import Image from "next/image"

interface TechCardProps {
  name: string
  description: string
  icon: string
  color: string
}

export default function TechCard({ name, description, icon }: TechCardProps) {
  return (
    <div className="bg-[#1a2642] bg-opacity-70 rounded-lg p-6 h-full transition-all duration-300 hover:bg-opacity-90">
      <div className="flex flex-col items-center text-center">
        <div className="bg-[#f7c948] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
          <Image
            src={icon || "/placeholder.svg"}
            alt={`${name} logo`}
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-[#f7c948]">{name}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  )
}

