import slugify from "@/util/slugify";
import Link from "next/link";
import styles from "./styles.module.scss";

type LinkItem = {
  href: string;
  label: string;
  description?: React.ReactNode;
};

type Props = {
  title: string;
  items: LinkItem[];
};

export const ResourceCard = ({ title, items }: Props) => {
  return (
    <article className={styles.resourceCard}>
      <h2>{title}</h2>
      <ul>
        {items.map(({ href, label, description }, i) => (
          <li key={label ? slugify(label) : `resource-card-${i}`}>
            <Link href={href}>{label}</Link>
            {description && (
              <small dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </li>
        ))}
      </ul>
    </article>
  );
};
