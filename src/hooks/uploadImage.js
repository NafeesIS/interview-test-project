export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const url = process.env.NEXT_PUBLIC_ImageBB_URL;
  const response = await fetch(url, { method: "POST", body: formData });
  const data = await response.json();
  return data;
};
