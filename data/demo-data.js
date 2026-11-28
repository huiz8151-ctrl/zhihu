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
  question: {
    title: "零基础进入 AI 行业，应该先学机器学习还是直接学大模型？",
    source: "知乎问题 · 演示数据",
    answerCount: 128,
    evidenceCount: 5,
    updatedAt: "今天 09:42"
  },
  questions: [
    {
      id: "question-ai-path",
      title: "零基础进入 AI 行业，应该先学机器学习还是直接学大模型？",
      source: "知乎问题 · 演示数据",
      answerCount: 128,
      experienceCount: 5,
      updatedAt: "今天 09:42",
      status: "当前问题"
    }
  ],
  experiences: [
    { id: "answer-001", questionId: "question-ai-path", type: "answer", source: "zhihu", tag: "高赞回答", title: "基础和项目不应该被排成先后", content: "如果目标是做出东西，基础和项目不应该被排成先后，而应该从第一周就并行。", author: "一位 AI 应用工程师", sourceLabel: "知乎回答 · 学习路线讨论", sourceUrl: "https://www.zhihu.com/", likes: 2400, relevance: 92, stance: "parallel", stanceLabel: "基础与实践并行", addedBy: "system" },
    { id: "comment-001", questionId: "question-ai-path", type: "comment", source: "zhihu", tag: "关键评论", title: "先做一个小项目，才知道自己缺什么", content: "直接学大模型 API 的反馈很快，但遇到数据和评估问题时，还是会回到机器学习的基本功。", author: "一位算法从业者", sourceLabel: "知乎评论 · 转行经验", sourceUrl: "https://www.zhihu.com/", likes: 1800, relevance: 89, stance: "practice", stanceLabel: "支持实践", addedBy: "system" },
    { id: "answer-002", questionId: "question-ai-path", type: "answer", source: "zhihu", tag: "高赞回答", title: "把数学当作节点，而不是启动门槛", content: "应用型目标不必等数学全部学完再开始，但进入模型原理阶段后，需要补齐概率、线性代数和优化的基本概念。", author: "一位机器学习研究者", sourceLabel: "知乎回答 · 入门路线", sourceUrl: "https://www.zhihu.com/", likes: 1600, relevance: 86, stance: "support", stanceLabel: "支持基础", addedBy: "system" },
    { id: "comment-002", questionId: "question-ai-path", type: "comment", source: "zhihu", tag: "关键评论", title: "课程数量不如一个能解释清楚的项目", content: "现在更容易被看见的，不是学过多少课程，而是能否解释一个项目为什么这样设计。", author: "一位产品负责人", sourceLabel: "知乎评论 · AI 产品实践", sourceUrl: "https://www.zhihu.com/", likes: 1200, relevance: 84, stance: "practice", stanceLabel: "支持实践", addedBy: "system" },
    { id: "answer-003", questionId: "question-ai-path", type: "answer", source: "zhihu", tag: "高赞回答", title: "用最小基础快速进入真实反馈", content: "可以先用两周建立 Python、数据处理和模型评估的最小认知，然后用一个 RAG 项目验证理解，不必等完整学完再动手。", author: "一位 AI 产品经理", sourceLabel: "知乎回答 · 非科班转型", sourceUrl: "https://www.zhihu.com/", likes: 986, relevance: 91, stance: "parallel", stanceLabel: "基础与实践并行", addedBy: "system" },
  ]
};
