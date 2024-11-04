import Link from "next/link";
import styles from "./styles.module.scss";

type Props = {
  children: JSX.Element;
  link?: string;
  attributes: object;
};

export const Testimonial = ({ children, link, attributes }: Props) => {
  return (
    <blockquote {...attributes} className={styles.testimonial}>
      {children}
      {link && (
        <small className={styles.cta}>
          <Link href={link}>Read the full testimonial</Link>
        </small>
      )}
    </blockquote>
  );
};
