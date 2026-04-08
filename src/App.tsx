import { useState } from 'react';

import { Header } from './components/Header/Header';

import styles from "./App.module.css";

import type { TabType } from './components/types/tabs';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  return (
    <div>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className={styles.main}>
        {activeTab === 'all' ? (
          <span>список всех котиков</span>
        ) : (
          <span>любимые котики</span>
        )}
      </main>
    </div>
  )
}

export default App;