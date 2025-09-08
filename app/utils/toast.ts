import toast from "react-hot-toast";

export const showToast = {
  success: (message: string, options?: import("react-hot-toast").ToastOptions) => {
    return toast.success(message, {
      duration: 4000,
      style: {
        background: "#f0fdf4",
        color: "#166534",
        border: "1px solid #bbf7d0",
      },
      iconTheme: {
        primary: "#22c55e",
        secondary: "#ffffff",
      },
      ...options,
    });
  },

  error: (message: string, options?: import("react-hot-toast").ToastOptions) => {
    return toast.error(message, {
      duration: 5000,
      style: {
        background: "#fef2f2",
        color: "#991b1b",
        border: "1px solid #fecaca",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#ffffff",
      },
      ...options,
    });
  },

  loading: (message: string, options?: import("react-hot-toast").ToastOptions) => {
    return toast.loading(message, {
      style: {
        background: "#f8fafc",
        color: "#475569",
        border: "1px solid #e2e8f0",
      },
      ...options,
    });
  },

  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    },
    options?: import("react-hot-toast").ToastOptions
  ) => {
    return toast.promise(promise, messages, {
      style: {
        minWidth: "250px",
      },
      success: {
        style: {
          background: "#f0fdf4",
          color: "#166534",
          border: "1px solid #bbf7d0",
        },
      },
      error: {
        style: {
          background: "#fef2f2",
          color: "#991b1b",
          border: "1px solid #fecaca",
        },
      },
      loading: {
        style: {
          background: "#f8fafc",
          color: "#475569",
          border: "1px solid #e2e8f0",
        },
      },
      ...options,
    });
  },
};
