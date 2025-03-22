import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <SignUp
        path='/sign-up'
        routing='path'
        fallbackRedirectUrl={"/"}
        appearance={{
          // baseTheme: dark,
          elements: {
            formButtonPrimary:
              "bg-[#F9D74C] hover:bg-[#e9c73c] text-black font-semibold",
            card: "bg-transparent shadow-none",
            headerTitle: "text-white text-xl",
            headerSubtitle: "text-gray-300",
            socialButtonsBlockButton:
              "border border-gray-600 hover:bg-gray-700",
            socialButtonsBlockButtonText: "text-white",
            formFieldLabel: "text-gray-300",
            formFieldInput:
              "bg-[#111827] border-gray-600 text-white focus:border-[#F9D74C]",
            footerActionLink: "text-[#F9D74C] hover:text-[#e9c73c]",
            identityPreviewText: "text-white",
            identityPreviewEditButtonText: "text-[#F9D74C]",
          },
          layout: {
            socialButtonsVariant: "blockButton",
            logoPlacement: "inside",
            logoImageUrl: "/absolute-pitch-logo.svg", // ロゴがあれば設定
          },
          variables: {
            colorPrimary: "#F9D74C",
            colorText: "white",
            colorTextSecondary: "#CBD5E1",
            colorBackground: "#1a2235",
            colorInputBackground: "#111827",
            colorInputText: "white",
            borderRadius: "0.5rem",
          },
        }}
      />
    </div>
  );
}
