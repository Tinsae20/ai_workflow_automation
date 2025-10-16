import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans min-h-[80vh] flex flex-col items-center p-6">
      <main className="w-full max-w-2xl flex flex-col gap-4 flex-1">
        <h1 className="text-xl font-semibold"> Chat </h1>
      </main>
    </div>
  );
}
