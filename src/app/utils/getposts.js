export const getPosts = async () => {
  const res = await fetch("http://localhost:3000/api/posts", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

export const getSinglePost = async (id) => {
  const res = await fetch(`http://localhost:3000/api/infos/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
