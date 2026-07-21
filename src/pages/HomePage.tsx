interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-icon">⌨️</div>
        <h1 className="hero-title">键盘练习与测试</h1>
        <p className="hero-subtitle">提升您的打字技能，从这里开始</p>
      </div>
      <div className="features-grid">
        <div className="feature-card" onClick={() => onNavigate('practice')}>
          <div className="feature-icon">📝</div>
          <h3 className="feature-title">基础练习</h3>
          <p className="feature-description">从字母到段落，循序渐进练习</p>
        </div>
        <div className="feature-card" onClick={() => onNavigate('test')}>
          <div className="feature-icon">⏱️</div>
          <h3 className="feature-title">速度测试</h3>
          <p className="feature-description">测试您的打字速度和准确率</p>
        </div>
        <div className="feature-card" onClick={() => onNavigate('history')}>
          <div className="feature-icon">📊</div>
          <h3 className="feature-title">历史记录</h3>
          <p className="feature-description">查看练习进度和成绩</p>
        </div>
      </div>
      <div className="tips-section">
        <h3>💡 打字技巧</h3>
        <ul className="tips-list">
          <li>保持正确的坐姿，眼睛注视屏幕</li>
          <li>将手指放在基准键位上（asdfjkl;）</li>
          <li>使用正确的手指敲击对应按键</li>
          <li>先追求准确率，再提高速度</li>
          <li>定期练习，养成良好习惯</li>
        </ul>
      </div>
    </div>
  );
}