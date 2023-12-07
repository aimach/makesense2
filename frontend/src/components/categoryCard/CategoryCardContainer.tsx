import { useEffect, useState } from "react";
import { CategoryType } from "../../utils/types";
import axios from "axios";
import CategoryCard from "./CategoryCard";
import style from "./CategoryCard.module.scss";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
export default function CategoryCardContainer() {
  const [categories, setCategories] = useState<CategoryType[] | []>([]);
  const windowSize = useWindowDimensions();

  useEffect(() => {
    axios
      .get<CategoryType[]>(
        `${import.meta.env.VITE_BACKEND_URL as string}/categories`
      )
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  let x = 0;
  const scroll = (direction: string) => {
    const container = document.getElementsByClassName(
      style.categoryCardContainer
    );
    if (direction === "right") {
      x += 160;
    } else {
      x -= 160;
    }
    container[0].scrollTo({ left: x, behavior: "smooth" });
  };

  const ContainerSize = {
    width: 166 * (Math.round((windowSize - 160) / 150) - 1),
  };

  return (
    <>
      <div className={style.categoryCardContainer} style={ContainerSize}>
        {categories.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>
      <button type="button" onClick={() => scroll("left")}>
        gauche
      </button>
      <button type="button" onClick={() => scroll("right")}>
        droite
      </button>
    </>
  );
}
