import styles from './Header.module.css';

import type { TabType, ITab } from '../types/tabs';

interface HeaderProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const tabs: ITab[] = [
    { id: 'all', label: 'Все котики' },
    { id: 'favorites', label: 'Любимые котики' },
];

export const Header = ({ activeTab, onTabChange }: HeaderProps) => {

    const renderTab = ({ id, label }: ITab) => {
        const isActive = activeTab === id;
        const tabClassName = `${styles.tab} ${isActive ? styles.tabActive : ''}`;

        return (
            <button
                key={id}
                type="button"
                className={`${styles.tab} ${tabClassName}`}
                onClick={() => onTabChange(id)}
                aria-pressed={isActive}
            >
                {label}
            </button>
        )
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                {tabs.map(renderTab)}
            </nav>
        </header>
    );
};

