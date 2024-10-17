import Link from "next/link";
import styles from "./styles.module.scss";
import { linkProps } from "@/util/link-props";

type NavSectionData = {
  label: string;
} & ({ href: string } | { children: NavSectionData[] });

const NavSection = (props: NavSectionData) => (
  <li>
    {"href" in props ? (
      <Link className="contrast" href={props.href} {...linkProps(props.href)}>
        {props.label}
      </Link>
    ) : (
      <details className="dropdown">
        <summary role="button">{props.label}</summary>
        <ul>
          {props.children.map((section, i) => (
            <NavSection key={i} {...section} />
          ))}
        </ul>
      </details>
    )}
  </li>
);

type Props = {
  sections: NavSectionData[];
};

export const Header = ({ sections }: Props) => {
  return (
    <header className={styles.navbar}>
      <nav className="container-fluid">
        <ul className="menu">
          {(sections ?? []).map((section, i) => (
            <NavSection key={i} {...section} />
          ))}
        </ul>
      </nav>
    </header>
  );
};
