
import { Delete, Edit } from "lucide-react";
import  { useState } from "react";
import { MdDelete } from "react-icons/md";
type Project = {
  id: number;
  title: string;
};
type ModalProps = { isOpen: boolean; onClose: () => void };
export default function NavProjects({ isOpen, onClose }:ModalProps) {
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleAdd = () => {
    if (newTitle.trim() === "") return;

    if (editId !== null) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editId ? { ...p, title: newTitle } : p))
      );
    } else {
      setProjects((prev) => [
        ...prev,
        { id: Date.now(), title: newTitle },
      ]);
    }

    setNewTitle("");
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = (project: Project) => {
    setNewTitle(project.title);
    setEditId(project.id);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="  p-4 ">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4 transition "
        onClick={() => setShowModal(true)}
      >
        + Add Project
      </button>

      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={`
              flex justify-between items-center p-2 mb-2 rounded  cursor-pointer
              ${editId === project.id ? "bg-blue-500 text-white" : " text-gray-800"}
              hover:bg-blue-400 hover:text-white transition-colors
            `}
          >
            <span className="text-gray-800">{project.title}</span>
            <div>
              <button
                onClick={() => handleEdit(project)}
                className="text-blue-500 hover:underline mr-2"
              >
                <Edit size={20}></Edit>
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="text-red-500 hover:underline"
              >
                 <MdDelete size={20} color="red" />
              </button>
            </div>
          </li>
        ))}
      </ul>

    
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center    z-50"style={{backgroundColor:"#00000093"}} >
          <div className="bg-white w-96 rounded shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              {editId ? "Edit Project" : "Add Project"}
            </h3>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project title"
              value={newTitle}
              required
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                onClick={handleAdd}
              >
                {editId ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
