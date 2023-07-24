import { useNavigate, useParams } from "react-router-dom";
import MainSpinner from "../../Common/MainSpinner";
import { useEffect, useState } from "react";
import { inputHelper, toastNotify } from "../../Helper";
import {
  useCreateMenuItemMutation,
  useGetMenuItemByIdQuery,
  useUpdateMenuItemMutation,
} from "../../Apis/menuItemApi";
import { SD_Categories } from "../../Utility/SD";
const menuItemData = {
  name: "",
  description: "",
  specialTag: "",
  category: "",
  price: "",
};
const Categories = [
  SD_Categories.APPETIZER,
  SD_Categories.DRINK,
  SD_Categories.DESSERT,
  SD_Categories.ENTREE,
  SD_Categories.SUSHI,
];

const MenuItemUpsert = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [imageToStore, setImageToStore] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [menuItemInputs, setMenuItemInputs] = useState(menuItemData);
  const [isLoading, setLoading] = useState(false);

  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateMenuItem] = useUpdateMenuItemMutation();

  const { data } = useGetMenuItemByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.category,
        price: data.result.price,
      };
      setMenuItemInputs(tempData);
      setImageToDisplay(data.result.image);
    }
  }, [data]);

  const handleMenuItemInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = inputHelper(e, menuItemInputs);
    setMenuItemInputs(tempData);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      console.log(file);
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToStore("");
        toastNotify("File Must be less then 1 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore("");
        toastNotify("File Must be in jpeg, jpg or png", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!imageToStore && !id) {
      toastNotify("Please upload an image", "error");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("Name", menuItemInputs.name);
    formData.append("Description", menuItemInputs.description);
    formData.append("SpecialTag", menuItemInputs.specialTag ?? "");
    formData.append("Category", menuItemInputs.category);
    formData.append("Price", menuItemInputs.price);
    if (imageToDisplay) formData.append("File", imageToStore);

    let response;

    if (id) {
      //update
      formData.append("Id", id);
      response = await updateMenuItem({ data: formData, id });
      toastNotify("Menu Item updated successfully", "success");
    } else {
      //create
      response = await createMenuItem(formData);
      toastNotify("Menu Item created successfully", "success");
    }

    if (response) {
      setLoading(false);
      navigate("/menuItem/menuitemlist");
    }

    setLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="w-full flex flex-1 items-center justify-center">
          <MainSpinner />
        </div>
      )}
      <div className="flex-1 bg-gray-100 flex flex-col justify-center items-center  mt-5 p-5   ">
        <div className="bg-gray-50 p-10 rounded-sm">
          <h3 className=" px-2 text-2xl font-extrabold text-indigo-500  text-left">
            {id ? "Edit Menu Item" : "Add Menu Item"}
            {/* Add Menu Item */}
          </h3>

          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className=" grid grid-cols-1 space-y-4 md:space-y-0 lg:space-y-0  md:grid-cols-3 lg:grid-cols-3 mt-3 mx-auto space-x-4">
              <div className=" flex flex-col grid-cols-1 col-span-2">
                <input
                  type="text"
                  className="p-2 border border-gray-200"
                  placeholder="Enter Name"
                  required
                  name="name"
                  value={menuItemInputs.name}
                  onChange={handleMenuItemInput}
                />
                <textarea
                  className="p-2 border border-gray-200 mt-3"
                  placeholder="Enter Description"
                  name="description"
                  rows={10}
                  value={menuItemInputs.description}
                  onChange={handleMenuItemInput}
                ></textarea>
                <input
                  type="text"
                  className="p-2 border border-gray-200 mt-3"
                  placeholder="Enter Special Tag"
                  name="specialTag"
                  value={menuItemInputs.specialTag}
                  onChange={handleMenuItemInput}
                />
                <select
                  className="p-2 border border-gray-200 mt-3"
                  placeholder="Enter Category"
                  name="category"
                  value={menuItemInputs.category}
                  onChange={handleMenuItemInput}
                >
                  {Categories.map((category) => (
                    <option value={category}>{category}</option>
                  ))}
                </select>
                <input
                  type="number"
                  className="p-2 border border-gray-200 mt-3"
                  required
                  placeholder="Enter Price"
                  name="price"
                  value={menuItemInputs.price}
                  onChange={handleMenuItemInput}
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className=" mt-3"
                />
                <div className="flex justify-between items-center mt-3 ">
                  <div className="">
                    <button
                      type="submit"
                      className="  bg-indigo-500 w-full px-4 py-2 text-white rounded-lg"
                    >
                      {id ? "Update" : "Create"}
                    </button>
                  </div>
                  <div className=" bg-gray-400 px-4 py-2 text-white rounded-lg ">
                    <a onClick={() => navigate("/menuItem/menuitemlist")}>
                      Back to Menu Items
                    </a>
                  </div>
                </div>
              </div>
              {/* //image */}
              <div className="grid-cols-1 text-center w-[400px] h-[400px] items-center justify-center flex ">
                <img
                  src={imageToDisplay}
                  className="object-cover w-full h-full bg-gray-400 "
                  style={{ width: "100%", borderRadius: "30px" }}
                  alt="upload image here"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MenuItemUpsert;
