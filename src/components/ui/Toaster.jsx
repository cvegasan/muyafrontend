import { Toaster as ToasterProvider } from "sonner";

export function Toaster() {
  return (
    <ToasterProvider
      position="top-center"
      toastOptions={{
        style: {
          background: "white",
          color: "#333",
          border: "none",
        },
      }}
    />
  );
}
