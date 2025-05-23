import { Toaster } from "@/components/ui/sonner";

export default function Layout({  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Toaster position="top-right" />
        {children}
    </>
  );
}
