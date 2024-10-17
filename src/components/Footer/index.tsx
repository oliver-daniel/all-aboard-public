import styles from "./styles.module.scss";
import clsx from "clsx";

type Props = {
  children: JSX.Element;
};
export const Footer = ({ children }: Props) => {
  const now = new Date().getFullYear();
  return (
    <footer className={clsx(styles.footer, "container")}>
      <nav className="grid" role="navigation">
        {children}
      </nav>
      <hr />
      <div>
        &copy; All Aboard Integrative Medicine, {now}. Website created by{" "}
        <a href="https://oliver.danielnet.ca">Oliver Daniel</a>.
      </div>
    </footer>
  );
};
