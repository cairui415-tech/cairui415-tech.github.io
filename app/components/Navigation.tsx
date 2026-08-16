import { PillNav } from "./PillNav";

export function Navigation() {
  return (
    <PillNav
      logo="/favicon.svg"
      logoAlt="蔡睿个人标识"
      items={[
        { label: "首页", href: "#top" },
        { label: "经历", href: "#about" },
        { label: "项目", href: "#projects" },
        { label: "优势", href: "#strengths" },
        { label: "技能", href: "#skills" },
        { label: "联系", href: "#contact" },
      ]}
    />
  );
}
