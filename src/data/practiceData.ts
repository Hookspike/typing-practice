export const letterGroups = [
  { name: '基础键位', letters: 'asdfjkl;', description: '键盘上的基准键位' },
  { name: '左手指', letters: 'qwertzxcv', description: '左手负责的键位' },
  { name: '右手指', letters: 'yuiop[]/nm,.', description: '右手负责的键位' },
  { name: '数字键', letters: '1234567890', description: '顶部数字键' },
  { name: '所有字母', letters: 'abcdefghijklmnopqrstuvwxyz', description: '完整字母表' },
];

export const englishWords = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'it',
  'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this',
  'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or',
  'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so',
  'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when',
  'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people',
  'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than',
  'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back',
  'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even',
  'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is'
];

export const chineseWords = [
  '的', '一', '是', '在', '不', '了', '有', '和', '人', '这',
  '中', '大', '上', '为', '下', '个', '国', '我', '以', '要',
  '他', '时', '来', '用', '们', '生', '到', '作', '地', '于',
  '出', '就', '分', '对', '成', '会', '可', '主', '发', '年',
  '动', '同', '工', '也', '能', '下', '过', '子', '说', '产',
  '种', '面', '而', '方', '后', '多', '定', '行', '法', '所',
  '民', '得', '经', '十三', '之', '进', '着', '等', '部', '度',
  '家', '电', '力', '里', '水', '化', '高', '自', '二', '理',
  '起', '小', '物', '现', '实', '加', '量', '都', '两', '体制',
  '机', '当', '使', '点', '从业', '本', '去', '把', '性', '好',
  '应', '开', '它', '合', '还', '因', '由', '其', '些', '然'
];

export const englishSentences = [
  'The quick brown fox jumps over the lazy dog.',
  'Practice makes perfect.',
  'To be or not to be, that is the question.',
  'All that glitters is not gold.',
  'Actions speak louder than words.',
  'Knowledge is power.',
  'The early bird catches the worm.',
  'A journey of a thousand miles begins with a single step.',
  'Where there is a will, there is a way.',
  'Time flies when you are having fun.'
];

export const chineseSentences = [
  '天行健，君子以自强不息。',
  '学而不思则罔，思而不学则殆。',
  '海内存知己，天涯若比邻。',
  '山不在高，有仙则名。水不在深，有龙则灵。',
  '白日依山尽，黄河入海流。欲穷千里目，更上一层楼。',
  '两个黄鹂鸣翠柳，一行白鹭上青天。',
  '春风又绿江南岸，明月何时照我还。',
  '人生自古谁无死，留取丹心照汗青。',
  '会当凌绝顶，一览众山小。',
  '采菊东篱下，悠然见南山。'
];

export const englishParagraphs = [
  `In the digital age, typing has become an essential skill for communication and productivity. Whether you're writing emails, creating documents, or coding software, the ability to type quickly and accurately can save you time and reduce frustration. Regular practice is the key to improving your typing skills. Start with proper finger placement and gradually increase your speed as you build muscle memory.`,
  `Learning to touch type opens up a world of possibilities. Without looking at the keyboard, you can focus entirely on your work, making you more efficient and less prone to errors. Many people find that touch typing also reduces fatigue since you're not constantly looking down at your hands. With dedication and practice, anyone can become a proficient typist.`,
  `The QWERTY keyboard layout was designed in the 1870s to prevent typewriter keys from jamming. Despite its age, it remains the most widely used keyboard layout today. While alternative layouts like Dvorak and Colemak claim to be more efficient, QWERTY's popularity ensures it will remain the standard for years to come.`
];

export const chineseParagraphs = [
  `打字是一项重要的技能，在现代社会中不可或缺。无论是日常办公、学习还是娱乐，我们都需要通过键盘来输入文字。掌握正确的打字方法不仅可以提高输入速度，还能减轻手部疲劳，提高工作效率。`,
  `学习打字的第一步是熟悉键盘布局和正确的指法。将手指放在基准键位上，养成盲打的习惯，这样可以让眼睛专注于屏幕，大大提高输入效率。通过不断练习，手指会形成肌肉记忆，打字会变得越来越熟练。`,
  `打字速度和准确率是衡量打字水平的两个重要指标。初学者应该先注重准确率，在保证正确的前提下再逐渐提高速度。随着练习的深入，你的打字技能会不断进步，最终达到快速准确的目标。`
];

export const fingerMap: Record<string, { finger: string; hand: 'left' | 'right' }> = {
  'q': { finger: 'pinky', hand: 'left' },
  'w': { finger: 'ring', hand: 'left' },
  'e': { finger: 'middle', hand: 'left' },
  'r': { finger: 'index', hand: 'left' },
  't': { finger: 'index', hand: 'left' },
  'y': { finger: 'index', hand: 'right' },
  'u': { finger: 'index', hand: 'right' },
  'i': { finger: 'middle', hand: 'right' },
  'o': { finger: 'ring', hand: 'right' },
  'p': { finger: 'pinky', hand: 'right' },
  'a': { finger: 'pinky', hand: 'left' },
  's': { finger: 'ring', hand: 'left' },
  'd': { finger: 'middle', hand: 'left' },
  'f': { finger: 'index', hand: 'left' },
  'g': { finger: 'index', hand: 'left' },
  'h': { finger: 'index', hand: 'right' },
  'j': { finger: 'index', hand: 'right' },
  'k': { finger: 'middle', hand: 'right' },
  'l': { finger: 'ring', hand: 'right' },
  ';': { finger: 'pinky', hand: 'right' },
  'z': { finger: 'pinky', hand: 'left' },
  'x': { finger: 'ring', hand: 'left' },
  'c': { finger: 'middle', hand: 'left' },
  'v': { finger: 'index', hand: 'left' },
  'b': { finger: 'index', hand: 'left' },
  'n': { finger: 'index', hand: 'right' },
  'm': { finger: 'middle', hand: 'right' },
  ',': { finger: 'ring', hand: 'right' },
  '.': { finger: 'pinky', hand: 'right' },
  '/': { finger: 'pinky', hand: 'right' },
};

export const fingerNames = {
  pinky: '小指',
  ring: '无名指',
  middle: '中指',
  index: '食指',
  thumb: '拇指',
};