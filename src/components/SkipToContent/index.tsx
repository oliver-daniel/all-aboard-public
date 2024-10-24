import styles from "./styles.module.scss";

type Props = {
  selector?: string | null;
};

export const SkipToContent = ({ selector = "#content" }: Props) => {
  if (selector === null) {
    return null;
  }

  const contentElement = document.querySelector<HTMLElement>(selector);

  return (
    <button
      id={styles["skip-to-content"]}
      aria-label="skip-to-content"
      onClick={() => {
        contentElement?.focus();
        contentElement?.scrollIntoView();
      }}
    >
      Skip to content
    </button>
  );
};
