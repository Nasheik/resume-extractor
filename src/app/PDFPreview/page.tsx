// FormWithPDFPreview.tsx
"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
import { Document, Page, PDFDownloadLink } from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import { StyleSheet } from "@react-pdf/renderer";
import { Text, View } from "@react-pdf/renderer";

// Define PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  metadata: {
    fontSize: 12,
    marginBottom: 20,
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5,
  },
});

interface FormData {
  title: string;
  author: string;
  date: string;
  content: string;
  email: string;
  category: string;
}

// Create PDF Document component
const PDFDocument = ({ data }: { data: FormData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.metadata}>
          <Text>Author: {data.author}</Text>
          <Text>Date: {data.date}</Text>
          <Text>Email: {data.email}</Text>
          <Text>Category: {data.category}</Text>
        </View>
        <Text style={styles.content}>{data.content}</Text>
      </View>
    </Page>
  </Document>
);

// Dynamically import PDFViewer to avoid SSR issues
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);

const FormWithPDFPreview = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    date: "",
    content: "",
    email: "",
    category: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Generate PDF blob
    const blob = await pdf(<PDFDocument data={formData} />).toBlob();
    // You can do something with the blob here, like downloading it
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Form Section */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full min-h-32"
              />
            </div>

            <div className="space-y-2">
              <Button type="submit" className="w-full">
                Generate PDF
              </Button>

              {/* PDF Download Link */}
              {/* <PDFDownloadLink
                document={<PDFDocument data={formData} />}
                fileName="document.pdf"
                className="w-full"
              >
                {({ loading }) => (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Loading document..." : "Download PDF"}
                  </Button>
                )}
              </PDFDownloadLink> */}
            </div>
          </form>
        </Card>

        {/* PDF Preview Section */}
        <Card className="p-6 bg-white">
          <div className="h-full">
            {typeof window !== "undefined" && (
              <PDFViewer style={{ width: "100%", height: "100vh" }}>
                <PDFDocument data={formData} />
              </PDFViewer>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FormWithPDFPreview;
