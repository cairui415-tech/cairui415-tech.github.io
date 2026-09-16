export type ExperienceItem = {
  organization: string;
  role: string;
  period: string;
  focus: string;
  details: string[];
  mark: string;
  outcomes?: { value: string; label: string }[];
  videos?: { src: string; label: string }[];
  media?: { src: string; alt: string; caption: string; view: "data" | "timeline" }[];
};

export type Project = {
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  tags: string[];
  images?: { src: string; alt: string }[];
  visual?: "workflow" | "sql" | "research";
  accent: string;
  proof: string;
  windowTitle: string;
};

export type Strength = {
  index: string;
  glyph: string;
  title: string;
  description: string;
};

export type Tool = { name: string; mark: string; tone: string; icon?: string };

export type SkillGroup = {
  title: string;
  advantage: string;
  skills: string[];
};

export const portfolioContent = {
  profile: {
    name: "蔡睿",
    role: "AI 与数据驱动的复合型人才",
    statement: "把业务问题拆成可验证的数据路径，再用 AI、产品与内容能力完成交付。",
    introduction:
      "复旦大学传播学本科生，预计 2027.06 毕业。我习惯先建立可靠的研究框架，再用数据验证判断，并把复杂信息转化为清楚、可复用的产品、内容或商业方案。",
    education: "复旦大学 · 传播学本科 · GPA 3.75 / 4.0 · 专业前 15% · 二等奖学金",
    languages: "雅思 7.0 · CET-6",
    courses: ["计量经济学", "经济学原理", "传播政治经济学", "数据分析与信息可视化", "数字媒介产品营销传播", "受众分析"],
    location: "上海",
    email: "23300130015@m.fudan.edu.cn",
    phone: "151-0603-6688",
    phoneUri: "+8615106036688",
  },
  experiences: [
    {
      organization: "哔哩哔哩",
      role: "游戏联运实习生",
      period: "2026.08 — 至今",
      focus: "游戏联运 · 数据复盘 · AI 工作流产品",
      details: [
        "负责 Android 与 PC 游戏联运项目，协同 CP 推进首曝、测试、上线及版本更新，完成资源排期、上线检查与突发问题处理。",
        "围绕预约、下载、注册、留存与召回等核心指标，推进活动与站内资源上线，结合渠道数据、玩家评论及社区反馈持续优化素材、机制与运营方案。",
        "基于 Codex 设计并落地内部 AI 工作流产品，将素材处理、分类与需求单生成标准化、自动化，整体效率提升 20%+，并沉淀操作文档与模板供团队复用。",
      ],
      mark: "BILI",
      outcomes: [
        { value: "20%+", label: "工作流效率提升" },
        { value: "AI", label: "内部产品落地" },
      ],
    },
    {
      organization: "德邦基金管理有限公司",
      role: "行业研究实习生",
      period: "2025.10 — 2026.01",
      focus: "行业研究 · 财务分析 · 数据采集",
      details: [
        "独立完成比亚迪深度研究报告，系统梳理企业战略、技术路线及营收 / 毛利率 / ROE 等核心财务指标，覆盖产业链上下游逻辑，支持投决。",
        "持续跟踪新能源汽车与自动驾驶赛道，向团队输出政策动态、竞争格局与商业落地进展，形成系统行业展望。",
        "运用Choice、Wind等金融终端采集核验产业数据，将研究成果转化为演示材料，支持内部知识共享。",
      ],
      mark: "DB",
      media: [
        { src: "/works/byd-research-data.png", alt: "比亚迪业务结构与财务数据研究底稿", caption: "业务结构 / 营收拆分", view: "data" },
      ],
    },
    {
      organization: "元诚私募基金管理有限公司",
      role: "研究助理",
      period: "2025.08 — 2025.09",
      focus: "行业分析 · 财务数据整合 · 会议纪要",
      details: [
        "协助投研团队分析消费及新能源板块，整合行业政策、市场规模及龙头企业财务数据，完成多份行业分析底稿。",
        "使用金融终端获取财务及估值数据，运用Excel进行多标的横向对比与估值分析；参与投资决策会议，整理纪要并核对基金持仓数据。",
      ],
      mark: "YC",
    },
    {
      organization: "解放日报 · 上观新闻编辑中心",
      role: "编辑实习生",
      period: "2025.07 — 2025.09",
      focus: "账号运营 · 视频内容 · 舆情监测 · 数据分析",
      details: [
        "运营上观新闻知乎账号，优化内容分发与社群互动；为“上官河”频道制作视频，任职期间涨粉突破10万，单条最高播放量突破500万。",
        "监测跨平台热点与舆情，复盘阅读量、播放量及互动表现，识别内容机会并支持编辑决策。",
        "使用大模型辅助信息检索、脚本初稿与数据总结，在保证事实核验的前提下缩短选题到发布周期。",
      ],
      mark: "SG",
      outcomes: [
        { value: "10万+", label: "任职期涨粉" },
        { value: "500万+", label: "单条最高播放" },
      ],
      videos: [
        { src: "/works/news-video-01.mp4", label: "新闻视频作品 01" },
        { src: "/works/news-video-02.mp4", label: "新闻视频作品 02" },
        { src: "/works/news-video-03.mp4", label: "新闻视频作品 03" },
      ],
    },
  ] satisfies ExperienceItem[],
  projects: [
    {
      title: "联运素材工作台",
      category: "AI 工作流产品",
      year: "2026.08",
      role: "需求定义 · Vibe Coding · 产品落地",
      summary: "面向游戏联运中高频、重复的素材处理任务，把文件识别、自动分类与 CP 需求单生成整合进一套可复用流程，并沉淀团队操作模板。",
      tags: ["Codex", "Vibe Coding", "工作流自动化", "内部工具"],
      visual: "workflow",
      accent: "blue",
      proof: "效率提升 20%+",
      windowTitle: "联运素材工作台",
    },
    {
      title: "Olist 电商经营与用户价值分析",
      category: "MySQL 个人项目",
      year: "2026.07",
      role: "数据建模 · SQL 分析 · 经营诊断",
      summary: "基于公开匿名业务数据，清洗并关联约 10 万笔订单与 9 张数据表，围绕 GMV、客单价、复购、履约及时率等指标建立经营分析视图。",
      tags: ["MySQL", "CTE", "窗口函数", "条件聚合"],
      visual: "sql",
      accent: "orange",
      proof: "10万+ 订单 · 9 张关联表",
      windowTitle: "Olist 电商经营分析",
    },
    {
      title: "陷入养老焦虑的年轻人，正在寻找新出路",
      category: "数据新闻",
      year: "2025.12",
      role: "数据收集与分析 · 全文写作",
      summary: "设计并发放 150+ 份问卷，整合国家统计局、中信银行等多源数据，把结构性养老压力转化为可读、可讨论的公共叙事。",
      tags: ["问卷研究", "数据清洗", "信息可视化", "叙事写作"],
      images: [
        { src: "/works/retirement-data.png", alt: "养老焦虑项目核心发现" },
        { src: "/works/retirement-data-02.png", alt: "经济与医疗养老焦虑数据可视化" },
        { src: "/works/retirement-data-03.png", alt: "新型养老模式认知与选择数据可视化" },
        { src: "/works/retirement-data-04.png", alt: "养老模式认知深度数据可视化" },
      ],
      accent: "yellow",
      proof: "150+ 有效问卷",
      windowTitle: "养老焦虑数据新闻",
    },
    {
      title: "“星芽”AI 家庭共育平台",
      category: "AI 产品",
      year: "2025.12",
      role: "产品策划 · 商业模式 · 增长传播",
      summary: "提出孩子端、家长端与家庭端“三位一体”产品机制，围绕学习、兴趣、倾诉与非侵入式反馈设计完整体验和增长路径。",
      tags: ["用户洞察", "竞品分析", "产品功能", "增长策略"],
      images: [
        { src: "/works/starpal-prototype-22.png", alt: "星芽 AI 产品登录界面原型" },
        { src: "/works/starpal-prototype-23.png", alt: "星芽 AI 产品学习板块原型" },
        { src: "/works/starpal-prototype-24.png", alt: "星芽 AI 产品兴趣板块原型" },
        { src: "/works/starpal-prototype-25.png", alt: "星芽 AI 形象创建原型" },
        { src: "/works/starpal-prototype-26.png", alt: "星芽 AI 倾诉板块原型" },
      ],
      accent: "blue",
      proof: "三端产品体系",
      windowTitle: "星芽 AI 产品原型",
    },
    {
      title: "AI 音频产业与 Suno / Udio 经营策略",
      category: "行业研究",
      year: "2025.12",
      role: "案例研究 · SWOT · 商业化分析",
      summary: "覆盖 AI 音乐、语音与音效生成赛道，从产品创新、用户增长、商业化和版权合规四个维度拆解竞争策略。",
      tags: ["AI 音频", "市场规模", "商业模式", "版权风险"],
      images: [
        { src: "/works/ai-audio-research-12.png", alt: "Suno 头部企业与产品研究" },
        { src: "/works/ai-audio-research-15.png", alt: "Suno 产品与用户界面分析" },
        { src: "/works/ai-audio-research-23.png", alt: "AI 音频产品功能页面研究" },
        { src: "/works/ai-audio-research-30.png", alt: "AI 音频版权风险案例研究" },
        { src: "/works/ai-audio-research-31.png", alt: "AI 音频版权法律争议研究" },
      ],
      accent: "orange",
      proof: "3 条核心赛道",
      windowTitle: "AI 音频产业研究",
    },
    {
      title: "AI 共情如何影响人际冲突修复",
      category: "实验研究",
      year: "2026.06",
      role: "实验设计 · 数据分析 · 论文写作",
      summary: "两项实验发现 AI 共情同时带来社会支持与负向预期违背；加入社会框架提示后，冲突修复意愿显著提升。",
      tags: ["竞争性中介", "实验设计", "SPSS", "AI 共情"],
      visual: "research",
      accent: "green",
      proof: "N = 240 · α ≥ .89",
      windowTitle: "AI 共情实验研究",
    },
  ] satisfies Project[],
  strengths: [
    { index: "01", glyph: "◎", title: "研究洞察", description: "从行业、用户与学术材料中建立框架，识别真正值得解决的问题。" },
    { index: "02", glyph: "⌁", title: "数据分析与可视化", description: "连接问卷、财务与实验数据，用分析建立证据，再用可视化让结论易理解。" },
    { index: "03", glyph: "✦", title: "内容策略", description: "理解平台语境与受众注意，把复杂信息变成有传播力的内容。" },
    { index: "04", glyph: "↗", title: "AI 产品思维", description: "把社会洞察、功能、增长与商业化放进同一套决策框架。" },
  ] satisfies Strength[],
  tools: [
    { name: "Claude Code", mark: "AI", tone: "clay", icon: "/tools/anthropic.svg" },
    { name: "Codex", mark: "⌘", tone: "black", icon: "/tools/openai.svg" },
    { name: "ChatGPT", mark: "AI", tone: "black", icon: "/tools/openai.svg" },
    { name: "Julius AI", mark: "J", tone: "violet" },
    { name: "Python", mark: "Py", tone: "blue" },
    { name: "MySQL", mark: "SQL", tone: "orange" },
    { name: "Navicat", mark: "N", tone: "green" },
    { name: "DBeaver", mark: "DB", tone: "clay" },
    { name: "Excel", mark: "X", tone: "green", icon: "/tools/excel.svg" },
    { name: "SPSS", mark: "S", tone: "blue", icon: "/tools/ibm.svg" },
    { name: "Wind", mark: "W", tone: "red", icon: "/tools/wind.ico" },
    { name: "Choice", mark: "C", tone: "orange", icon: "/tools/choice.ico" },
    { name: "Tobii Pro", mark: "T", tone: "black", icon: "/tools/tobii.ico" },
  ] satisfies Tool[],
  skillGroups: [
    { title: "AI 与效率", advantage: "能把业务流程拆解为可复用的 AI 工具，并完成从需求到上线的闭环。", skills: ["Vibe Coding", "Claude Code", "Codex", "ChatGPT", "Julius AI"] },
    { title: "数据与实验", advantage: "从数据建模、查询分析到可视化表达，兼顾准确性与可解释性。", skills: ["SQL", "Python", "MySQL", "Navicat", "DBeaver", "Excel", "SPSS", "LMM"] },
    { title: "商业研究", advantage: "连接产业信息、财务指标与竞争格局。", skills: ["Choice", "Wind", "财务分析", "行业研究", "SWOT"] },
  ] satisfies SkillGroup[],
};

export type PortfolioContent = typeof portfolioContent;
