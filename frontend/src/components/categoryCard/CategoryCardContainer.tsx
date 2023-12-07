import { useEffect, useState } from "react";
import { CategoryType } from "../../utils/types";
import axios from "axios";
import CategoryCard from "./CategoryCard";
import style from "./CategoryCard.module.scss";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
export default function CategoryCardContainer() {
  const [categories, setCategories] = useState<CategoryType[] | []>([]);
  const windowSize = useWindowDimensions();
  const containerSize = 166 * (Math.round((windowSize - 160) / 150) - 1);
  const categoryCards = document.getElementsByClassName(style.categoryCard);
  const container = document.getElementsByClassName(
    style.categoryCardContainer
  );
  let x = 0;

  useEffect(() => {
    axios
      .get<CategoryType[]>(
        `${import.meta.env.VITE_BACKEND_URL as string}/categories`
      )
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const scroll = (direction: string) => {
    if (direction === "right") {
      categoryCards[categoryCards.length - 1].getBoundingClientRect().x + 160 >
      windowSize
        ? (x += 165)
        : x;
    } else {
      categoryCards[0].getBoundingClientRect().x < 80 ? (x -= 160) : 5 * 16;
    }
    container[0].scrollTo({ left: x, behavior: "smooth" });
  };

  return (
    <>
      <div className={style.categoryContainer}>
        <div
          className={style.categoryCardContainer}
          style={{ width: containerSize }}
        >
          {categories.map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scroll("left")}
          className={style.buttonLeft}
        >
          <ArrowLeftCircle />
        </button>

        <button
          type="button"
          onClick={() => scroll("right")}
          className={style.buttonRight}
        >
          <ArrowRightCircle />
        </button>
      </div>
    </>
  );
}
