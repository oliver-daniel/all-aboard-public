import styles from "./styles.module.scss";

export type Props = {
  selector?: string;
  children?: React.ReactNode;
};

export const QuickLinks = ({ children }: Props) => {
  // const router = useRouter();
  // const items =
  //   useMemo(() => {
  //     if (typeof document === "undefined") return;
  //     const elements = document.querySelectorAll(selector);
  //     return Array.from(elements).map((element) => [
  //       element.id,
  //       element.textContent,
  //     ]);
  //   }, [selector, router.asPath]) ?? [];
  return (
    <aside className={styles.quickLinks}>
      <article>
        {children}
        <nav>
          {/* {items ? (
            items.map(([slug, textContent]) => (
              <Link key={slug} href={`#${slug}`}>
                {textContent}
              </Link>
            ))
          ) : (
            <progress />
          )} */}
        </nav>
      </article>
    </aside>
  );
};
