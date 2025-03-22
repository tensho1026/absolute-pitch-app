import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <SignIn
        path='/sign-in'
        routing='path'
        fallbackRedirectUrl={"/"}
        appearance={{
          elements: {
            rootBox: "bg-slate-800 p-6 rounded-lg shadow-lg text-white",
            formButtonPrimary: "bg-amber-500 hover:bg-amber-600 text-white",
            formFieldInput: "bg-slate-700 text-white border border-slate-600",
            formHeaderTitle: "text-3xl font-bold text-yellow-400",
            formHeaderSubtitle: "text-lg text-gray-300",
            formFieldLabel: "text-gray-400",
            socialButtonsBlockButton:
              "bg-slate-700 hover:bg-slate-600 text-white",
            footerActionLink: "text-amber-500 hover:underline",
          },
        }}
      />
    </div>
  );
}
