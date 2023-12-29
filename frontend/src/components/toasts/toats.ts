import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const successToast = (content: string) =>
  toast.success(content, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
const errorToast = (content: string) =>
  toast.error(content, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export { successToast, errorToast };
