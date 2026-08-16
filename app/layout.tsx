import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "蔡睿｜个人作品集",
  description: "蔡睿的个人作品集：研究、数据分析、内容策略与 AI 产品策划。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
