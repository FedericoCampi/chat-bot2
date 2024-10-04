import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <div className="text-white grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <h1>Chatbot Personalizado</h1>

    <div className="max-w-md mx-auto">
      <ChatInterface />
    </div>
  </div>
  );
}
