window.demoData = {
  pathNodes: [
    { phase: "PHASE 01", title: "Python 基础", desc: "能读懂并改写简单代码" },
    { phase: "PHASE 01", title: "数据与数学", desc: "理解模型在处理什么" },
    { phase: "PHASE 02", title: "机器学习", desc: "建立训练与评估的直觉" },
    { phase: "PHASE 02", title: "深度学习", desc: "看懂神经网络的工作方式" },
    { phase: "PHASE 03", title: "大模型应用", desc: "从调用 API 到设计流程" },
    { phase: "PHASE 03", title: "RAG 项目", desc: "用真实资料完成一次验证" }
  ],
  evidence: [
    { type: "正向经验", likes: "2.4K 赞", quote: "如果目标是做出东西，基础和项目不应该被排成先后，而应该从第一周就并行。", author: "一位 AI 应用工程师", source: "知乎回答 · 学习路线讨论" },
    { type: "反向经验", likes: "1.8K 赞", quote: "直接学大模型 API 的反馈很快，但遇到数据和评估问题时，还是会回到机器学习的基本功。", author: "一位算法从业者", source: "知乎回答 · 转行经验" },
    { type: "行业观察", likes: "986 赞", quote: "现在更容易被看见的，不是学过多少课程，而是能否解释一个项目为什么这样设计。", author: "一位产品负责人", source: "知乎文章 · AI 产品实践" }
  ],
  agents: [
    { avatar: "路", role: "PATH PLANNER", title: "学习规划师", desc: "关注知识依赖和投入产出，帮你排出不绕路的顺序。", stance: "建议：先补最小基础" },
    { avatar: "实", role: "PRACTITIONER", title: "行业实践者", desc: "关注真实工作和项目机会，提醒你别把学习变成收藏。", stance: "建议：尽早做项目" },
    { avatar: "慎", role: "SKEPTIC", title: "谨慎派顾问", desc: "专门寻找过度承诺和隐藏成本，帮你看见路线的边界。", stance: "提醒：不要跳过理解" }
  ],
  timeline: [
    { week: "WEEK 01—02", title: "建立最小基础", desc: "完成 Python 语法、数据结构和一次简单数据处理练习。" },
    { week: "WEEK 03—05", title: "理解模型并做实验", desc: "学习机器学习核心概念，用一个小数据集完成训练和评估。" },
    { week: "WEEK 06—08", title: "完成 RAG 小项目", desc: "把真实资料接入问答流程，记录你的设计取舍和评估结果。" }
  ],
  saved: [
    { type: "正向经验", title: "基础和项目不应该被排成先后", meta: "2.4K 赞 · 学习路线讨论", tone: "mint" },
    { type: "行业观察", title: "现在更容易被看见的是项目取舍", meta: "986 赞 · AI 产品实践", tone: "yellow" },
    { type: "反向经验", title: "直接学大模型，最后还是会回到基本功", meta: "1.8K 赞 · 转行经验", tone: "orange" }
  ],
  ranking: [
    { rank: "01", category: "learning", tag: "学习路径", title: "零基础进入 AI 行业，先学机器学习还是大模型？", author: "AI 学习路线", likes: "2.4K", trend: "+34%" },
    { rank: "02", category: "practice", tag: "项目实践", title: "用一个 RAG 项目证明自己，最小闭环应该怎么做？", author: "项目拆解", likes: "1.9K", trend: "+26%" },
    { rank: "03", category: "career", tag: "行业转型", title: "非计算机专业转 AI 产品，第一份作品集怎么准备？", author: "转行经验", likes: "1.6K", trend: "+21%" },
    { rank: "04", category: "learning", tag: "学习路径", title: "每周只有 6 小时，如何安排大模型入门？", author: "时间管理", likes: "1.2K", trend: "+17%" },
    { rank: "05", category: "practice", tag: "项目实践", title: "从调用 API 到真正理解 Agent，中间差了什么？", author: "Agent 实践", likes: "986", trend: "+12%" }
  ]
};
