"use client";

import Categories from "@/components/Categories";
import { Terminal } from "@/components/Terminal";
import { useEffect, useRef, useState } from "react";

export default function Tech({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const terminalRef = useRef<{ addLines: (newLines: string[]) => void }>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState<string[]>([]);

  const validCategories = [
    "tech",
    "hardware-diy",
    "education-learning",
    "health-wellbeing",
    "community-support",
    "creative-media",
    "lifestyle-hobbies",
    "philosophy-discussions",
  ];

  useEffect(() => {
    async function fetchCategory() {
      const { slug } = await params;

      if (!slug || slug.length === 0) {
        terminalRef.current?.addLines([
          "Welcome to the Articles section!",
          "Please select a category to explore.",
        ]);
        setShowCategories(true);
        return;
      }

      if (!validCategories.includes(slug[0])) {
        terminalRef.current?.addLines([
          `Error: Invalid category "${slug}"`,
          "Please select a valid category from the list.",
        ]);
        return;
      }

      try {
        const response = await fetch(`/api/categories/${slug[0]}`);
        if (response.status === 404) {
          terminalRef.current?.addLines([
            `Error: Category "${slug[0]}" not found.`,
            "Are you sure this is a valid category?",
          ]);
          return;
        }

        if (!response.ok) {
          throw new Error(`Unexpected error: ${response.statusText}`);
        }

        const data = await response.json();

        terminalRef.current?.addLines([
          `Selected Category: ${slug[0]}`,
          `Description: ${data.description}`,
        ]);

        setCategoryTitle(slug[0]);
        setCategoryDescription(data.description);
        setAdditionalInfo(data.additionalInfo || []);

        // const delayedLines = data.additionalInfo || [];
        // delayedLines.forEach((line: string, index: number) => {
        //   setTimeout(
        //     () => {
        //       terminalRef.current?.addLines([line]);
        //     },
        //     1000 * (index + 1),
        //   );
        // });
      } catch (error: any) {
        terminalRef.current?.addLines([
          `Error: Failed to fetch category data.`,
          `Details: ${error.message}`,
        ]);
      }
    }

    fetchCategory();
  }, [params]);

  return (
    <div>
      <Terminal ref={terminalRef} lines={[]} />
      <h1>{categoryTitle}</h1>
      <p>{categoryDescription}</p>
      <ul>
        {additionalInfo.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
      {showCategories && <Categories />}
    </div>
  );
}
