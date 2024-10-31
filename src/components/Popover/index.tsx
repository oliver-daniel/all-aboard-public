import { GlossaryRepr } from "@/hooks/usePopover";
import styles from "./styles.module.scss";
import { useRef } from "react";

type Props = {
  items?: GlossaryRepr[];
};

const PopoverContent = ({
  item,
  ...props
}: { item: GlossaryRepr } & React.HTMLProps<HTMLDivElement>) => {
  const ref = useRef(null);
  return (
    <article {...props} popover="auto" className={styles.content} ref={ref}>
      <header>
        <button
          rel="prev"
          aria-label="Close"
          onClick={() => ref.current?.hidePopover()}
        >
          <span className={styles["close-icon"]}></span>
        </button>
        <p>
          <strong>{item.defn.value}</strong>
        </p>
      </header>
      <div
        className="container"
        dangerouslySetInnerHTML={{ __html: item.defn.definition }}
      />
    </article>
  );
};

export const PopoverContainer = ({ items = [] }: Props) => {
  return (
    <div id="popover-container">
      {items.map((item) => (
        <PopoverContent key={item.hash} id={item.hash} item={item} />
      ))}
    </div>
  );
};
