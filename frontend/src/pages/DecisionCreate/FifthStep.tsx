import { useEffect, useState } from "react";
import { getCategories } from "../../utils/api/categoryApi";
import { CategoryType } from "../../utils/types";
import Tag from "../../components/tag/Tag";
import style from "./DecisionCreate.module.scss";

export default function FifthStep() {
  const [categories, setCategories] = useState<CategoryType[] | []>([]);
  useEffect(() => {
    const getAllTags = async () => {
      try {
        const response = await getCategories();
        setCategories(response as CategoryType[]);
      } catch (error) {
        console.error(error);
      }
    };
    getAllTags();
  }, []);
  return (
    <div>
      <h3>Choisir les tags</h3>
      <div className={style.tagContainer}>
        {categories.map((category) => (
          <Tag
            content={category.name}
            color={category.color}
            canBeSelected={true}
            key={category.id}
          />
        ))}
      </div>
    </div>
  );
}
