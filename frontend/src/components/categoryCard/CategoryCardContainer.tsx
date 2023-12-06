import { useEffect, useState } from "react";
import { CategoryType } from "../../utils/types";
import axios from "axios";
import CategoryCard from "./CategoryCard";
import style from "./CategoryCard.module.scss";
export default function CategoryCardContainer() {
  const [categories, setCategories] = useState<CategoryType[] | []>([]);

  useEffect(() => {
    axios
      .get<CategoryType[]>(
        `${import.meta.env.VITE_BACKEND_URL as string}/categories`
      )
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={style.categoryCardContainer}>
      {categories.map((category) => (
        <CategoryCard category={category} key={category.id as number} />
      ))}
    </div>
  );
}
