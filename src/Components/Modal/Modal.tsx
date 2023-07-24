import { userGrantModel } from "../../interfaces";
import { toast } from "react-toastify";
import { useDeleteUserMutation } from "../../Apis/userApi";

interface ModalProps {
  //   isOpen: boolean;
  // info: ReactNode;
  transaction: userGrantModel | null;
  closeModal: () => void;
  //   fn: (event: MouseEvent<HTMLButtonElement>) => void;
  //   fn: (id: string) => void;
  //   setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Modal = ({ closeModal, transaction }: ModalProps) => {
  const [deleteUser] = useDeleteUserMutation();
  const handleDeleteUser = async (userId: string) => {
    // const shouldDelete = window.confirm(
    //   "Are you sure you want to delete this user?"
    // );

    if (userId) {
      await deleteUser({ userId });

      toast("you have successfully deleted this user");
    } else {
      toast.error("delete failed");
      return;
    }
  };
  return (
    // <ReactModal
    //   isOpen={isOpen}
    //   onRequestClose={closeModal}
    //   ariaHideApp={false}
    //   className="bg-transparent"
    // >
    // <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center">
    <div className="bg-white flex flex-col  p-4 rounded-lg">
      <div className="max-w-[250px]">
        <div className="font-bold ">
          Are you sure you want to delete the following user ?
        </div>
        <div className="flex flex-col space-y-1 p-2 my-4 border rounded-lg ">
          <span>name: {transaction?.name}</span>
          <span>username: {transaction?.userName}</span>
          <span>role: {transaction?.roleName}</span>
          <span>id:{transaction?.id}</span>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => {
            handleDeleteUser(transaction!.id);
            closeModal();
          }}
          className="bg-indigo-500 text-white rounded-lg p-2"
        >
          Ok
        </button>
        <button
          onClick={closeModal}
          className="bg-rose-400 text-white rounded-lg p-2"
        >
          cancel
        </button>
      </div>
    </div>
    // </div>
    // </ReactModal>
  );
};

export default Modal;
