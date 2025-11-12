"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex justify-center mb-4">
        <h1 className="text-6xl font-bold text-amber-400">404</h1>
      </div>

      <div className="flex flex-col justify-start">
        <h1 className="text-6xl font-bold mb-4">Somthing went wrong</h1>
        <p className="mb-6 text-3xl">Page not found.</p>
      </div>
      <div>
        <button
          onClick={() => router.push("/")}
          className="group flex items-center gap-2
            text-white  transition cursor-pointer 
            border-2 bg-amber-400 p-2 rounded-md
            hover:text-amber-400 hover:border-amber-400
            hover:bg-transparent"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Go Home
        </button>
      </div>
    </div>
  );
}
