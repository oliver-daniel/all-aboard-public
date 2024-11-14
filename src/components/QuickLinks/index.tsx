import Link from "next/link";
import { useMemo } from "react";

import styles from "./styles.module.scss";

export type Props = {
  selector?: string;
  children?: React.ReactNode;
};

export const QuickLinks = ({ selector = "h2", children }: Props) => {
  const items =
    useMemo(() => {
      if (typeof document === "undefined") return;
      const elements = document.querySelectorAll(selector);
      return Array.from(elements).map((element) => [
        element.id,
        element.textContent,
      ]);
    }, [selector]) ?? [];
  return (
    <aside className={styles.quickLinks}>
      <article>
        {children}
        <nav>
          {items.map(([slug, textContent]) => (
            <Link key={slug} href={`#${slug}`}>
              {textContent}
            </Link>
          ))}
        </nav>
      </article>
    </aside>
  );
};
