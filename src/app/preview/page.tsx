"use client";
import { useState } from "react";
import Layout from "../../components/Layout";
import { FormData } from "@/types";
import Link from "next/link";
import Image from "next/image";
import backSVG from "../../../public/back-arrow.svg";

export default function Preview() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    tags: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <Layout>
      <div className="relative z-10 max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-800 flex">
          <Link href="/selection" className="mr-4">
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
            Preview + Edit
          </h1>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-800">
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">File Preview</h2>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              Preview Area
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 text-gray-800">
          <h2 className="text-xl font-semibold mb-4">Edit Information</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
