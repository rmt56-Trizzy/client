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
  console.log(error, "ini sebeenernya apa ?");

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
