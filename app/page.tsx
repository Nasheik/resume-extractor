"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.text();

      if (response.ok) {
        setMessage(data);
      } else {
        setMessage(data);
      }
    } catch (err) {
      setMessage((err as Error).message);
    }
  };

  return (
    <div>
      <h1>Resume Extractor</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Resume</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}