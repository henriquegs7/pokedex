import styles from './styles.module.css';
import { Icon } from "../icon";

export function ScrollToTop() {
  function handleScrollTop() {
    document.querySelectorAll("*").forEach((el) => {
      if (el.scrollTop > 0) {
        el.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  return (
    <button onClick={handleScrollTop} className={styles.buttonTop}>
      <Icon name="IconSVGArrowUp" size={24} className={styles.buttonTopIcon} />
    </button>
  );
};