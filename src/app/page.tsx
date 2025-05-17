import ArticlesCTA from "@/components/ArticlesCTA";
import BotStatus from "@/components/BotStatus";
import Hero from "@/components/Hero";
import Popular from "@/components/Popular";
import Recent from "@/components/Recent";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center">
      <main className="w-9/12 flex-1 flex flex-col items-center justify-center">
        <Hero />
        <ArticlesCTA />
        <Recent />
        <Popular />
        <BotStatus />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
