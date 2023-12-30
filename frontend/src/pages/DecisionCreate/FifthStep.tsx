import { useEffect, useState } from "react";
import { getCategories } from "../../utils/api/categoryApi";
import { CategoryType } from "../../utils/types";
import style from "./DecisionCreate.module.scss";
import { newDecisionProps } from "./DecisionCreate";
import TagCategory from "../../components/tag/TagCategory";

export default function FifthStep({
  newDecision,
  setNewDecision,
}: newDecisionProps) {
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
          <TagCategory
            content={category.name}
            color={category.color}
            id={category.id}
            key={category.id}
            newDecision={newDecision}
            setNewDecision={setNewDecision}
            canBeSelected={true}
          />
        ))}
      </div>
    </div>
  );
}
