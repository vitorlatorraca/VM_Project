import Game from "@/components/Game";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-sans">
      <h1 className="text-3xl font-bold mb-6">MagoNegroGame</h1>
      <Game />
    </div>
  );
}
