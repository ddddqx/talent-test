/* ==========================================
   天赋探测站 · Talent Discovery JS
   ========================================== */

// ===== 天赋维度配置 =====
const DIMENSIONS = [
  { id: 'logic',    name: '逻辑思维', icon: '🧠', color: '#7c5cbf' },
  { id: 'creative', name: '创造力',   icon: '🎨', color: '#5c8fbf' },
  { id: 'language', name: '语言天赋', icon: '💬', color: '#5cbf8f' },
  { id: 'spatial',  name: '空间智能', icon: '🧭', color: '#bf8f5c' },
  { id: 'social',   name: '社交情商', icon: '🤝', color: '#bf5c8f' },
  { id: 'practical',name: '动手实践', icon: '👐', color: '#8f5cbf' }
];

// ===== 12 道测试题（每个维度2题） =====
const QUESTIONS = [
  // 逻辑思维
  { dim: 'logic', q: '发现一个规则被打破时，你的第一反应是？',
    options: [
      { text: '分析原因，找出规律背后的逻辑', score: 5 },
      { text: '尝试适应新的规则', score: 3 },
      { text: '觉得无所谓，顺其自然', score: 1 }
    ]
  },
  { dim: 'logic', q: '遇到复杂问题时，你通常怎么做？',
    options: [
      { text: '拆解成小问题，一步步解决', score: 5 },
      { text: '凭直觉找最可能的答案', score: 3 },
      { text: '寻求他人的帮助和建议', score: 2 }
    ]
  },

  // 创造力
  { dim: 'creative', q: '给你一张白纸和一支笔，你第一件事会做什么？',
    options: [
      { text: '画一幅想象中的画面', score: 5 },
      { text: '写下一段文字或计划', score: 3 },
      { text: '折成一个纸飞机', score: 4 },
      { text: '放一边，想不出做什么', score: 1 }
    ]
  },
  { dim: 'creative', q: '看到一个日常物品（如回形针），你能想到多少种用法？',
    options: [
      { text: '10 种以上，各种奇思妙想', score: 5 },
      { text: '3-5 种，比较实用的', score: 3 },
      { text: '1-2 种，就是它本来的用途', score: 1 }
    ]
  },

  // 语言天赋
  { dim: 'language', q: '学习一门新语言时，你感觉最轻松的是？',
    options: [
      { text: '模仿发音和语调', score: 4 },
      { text: '记忆单词和短语', score: 3 },
      { text: '理解语法规则和结构', score: 5 },
      { text: '都不轻松，有点吃力', score: 1 }
    ]
  },
  { dim: 'language', q: '朋友向你倾诉烦心事，你更倾向于？',
    options: [
      { text: '认真倾听，然后给出建议', score: 4 },
      { text: '用温暖的话语安慰对方', score: 5 },
      { text: '分享自己类似的经历', score: 3 },
      { text: '不知道怎么回应，有点尴尬', score: 1 }
    ]
  },

  // 空间智能
  { dim: 'spatial', q: '去一个陌生的地方，你更习惯怎么认路？',
    options: [
      { text: '看地图，在脑海中形成路线图', score: 5 },
      { text: '记沿途的地标和建筑物', score: 4 },
      { text: '跟着导航走，不太记路', score: 2 },
      { text: '问当地人怎么走', score: 3 }
    ]
  },
  { dim: 'spatial', q: '拼拼图时，你的策略是？',
    options: [
      { text: '先看整体图案，再分类拼', score: 5 },
      { text: '从边角开始拼', score: 4 },
      { text: '随便拿一块试着拼', score: 2 },
      { text: '不太喜欢拼拼图', score: 1 }
    ]
  },

  // 社交情商
  { dim: 'social', q: '在聚会上遇到陌生人，你会？',
    options: [
      { text: '主动打招呼，聊各种话题', score: 5 },
      { text: '等别人先开口', score: 3 },
      { text: '找认识的人待在一起', score: 2 },
      { text: '尽快找个理由离开', score: 1 }
    ]
  },
  { dim: 'social', q: '团队合作中，你通常扮演什么角色？',
    options: [
      { text: '协调者，促进大家沟通协作', score: 5 },
      { text: '执行者，高效完成任务', score: 4 },
      { text: '思考者，提出创意方案', score: 3 },
      { text: '旁观者，听别人安排', score: 1 }
    ]
  },

  // 动手实践
  { dim: 'practical', q: '收到需要组装的家具，你的第一反应是？',
    options: [
      { text: '兴奋，立即动手组装', score: 5 },
      { text: '先看说明书再动手', score: 4 },
      { text: '找人帮忙一起装', score: 2 },
      { text: '有点头疼，想办法逃避', score: 1 }
    ]
  },
  { dim: 'practical', q: '学一项新技能（如做饭、手工），你更喜欢？',
    options: [
      { text: '直接上手实践，边做边学', score: 5 },
      { text: '看教程视频学习后再做', score: 4 },
      { text: '找有经验的人指导', score: 3 },
      { text: '想想就好，不太想动手', score: 1 }
    ]
  }
];

// ===== 天赋解读数据 =====
const INTERPRETATIONS = {
  logic: {
    title: '🧠 逻辑思维者',
    badge: '理性 · 分析 · 系统思考',
    desc: '你天生善于分析问题、发现规律。你的大脑像一台精密的计算机，能够把复杂的事情拆解成清晰的步骤。这种能力让你在编程、数学、策略规划等领域有天然优势。',
    tips: ['遇到问题时先列出已知条件和未知条件', '尝试用思维导图整理复杂信息', '学习编程或逻辑推理游戏来进一步锻炼']
  },
  creative: {
    title: '🎨 创意先锋',
    badge: '想象 · 创新 · 发散思维',
    desc: '你的脑海里住着一个天马行空的艺术家。你能从平凡的事物中发现不平凡的可能性，这种创造力是推动世界进步的重要力量。你适合从事设计、写作、艺术、产品创新等领域。',
    tips: ['随身携带灵感本，随时记录想法', '尝试跨界学习，不同领域的碰撞会产生新创意', '定期给自己"胡思乱想"的时间']
  },
  language: {
    title: '💬 语言大师',
    badge: '表达 · 沟通 · 文字敏感',
    desc: '你对语言有着天然的敏感度，无论是口头表达还是书面写作，你都能精准地传达想法。你的共情能力和语言天赋让你在沟通、文学、教育、翻译等领域大放异彩。',
    tips: ['多阅读不同类型的书籍拓展词汇', '尝试写作或翻译练习', '学习一门新语言来发挥你的天赋']
  },
  spatial: {
    title: '🧭 空间导航师',
    badge: '方向 · 想象 · 视觉思维',
    desc: '你有着出色的空间想象力和方向感。你能够在脑海中构建三维模型，轻松理解空间关系。这种天赋在建筑、设计、摄影、导航、游戏开发等领域非常有价值。',
    tips: ['尝试绘画、摄影或3D建模', '玩一些策略类和益智类游戏', '旅行时尝试不用导航认路']
  },
  social: {
    title: '🤝 社交达人',
    badge: '共情 · 领导 · 人际敏感',
    desc: '你天生善于理解和连接他人。你能敏锐地感知别人的情绪和需求，在团队中自然成为凝聚力的中心。这种高情商让你在管理、销售、心理咨询、教育等领域有独特优势。',
    tips: ['主动组织和参与社交活动', '练习积极倾听和反馈技巧', '考虑从事需要与人打交道的工作']
  },
  practical: {
    title: '👐 实干家',
    badge: '动手 · 执行 · 实践智慧',
    desc: '你是一个"动手做"的人。相比于空想，你更喜欢亲手去创造、去实现。你的实践能力和执行力是非常宝贵的才能，让你在工程、手工艺、烹饪、维修等领域得心应手。',
    tips: ['多参加动手实践类工作坊', '尝试 DIY 项目或手工艺创作', '把你的实践经验分享给更多人']
  }
};

// ===== 状态 =====
let currentQuestion = 0;
let scores = { logic: 0, creative: 0, language: 0, spatial: 0, social: 0, practical: 0 };
let answers = [];

// ===== DOM 引用 =====
const $ = (sel) => document.querySelector(sel);
const heroSection = $('#heroSection');
const quizSection = $('#quizSection');
const resultSection = $('#resultSection');
const startBtn = $('#startBtn');
const restartBtn = $('#restartBtn');
const questionText = $('#questionText');
const optionsContainer = $('#optionsContainer');
const progressText = $('#progressText');
const progressFill = $('#progressFill');
const dimIcon = $('#dimIcon');
const dimName = $('#dimName');
const radarCanvas = $('#radarCanvas');
const talentRankings = $('#talentRankings');
const interpretation = $('#interpretation');
const resultSubtitle = $('#resultSubtitle');

// ===== 开始测试 =====
startBtn.addEventListener('click', () => {
  heroSection.style.display = 'none';
  quizSection.style.display = 'flex';
  currentQuestion = 0;
  scores = { logic: 0, creative: 0, language: 0, spatial: 0, social: 0, practical: 0 };
  answers = [];
  showQuestion();
});

restartBtn.addEventListener('click', () => {
  resultSection.style.display = 'none';
  heroSection.style.display = 'flex';
  window.scrollTo(0, 0);
});

// ===== 显示题目 =====
function showQuestion() {
  if (currentQuestion >= QUESTIONS.length) {
    showResults();
    return;
  }

  const q = QUESTIONS[currentQuestion];
  const dim = DIMENSIONS.find(d => d.id === q.dim);

  progressText.textContent = `第 ${currentQuestion + 1} / ${QUESTIONS.length} 题`;
  progressFill.style.width = `${(currentQuestion / QUESTIONS.length) * 100}%`;
  dimIcon.textContent = dim.icon;
  dimName.textContent = dim.name;
  questionText.textContent = q.q;

  optionsContainer.innerHTML = q.options.map((opt, i) =>
    `<button class="quiz-option" data-index="${i}">${opt.text}</button>`
  ).join('');

  optionsContainer.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => selectOption(btn, q));
  });
}

// ===== 选择答案 =====
function selectOption(btn, q) {
  optionsContainer.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  const idx = parseInt(btn.dataset.index);
  const score = q.options[idx].score;

  scores[q.dim] += score;
  answers.push({ dim: q.dim, score });

  setTimeout(() => {
    currentQuestion++;
    showQuestion();
  }, 350);
}

// ===== 显示结果 =====
function showResults() {
  quizSection.style.display = 'none';
  resultSection.style.display = 'block';

  const sorted = DIMENSIONS.map(d => ({
    ...d,
    score: scores[d.id]
  })).sort((a, b) => b.score - a.score);

  const maxScore = Math.max(...sorted.map(s => s.score));
  const top = sorted[0];
  const topInterp = INTERPRETATIONS[top.id];

  resultSubtitle.textContent = `你的最高天赋是「${top.name}」！基于你的选择，我们发现了你的天赋倾向`;

  // 绘制雷达图
  drawRadar(sorted);
  // 天赋排行
  renderRankings(sorted, maxScore);
  // 天赋解读
  renderInterpretation(top, topInterp);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== 绘制雷达图 =====
function drawRadar(sorted) {
  const ctx = radarCanvas.getContext('2d');
  const W = radarCanvas.width;
  const H = radarCanvas.height;
  const cx = W / 2;
  const cy = H / 2;
  const R = Math.min(W, H) * 0.35;
  const levels = 5;
  const count = sorted.length;
  const maxScore = Math.max(...sorted.map(s => s.score));
  const effectiveMax = Math.max(maxScore, 1);

  ctx.clearRect(0, 0, W, H);

  // 背景网格
  for (let l = 1; l <= levels; l++) {
    const r = (R / levels) * l;
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = l === levels ? 'rgba(124,92,191,0.2)' : 'rgba(124,92,191,0.08)';
    ctx.lineWidth = l === levels ? 1.5 : 1;
    ctx.stroke();
  }

  // 轴线
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
    ctx.strokeStyle = 'rgba(124,92,191,0.08)';
    ctx.stroke();

    // 标签
    const lx = cx + (R + 30) * Math.cos(angle);
    const ly = cy + (R + 30) * Math.sin(angle);
    ctx.fillStyle = '#2d2444';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(sorted[i].icon + sorted[i].name, lx, ly);
  }

  // 数据填充
  ctx.beginPath();
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const score = sorted[i].score;
    const r = (score / effectiveMax) * R;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(124, 92, 191, 0.15)';
  ctx.fill();
  ctx.strokeStyle = '#7c5cbf';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 数据点
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    const score = sorted[i].score;
    const r = (score / effectiveMax) * R;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#7c5cbf';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// ===== 渲染天赋排行 =====
function renderRankings(sorted, maxScore) {
  talentRankings.innerHTML = sorted.map((s, i) => {
    const pct = Math.round((s.score / Math.max(maxScore, 1)) * 100);
    return `
      <div class="talent-bar">
        <span class="talent-icon">${s.icon}</span>
        <div class="talent-info">
          <div class="talent-name">${s.name}</div>
          <div class="talent-track">
            <div class="talent-fill" style="width: ${pct}%"></div>
          </div>
        </div>
        <span class="talent-score">${s.score}</span>
      </div>
    `;
  }).join('');
}

// ===== 渲染天赋解读 =====
function renderInterpretation(top, interp) {
  interpretation.innerHTML = `
    <h3>${interp.title}</h3>
    <span class="interp-badge">${interp.badge}</span>
    <p>${interp.desc}</p>
    <p><strong>💡 发展建议：</strong></p>
    <ul>
      ${interp.tips.map(t => `<li>${t}</li>`).join('')}
    </ul>
  `;
}

// ===== 键盘快捷键 =====
document.addEventListener('keydown', (e) => {
  if (quizSection.style.display !== 'flex') return;
  const options = optionsContainer.querySelectorAll('.quiz-option');
  const selected = optionsContainer.querySelector('.quiz-option.selected');

  if (e.key >= '1' && e.key <= '4') {
    const idx = parseInt(e.key) - 1;
    if (options[idx]) options[idx].click();
  }
});
