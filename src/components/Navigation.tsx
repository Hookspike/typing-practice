interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'home', label: '首页' },
  { id: 'practice', label: '练习' },
  { id: 'test', label: '测试' },
  { id: 'history', label: '历史记录' },
];

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="navigation">
      <div className="nav-brand">
        <span className="brand-icon">⌨️</span>
        <span className="brand-text">键盘练习</span>
      </div>
      <div className="nav-links">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}