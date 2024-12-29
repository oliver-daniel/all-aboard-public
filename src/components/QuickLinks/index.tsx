import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";

export type Props = {
  selector?: string;
  children?: React.ReactNode;
};

export const QuickLinks = ({ children }: Props) => {
  const [items, setItems] = useState<[string, string | null][]>([]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const elements = document.querySelectorAll("h2");

    setItems(
      Array.from(elements).map((element) => [element.id, element.textContent])
    );
  }, []);

  return (
    <aside className={styles.quickLinks}>
      <article>
        {children}
        <nav>
          {items?.length ? (
            items.map(([slug, textContent]) => (
              <Link key={slug} href={`#${slug}`}>
                {textContent}
              </Link>
            ))
          ) : (
            <progress />
          )}
        </nav>
      </article>
    </aside>
  );
};
