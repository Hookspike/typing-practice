import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/pages/HomePage';
import { PracticePage } from '@/pages/PracticePage';
import { TestPage } from '@/pages/TestPage';
import { HistoryPage } from '@/pages/HistoryPage';
import { AchievementsPage } from '@/pages/AchievementsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'practice':
        return <PracticePage />;
      case 'test':
        return <TestPage />;
      case 'history':
        return <HistoryPage />;
      case 'achievements':
        return <AchievementsPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
      <footer className="footer">
        <p>键盘练习与测试 - 提升您的打字技能</p>
      </footer>
    </div>
  );
}

export default App;