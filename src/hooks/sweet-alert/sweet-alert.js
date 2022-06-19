import Swal from "sweetalert2";
export const showAlert = (
  alertType,
  title,
  content,
  confirmText,
  showCancel
) => {
  return Swal.fire({
    title: title,
    text: content,
    icon:
      alertType === "confirm"
        ? "question"
        : alertType === "success"
        ? "success"
        : "error",
    iconColor: "#1425ff",
    confirmButtonText: confirmText,
    showCancelButton: showCancel == null ? true : showCancel,
  });
};
