import { useState } from 'react';

import { Header } from './components/Header/Header';
import { CatContent } from './components/CatContent/CatContent';

import styles from "./App.module.css";

import type { TabType } from './types/tabs';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  return (
    <div>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className={styles.main}>
        <CatContent activeTab={activeTab} />
      </main>
    </div>
  )
}

export default App;