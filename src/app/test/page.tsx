import { getAllUserScores } from "@/features/getAllScore";

export default async function Page() {
  const allScores = await getAllUserScores();

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-4'>全ユーザーのスコア</h1>
      <ul className='list-disc pl-5 space-y-2'>
        {allScores.map((user: any) => (
          <li key={user.username}>
            {user.username} : {user.score} 点
          </li>
        ))}
      </ul>
    </div>
  );
}
