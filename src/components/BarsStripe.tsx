// components/BarsStripe.tsx
export default function BarsStripe() {
  return (
    <div className='flex w-full max-w-4xl'>
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className={`h-8 flex-1 ${i % 2 === 0 ? "bg-white" : "bg-[#121c2d]"}`}
        />
      ))}
    </div>
  );
}
