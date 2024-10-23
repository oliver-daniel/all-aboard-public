import { linkProps } from "@/util/link-props";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./styles.module.scss";

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
  const router = useRouter();

  useEffect(() => {
    const onRouteChangeSuccess = () => {
      (document.getElementById("menu-btn") as HTMLInputElement).checked = false;
    };

    router.events.on("routeChangeComplete", onRouteChangeSuccess);

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeSuccess);
    };
  });

  return (
    <header className={styles.navbar}>
      <nav className="container-fluid">
        <input type="checkbox" id="menu-btn" />
        <label className="menu-icon contrast" htmlFor="menu-btn" tabIndex={-1}>
          <span className="nav-icon">Menu</span>
        </label>
        <ul className="menu">
          {(sections ?? []).map((section, i) => (
            <NavSection key={i} {...section} />
          ))}
        </ul>
      </nav>
    </header>
  );
};
