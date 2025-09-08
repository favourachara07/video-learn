export type Video = {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
};

export const initialVideos: Video[] = [
  {
    id: 1,
    title: "Introduction to Next.js",
    description:
      "A comprehensive overview of the Next.js framework, covering its main features like Server-Side Rendering and Static Site Generation.",
    url: "https://www.youtube.com/watch?v=kC88u9-i-dc",
    category: "Frameworks",
  },
  {
    id: 2,
    title: "Tailwind CSS for Beginners",
    description:
      "Learn the basics of Tailwind CSS and how to build beautiful, custom designs without writing a single line of custom CSS.",
    url: "https://www.youtube.com/watch?v=pfaSUYaSgPo",
    category: "CSS",
  },
  {
    id: 3,
    title: "Mastering React State",
    description:
      "Deep dive into React state management, from useState to context API and beyond.",
    url: "https://www.youtube.com/watch?v=1wZoGFF_n7Y",
    category: "React",
  },
];
