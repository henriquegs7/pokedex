import styles from './styles.module.css'

export function Loading({loading}: {loading: boolean}) {
  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loadingContent}>
          <div className={styles.dotsContainer}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
          <p className={styles.loadingText}>Carregando...</p>
        </div>
      ) : (
        <div className={styles.successContent}>
          <div className={styles.successIcon}>
            <div className={styles.checkmark}>✓</div>
          </div>
          <p className={styles.successText}>Concluído!</p>
        </div>
      )}
    </div>
  )
}