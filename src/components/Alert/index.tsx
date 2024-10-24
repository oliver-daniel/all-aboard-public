import styles from "./styles.module.scss";

type Props = {
  children: JSX.Element;
};

export const Alert = ({ children }: Props) => (
  <div className={styles.alert} role="alert">
    {children}
  </div>
);
