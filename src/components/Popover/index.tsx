import { GlossaryRepr } from "@/hooks/usePopover";
import styles from "./styles.module.scss";

type Props = {
  items?: GlossaryRepr[];
};

export const PopoverContainer = ({ items = [] }: Props) => {
  return (
    <div id="popover-container">
      {items.map(({ hash, defn }) => (
        <div key={hash} popover="auto" id={hash}>
          {defn.definition}
        </div>
      ))}
    </div>
  );
};
