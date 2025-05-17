import { NextResponse } from "next/server";

const categories = {
  tech: {
    description: "Explore the latest in technology.",
    additionalInfo: ["AI advancements", "Tech trends", "Programming tips"],
  },
  "hardware-diy": {
    description: "Learn about hardware and DIY projects.",
    additionalInfo: ["Build your own PC", "DIY electronics", "Tool reviews"],
  },
  "education-learning": {
    description: "Resources for education and learning.",
    additionalInfo: ["Online courses", "Study tips", "Learning platforms"],
  },
  "health-wellbeing": {
    description: "Tips for health and wellbeing.",
    additionalInfo: ["Mental health", "Fitness routines", "Healthy eating"],
  },
  "community-support": {
    description: "Engage with community support initiatives.",
    additionalInfo: ["Volunteer opportunities", "Support groups", "Community events"],
  },
  "creative-media": {
    description: "Dive into creative media and arts.",
    additionalInfo: ["Photography tips", "Video editing", "Graphic design"],
  },
  "lifestyle-hobbies": {
    description: "Explore lifestyle and hobbies.",
    additionalInfo: ["Gardening", "Travel tips", "Cooking recipes"],
  },
  "philosophy-discussions": {
    description: "Engage in philosophical discussions.",
    additionalInfo: ["Ethics debates", "Existentialism", "Philosophical readings"],
  },
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/").filter(Boolean); // Remove empty segments

  // Ensure the last segment is the category
  const category = pathSegments[pathSegments.length - 1] as keyof typeof categories;

  if (!category || !(category in categories)) {
    return NextResponse.json(
      { error: "Category not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(categories[category]);
}
