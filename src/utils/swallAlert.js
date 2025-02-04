import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export const toastError = (error) => {
  let errorMessage = "Something went wrong";

  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    errorMessage = error.graphQLErrors[0].message;
  } else if (error.networkError) {
    errorMessage =
      error.networkError.result?.errors?.[0]?.message ||
      "Network error: Check your connection or server";
  } else {
    errorMessage = error;
  }

  Toast.fire({
    icon: "error",
    title: errorMessage,
  });
};

export const toastSuccess = (message) => {
  Toast.fire({
    icon: "success",
    title: message,
  });
};

export const swallWarning = (data) => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      data;
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
};
