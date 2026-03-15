import { Suspense } from "react";
import LoginForm from "./LoginForm";

// Suspense boundary required because LoginForm uses useSearchParams()
// See: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f7f3ee] flex items-center justify-center">
          <div className="h-1 w-1 rotate-45 bg-[#c9a97e] animate-pulse" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}