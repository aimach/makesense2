import title from "../../assets/img/title.svg";
import CategorySection from "../../components/categorySection/CategorySection";
import Searchbar from "../../components/searchbar/Searchbar";

export default function Home() {
  return (
    <div>
      <img src={title} alt="title" />
      <Searchbar />
      <CategorySection />
    </div>
  );
}
