import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rose Knowledge Manager",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RoseAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
