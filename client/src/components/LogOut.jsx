import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../api";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();

  const logOutUser = async () => {
    try {
      const { data } = await api.delete("/users/logout");
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
            navigate("/login");
        }, 1500);
      }
      toast.error(data.messgae);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <button
      onClick={logOutUser}
      className="absolute top-0 right-0 m-8 py-2 px-4 bg-black text-white center cursor-pointer rounded-md hover-scale"
    >
      <FaSignOutAlt className="mr-2" />
      Log Out
    </button>
  );
};

export default LogOut;
