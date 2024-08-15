// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// export const useFindAllTrays = () => {
//   return useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const res = await fetch(`/api/product/${slug}`);
//       if (!res.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return res.json();
//     },
//     staleTime: 1000 * 60 * 5,
//   });
// };

// export const useEditProduct = (slug: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (form: IUpdateProduct) => {
//       const formData = new FormData();

//       if (form.name) {
//         formData.append("name", form.name);
//       }
//       if (form.description) formData.append("description", form.description);
//       if (form.quantity) formData.append("quantity", form.quantity.toString());
//       if (form.image) formData.append("image", form.image.file.originFileObj);

//       const res = await fetch(`/api/admin/product/${slug}`, {
//         method: "PATCH",
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error(`Error while fetching: /api/admin/product/${slug}`);
//       }

//       const product = await (res.json() as Promise<IProduct>);
//       return product;
//     },
//     onSuccess: async () => {
//       await queryClient.invalidateQueries({
//         queryKey: ["products"],
//       });
//     },
//   });
// };
