"use client";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import backSVG from "../../../public/back-arrow.svg";

const SelectionPage = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
  };

  return (
    <Layout>
      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-800 flex">
          <Link href="/" className="mr-4">
            <Image src={backSVG} alt="Back" className="w-10 h-10" />
          </Link>
          <h1
            className="text-4xl font-bold text-center flex-1"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Select Template
          </h1>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-800">
          <div
            style={{
              position: "relative",
              height: "53vh",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gridAutoRows: "minmax(100px, auto)",
                gap: "10px",
                height: "calc(100% - 50px)",
                overflowY: "scroll",
                padding: "10px",
              }}
            >
              {Array.from({ length: 40 }, (_, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(index)}
                  style={{
                    backgroundColor:
                      selectedItem === index ? "lightblue" : "lightgray",
                    border:
                      selectedItem === index
                        ? "2px solid blue"
                        : "1px solid gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100px",
                    cursor: "pointer",
                  }}
                >
                  Item {index + 1}
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/preview"
            className="block w-full py-4 pt-5 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition-colors"
          >
            Reform
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SelectionPage;
