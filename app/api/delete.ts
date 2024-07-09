import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";

export const deleteBlog = async (
    blog_id: number
  ) => {
    return new Promise((resolve, reject) => {
      const swalWithBootstrapButtons = Swal.mixin({
       
        
      });
      swalWithBootstrapButtons
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it! ",
          cancelButtonText: " No, cancel!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              
                const backendResponseData = await axios.delete(
                  process.env.NEXT_PUBLIC_BASE_URL + `/delete-blog/`+blog_id,
                  
                  {
                    headers: {
                      "Content-Type": "application/json", // Content-Type header
                      Accept: "application/json", // Accept header
                    },
                  }
                );
                console.log(backendResponseData, "hello")
                //   console.log(backendResponseData.data);
                if (backendResponseData.data.status == 200) {
                  swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Blog deleted successfully!",
                    icon: "success",
                  });
                  console.log("deleted")
                  resolve("Deleted");
                }
              
            } catch (error) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Action Failed!",
                icon: "error",
              });
              // reject(error);
              resolve("Something went wrong");
            }
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Action Cancelled!",
              icon: "error",
            });
            //   reject(new Error("Action cancelled"));
            resolve("Action cancelled");
          } else {
            swalWithBootstrapButtons.fire({
              title: "Cancelled",
              text: "Action Cancelled!",
              icon: "error",
            });
            //   reject(new Error("Unknown error"));
            resolve("Unknown error");
          }
        });
    });
  };