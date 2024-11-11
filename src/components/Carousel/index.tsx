import { Carousel as NukaCarousel, CarouselProps } from "nuka-carousel";
import styles from "./styles.module.scss";

type Props = {
  children: React.ReactNode;
};

export const Carousel = ({ children }: Props) => {
  const options: CarouselProps = {
    showArrows: true,
    showDots: true,
    autoplay: true,
    autoplayInterval: 5000,
    scrollDistance: "slide",
    wrapMode: "wrap",
    children,
  };
  return <NukaCarousel className={styles.carousel} {...options} />;
};
