"use client";

import React, { useState } from "react";
import { showToast } from "../utils/toast";

type VideoInput = {
  title: string;
  description: string;
  url: string;
  category: string;
};

interface AddVideoFormProps {
  onAddVideo: (video: VideoInput) => void;
  onDeleteVideo?: (videoId: string) => void;
}

const AddVideoForm: React.FC<AddVideoFormProps> = ({ onAddVideo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description || !url) {
      showToast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onAddVideo({ title, description, url, category: category || "General" });
      showToast.success("Video added successfully!");
      setTitle("");
      setDescription("");
      setUrl("");
      setCategory("");
      setIsSubmitting(false);
    }, 500);
  };

  const categories = [
    "React",
    "Next.js",
    "CSS",
    "JavaScript",
    "Frameworks",
    "AI/ML",
    "Backend",
    "General",
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 p-6 text-white">
        <div className="flex items-center gap-3">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <div>
            <h3 className="text-xl font-bold">Add New Course</h3>
            <p className="text-white/80 text-sm mt-1">
              Expand your learning library
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Course Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter course title..."
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder="Describe what students will learn..."
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 resize-none"
            />
          </div>

          <div>
            <label
              htmlFor="url"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              YouTube URL *
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select category...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !title || !description || !url}
          className="w-full flex justify-center items-center gap-3 py-4 px-6 bg-gradient-to-r from-indigo-600 to-indigo-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding Course...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add to Library
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddVideoForm;
