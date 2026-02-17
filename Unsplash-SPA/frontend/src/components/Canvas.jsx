import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageCard from "./ImageCard";

function Canvas({ category }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/gallery/get/${category}`)
      .then((res) => setItems(res.data));
  }, [category]);

  return (
    <div
      className="p-4 sm:p-6 md:p-8
        grid grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-4 sm:gap-6"
    >
      {items.map((item) => (
        <ImageCard key={item._id} data={item} />
      ))}
    </div>
  );
}
export default React.memo(Canvas);
