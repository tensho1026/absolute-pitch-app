import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Choose an Option</h1>
      
      <div className="flex space-x-4">
        <Link href="/piano">
          <Button className="px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition">
            🎹 Play Piano
          </Button>
        </Link>

        <Link href="/quiz">
          <Button className="px-6 py-3 text-lg bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition">
            📝 Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
}
