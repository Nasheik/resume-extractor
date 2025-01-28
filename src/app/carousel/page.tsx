"use client";
import { useRef } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";

export default function Carousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const items: string[] = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

  const handleItemClick = (index: number): void => {
    const container = scrollRef.current;
    if (!container) return;

    const itemWidth = container.children[0].clientWidth;
    const scrollPosition =
      index * itemWidth - (container.clientWidth - itemWidth) / 2;
    container.scrollTo({ left: scrollPosition, behavior: "smooth" });
  };

  return (
    <Layout>
      <div className="flex flex-col h-full gap-8">
        <h1 className="text-4xl font-bold text-center">Carousel</h1>

        <div className="flex-1">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar"
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="flex-none w-1/5 aspect-square bg-blue-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors snap-center"
                onClick={() => handleItemClick(index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/preview"
          className="block w-full bg-blue-500 text-white text-center py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Next Page
        </Link>
      </div>
    </Layout>
  );
}
