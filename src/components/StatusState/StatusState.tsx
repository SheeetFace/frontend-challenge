import styles from './StatusState.module.css';

interface StatusStateProps {
  message: string;
  icon?: string;
}

export const StatusState = ({ message, icon = '' }: StatusStateProps) => (
  <div className={styles.container}>
    <span className={styles.text}>{message}</span>
    <span className={styles.icon}>{icon}</span>
  </div>
);
