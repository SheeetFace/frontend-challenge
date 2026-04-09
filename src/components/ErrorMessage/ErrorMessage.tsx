import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
    message: string;
    onRetry: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => (
    <div className={styles.container}>
        <p className={styles.text}>{message}</p>
        <button 
            type="button"
            className={styles.retryBtn}
            onClick={onRetry}
        >
            Попробовать еще раз
        </button>
    </div>
);
