import { useEffect, useState } from "react";
import { menuItemModel } from "../../interfaces";
import { MenuItemCard } from ".";
import { useGetMenuItemsQuery } from "../../Apis/menuItemApi";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../../Storage/Redux/menuItemSlice";
import MainSpinner from "../../Common/MainSpinner";
import { RootState } from "../../Storage/Redux/store";
import { SD_SortTypes } from "../../Utility/SD";
import { BsTextIndentLeft } from "react-icons/bs";

// import { emptyCart } from "../../Storage/Redux/shoppingCartSlice";
// import Sushi from "../../assets/images/Sushi.png";
// import All from "../../assets/images/All.png";
// import Appetizer from "../../assets/images/Appitizer.png";
// import Dessert from "../../assets/images/Dessert.png";
// import Drink from "../../assets/images/Drink.png";
// import Entrée from "../../assets/images/Entrée.png";

const MenuItemList = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const [sortName, setSortName] = useState(SD_SortTypes.NAME_A_Z);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { data, isLoading } = useGetMenuItemsQuery(null);
  let arr = ["All", "Appetizer", "Dessert", "Drink", "Entrée"];
  const sortOptions: Array<SD_SortTypes> = [
    SD_SortTypes.PRICE_LOW_HIGH,
    SD_SortTypes.PRICE_HIGH_LOW,
    SD_SortTypes.NAME_A_Z,
    SD_SortTypes.NAME_Z_A,
  ];
  const searchValue = useSelector(
    (state: RootState) => state.searchStore.search
  );
  // useEffect(() => {
  //   dispatch(emptyCart());
  // }, []);

  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(
        sortName,
        selectedCategory,
        searchValue
      );
      setMenuItems(tempMenuArray);

      // dispatch(setMenuItem(data.result));
    }
  }, [searchValue]);
  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result);

      //for category
      const tempCategoryList = ["All"];
      data.result.forEach((item: menuItemModel) => {
        if (tempCategoryList.indexOf(item.category) === -1) {
          tempCategoryList.push(item.category);
        }
      });
      setCategoryList(tempCategoryList);
    }
  }, [isLoading]);

  const handleFilters = (
    sortType: SD_SortTypes,
    category: string,
    search: string
  ) => {
    let tempArray =
      category === "All"
        ? [...data.result]
        : data.result.filter(
            (item: menuItemModel) =>
              item.category.toUpperCase() === category.toUpperCase()
          );
    if (search) {
      const tempArray2 = [...tempArray];
      tempArray = tempArray2.filter((item: menuItemModel) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }

    //sort
    if (sortType === SD_SortTypes.PRICE_LOW_HIGH) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => a.price - b.price);
    }
    if (sortType === SD_SortTypes.PRICE_HIGH_LOW) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => b.price - a.price);
    }
    if (sortType === SD_SortTypes.NAME_A_Z) {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          a.name.toUpperCase().charCodeAt(0) -
          b.name.toUpperCase().charCodeAt(0)
      );
    }
    if (sortType === SD_SortTypes.NAME_Z_A) {
      tempArray.sort(
        (a: menuItemModel, b: menuItemModel) =>
          b.name.toUpperCase().charCodeAt(0) -
          a.name.toUpperCase().charCodeAt(0)
      );
    }

    return tempArray;
  };

  const handleCategoryClick = (i: number) => {
    const localCategory = categoryList[i];
    setSelectedCategory(localCategory);
    const tempArray = handleFilters(sortName, localCategory, searchValue);
    setMenuItems(tempArray);
  };

  const handleSortClick = (i: number) => {
    setSortName(sortOptions[i]);
    const tempArray = handleFilters(
      sortOptions[i],
      selectedCategory,
      searchValue
    );

    setMenuItems(tempArray);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <MainSpinner />
      </div>
    );
  }
  return (
    <div className="px-2 py-5 ">
      <h2 className=" text-3xl font-extrabold mb-5">Categories</h2>
      <div className=" w-full flex flex-wrap lg:gap-10 mb-8 gap-2">
        {categoryList.length !== 1 &&
          categoryList.map((categoryName, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(index)}
              className=" border-gray-200 border-2 shadow-md bg-white rounded-[20px] flex flex-col items-center justify-center h-28 w-28 md:w-28 lg:w-44 focus:bg-orange-100 focus:border-orange-500 focus:border-2 space-y-1"
            >
              <img
                src={`/${categoryName}.png`}
                alt={categoryName}
                className="h-12 w-12"
              />

              <span className="text-sm">{categoryName}</span>
            </button>
          ))}
      </div>
      <div className="w-full flex justify-between">
        <h2 className=" text-3xl font-extrabold mb-5">Selected Menus</h2>
        <button
          className="relative flex items-center space-x-2"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <BsTextIndentLeft className="scale-150" />{" "}
          <span className="text-sm font-bold">Filter</span>
          {isFilterOpen && (
            <div className="absolute right-0  -bottom-24 bg-white rounded-lg py-2 z-10">
              <div className="flex flex-col text-sm font-bold  w-32 text-right">
                {sortOptions.map((sortType, index) => (
                  <span
                    key={index}
                    className="hover:bg-orange-200 px-2"
                    onClick={() => handleSortClick(index)}
                  >
                    {sortType}
                  </span>
                ))}
              </div>
            </div>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-6 ">
        {menuItems.length > 0 &&
          menuItems.map((menuItem: menuItemModel, index: number) => {
            return <MenuItemCard key={index} menuItem={menuItem} />;
          })}
      </div>
    </div>
  );
};

export default MenuItemList;
