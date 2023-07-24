import {
  useDeleteMenuItemMutation,
  useGetMenuItemsQuery,
} from "../../Apis/menuItemApi";
import MainSpinner from "../../Common/MainSpinner";
import { useNavigate } from "react-router-dom";
import { menuItemModel } from "../../interfaces";
import { AiTwotoneEdit } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { withAdminAuth } from "../../HOC";
const MenuItemList = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const [deleteMenuItem] = useDeleteMenuItemMutation();
  // console.log(data.result);
  const handleMenuItemDelete = async (id: number) => {
    toast.promise(
      deleteMenuItem(id),
      {
        pending: "Processing your request...",
        success: "Menu Item Deleted Successfully 👌",
        error: "Error encoutnered 🤯",
      },
      {
        theme: "dark",
      }
    );
  };
  return (
    <>
      {isLoading && (
        <div className="w-full flex flex-1 items-center justify-center">
          <MainSpinner />
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-1 flex-col py-6 lg:px-20 md:px-0 px-0 mx-5 mt-5 min-w-[800px] bg-gray-50  overflow-x-scroll  ">
          <div className="flex items-center justify-between m-4">
            <h1 className="text-indigo-500 text-2xl font-extrabold ">
              MenuItem List
            </h1>

            <button
              className="p-2 px-4 bg-indigo-500 text-white rounded-lg"
              onClick={() => navigate("/menuitem/menuitemupsert")}
            >
              Add New Menu Item
            </button>
          </div>

          <div className="p-2 w-full overflow-x-scroll  ">
            <div className="grid grid-cols-7 border px-4 w-full bg-indigo-500 text-white">
              <div className="grid-cols-1 py-2 ">Image</div>
              <div className="grid-cols-1 py-2">ID</div>
              <div className="grid-cols-2 py-2 ">Name</div>
              <div className="grid-cols-2 py-2 ">Category</div>
              <div className="grid-cols-1 py-2">Price</div>
              <div className="grid-cols-2 py-2 ">Special Tag</div>
              <div className="grid-cols-1 py-2 ">Action</div>
            </div>

            {data.result.map((menuItem: menuItemModel) => {
              return (
                <div
                  className=" border items-center grid grid-cols-7 p-2 w-full  "
                  key={menuItem.id}
                >
                  <div className="grid-cols-1  w-24 h-24  rounded-lg overflow-hidden">
                    <img
                      src={menuItem.image}
                      alt="no content"
                      // style={{ width: "100%", maxWidth: "120px" }}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="grid-cols-1">{menuItem.id}</div>
                  <div className="grid-cols-2  ">{menuItem.name}</div>
                  <div className="grid-cols-2 ">{menuItem.category}</div>
                  <div className="grid-cols-1">${menuItem.price}</div>
                  <div className="grid-cols-2 col-span-1 ">
                    {menuItem.specialTag}
                  </div>
                  <div className="grid-cols-1 space-x-4 ">
                    <button
                      onClick={() =>
                        navigate("/menuitem/menuitemupsert/" + menuItem.id)
                      }
                      className="bg-indigo-400 p-2 rounded-lg text-white"
                    >
                      <AiTwotoneEdit />
                    </button>
                    <button
                      className="bg-rose-400 p-2 rounded-lg text-white"
                      onClick={() => handleMenuItemDelete(menuItem.id)}
                    >
                      <BsTrashFill />
                      {/* <i className="bi bi-trash-fill text-white"></i> */}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default withAdminAuth(MenuItemList);
