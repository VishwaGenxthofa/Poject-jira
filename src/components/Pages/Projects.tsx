
import React, { useState } from "react";

export default function ControlledDemo() {
  const [activeIndex, setActiveIndex] = useState(3);

  const items = [
    { label: "summary", icon: <i className="pi pi-globe"></i> },
    { label: "List", icon: <i className="pi pi-table"></i> },
    { label: "Board", icon: <i className="pi pi-th-large"></i> },
    { label: "Calendar", icon: <i className="pi pi-calendar"></i> },
    { label: "Timeline", icon: <i className="pi pi-sliders-h"></i> },
    { label: "Pages", icon: <i className="pi pi-clone"></i> },
    { label: "Forms", icon: <i className="pi pi-file"></i> },
    { label: "Code", icon: <i className="pi pi-code"></i> }
  ];

  return (
    <div className="p-2 bg-white rounded-lg ">
      {/* Activate Button */}
     <h2>{}</h2>

      {/* Tab Menu */}
      <div className="flex border-b">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex items-center gap-2 px-4 py-2 -mb-px border-b-2 transition 
              ${
                activeIndex === index
                  ? "border-blue-600 text-blue-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-blue-500"
              }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      {/* <div className="mt-4 p-4 border rounded-md bg-gray-50">
        <p className="text-gray-700">
          You selected: <span className="font-semibold">{items[activeIndex].label}</span>
        </p>
      </div> */}
    </div>
  );
}
