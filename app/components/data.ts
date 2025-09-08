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
    url: "https://youtu.be/ZVnjOPwW4ZA?si=es3Xr-HDenkthRUl",
    category: "Frameworks",
  },
  {
    id: 2,
    title: "Tailwind CSS for Beginners",
    description:
      "Learn the basics of Tailwind CSS and how to build beautiful, custom designs without writing a single line of custom CSS.",
    url: "https://youtu.be/6biMWgD6_JY?si=rmDLgT9OwTp5kdhf",
    category: "CSS",
  },
  {
    id: 3,
    title: "Mastering React State",
    description:
      "Deep dive into React state management, from useState to context API and beyond.",
    url: "https://youtu.be/-bEzt5ISACA?si=M-gC4muzVYzO12vl",
    category: "React",
  },
];
