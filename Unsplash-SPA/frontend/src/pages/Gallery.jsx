import { useState } from "react";
import Sidebar from "../components/SideBar";
import Canvas from "../components/Canvas";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar
        active={activeCategory}
        setActive={setActiveCategory}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div
        className={`flex-1 transition-[margin] duration-200 ease-out
        ${sidebarOpen ? "sm:pl-52 pl-16" : "pl-16"}`}
      >
        <Canvas category={activeCategory} />
      </div>
    </div>
  );
}
