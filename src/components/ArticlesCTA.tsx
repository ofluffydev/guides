import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ArticlesCTA() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-lg shadow-lg p-6 md:p-8 my-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Explore Our Articles
        </h2>
        <p className="text-purple-100 mb-6 text-lg">
          Dive into a variety of topics, insights, and resources added by
          numerous community members.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-purple-700 hover:bg-purple-50 font-medium text-lg group"
        >
          <Link href="/articles">
            Explore Articles
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
