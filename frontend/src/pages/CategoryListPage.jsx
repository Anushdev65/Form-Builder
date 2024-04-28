import CategoryList from "../components/CategoryList";
import Navbar from "../components/NavBar";

const CategoryListPage = () => {
  return (
    <div>
      <div>
        {" "}
        <Navbar />{" "}
      </div>
      <CategoryList />
    </div>
  );
};

export default CategoryListPage;
