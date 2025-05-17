"use client";

import { useEffect, useState, useImperativeHandle, forwardRef } from "react";

interface TerminalProps {
  lines: string[];
  prompt?: string;
  className?: string;
  height?: string;
}

export const Terminal = forwardRef(function Terminal(
  { lines = [], prompt = "$", className = "", height = "150px" }: TerminalProps,
  ref,
) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [flickerLine, setFlickerLine] = useState<number | null>(null);
  const [typingIndex, setTypingIndex] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    addLines(newLines: string[]) {
      setDisplayedLines((prev) => {
        const uniqueLines = newLines.filter((line) => !prev.includes(line));
        const updatedLines = [...prev, ...uniqueLines];
        const maxLines = Math.floor(parseInt(height) / 20);
        return updatedLines.slice(-maxLines);
      });
    },
  }));

  useEffect(() => {
    if (typingIndex < lines.length) {
      const currentLine = lines[typingIndex];
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        setDisplayedLines((prev) => {
          const updatedLines = [...prev];
          if (!updatedLines[typingIndex]) updatedLines[typingIndex] = "";
          updatedLines[typingIndex] = currentLine.slice(0, charIndex + 1);
          return updatedLines;
        });
        charIndex++;
        if (charIndex >= currentLine.length) {
          clearInterval(typeInterval);
          setTypingIndex((prev) => prev + 1);
        }
      }, 50);
    }
  }, [typingIndex, lines]);

  useEffect(() => {
    const flickerInterval = setInterval(() => {
      const randomLine = Math.floor(Math.random() * displayedLines.length);
      setFlickerLine(randomLine);

      setTimeout(() => {
        setFlickerLine(null);
      }, 100);
    }, 2000);

    return () => clearInterval(flickerInterval);
  }, [displayedLines.length]);

  return (
    <div
      className={`relative bg-black rounded-md overflow-hidden ${className}`}
      style={{ height, overflow: "hidden" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.3) 100%)",
          boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.5)",
        }}
      ></div>

      <div
        className="relative p-4 font-mono text-sm text-green-400 overflow-auto z-10 rounded-md"
        style={{
          maxHeight: "100%",
          overflowY: "scroll",
          position: "relative",
        }}
      >
        {displayedLines.map((line, index) => (
          <div
            key={index}
            className={`whitespace-pre-wrap ${index === flickerLine ? "opacity-50" : ""}`}
            style={{
              textShadow: "0 0 5px rgba(0, 255, 0, 0.7)",
              animation: "textGhost 0.1s infinite alternate",
              opacity:
                index <
                displayedLines.length - Math.floor(parseInt(height) / 20)
                  ? 0.3
                  : 1,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            {line.startsWith(">") || line.startsWith("$") ? (
              line
            ) : (
              <>
                <span className="text-green-500 mr-2">{prompt}</span>
                <span>{line}</span>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none z-20 scanlines"></div>

      <style jsx global>{`
        @keyframes textGhost {
          from {
            opacity: 0.95;
          }
          to {
            opacity: 1;
          }
        }

        .scanlines {
          background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.3) 50%
          );
          background-size: 100% 4px;
          z-index: 20;
          pointer-events: none;
        }

        .scanlines::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(0, 0, 0, 0.3)
          );
          animation: flicker 0.15s infinite alternate;
          z-index: 21;
          pointer-events: none;
        }

        @keyframes flicker {
          0% {
            opacity: 0.1;
          }
          100% {
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
});
