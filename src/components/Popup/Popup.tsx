import { useState, useEffect, useRef, useCallback } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { LiaEqualsSolid } from "react-icons/lia";
import { SquareCheck } from "lucide-react";
import { IoTicketOutline } from "react-icons/io5";
import { FiChevronsUp, FiChevronsDown, FiChevronDown } from "react-icons/fi";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";


type ModalProps = { isOpen: boolean; onClose: () => void };

export default function Modal({ isOpen, onClose }: ModalProps) {
  // ----- form state -----
  const [project, setProject] = useState("kanban");
  const [workType, setWorkType] = useState("");
  const [status, setStatus] = useState("");
  const [summary, setSummary] = useState("");
  const [priority, setPriority] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");

  // ----- description (ReactQuill) -----
  const [description, setDescription] = useState("");
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      editor.format("bold", true);
      editor.format("underline", true);
    }
  }, []);

  // ----- attachments (Drag & Drop) -----
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop: (accepted) => setFiles((prev) => [...prev, ...accepted]),
      multiple: true,
      maxSize: 10 * 1024 * 1024,
      accept: {
        "image/*": [],
        "application/pdf": [],
        "text/plain": [],
        "application/zip": [],
      },
    });
  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  // ----- validation state -----
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    let newErrors: { [key: string]: string } = {};
    if (!project) newErrors.project = "Project is required";
    if (!workType) newErrors.workType = "Work Type is required";
    if (!status) newErrors.status = "Status is required";
    if (!summary.trim()) newErrors.summary = "Summary is required";
    if (!priority) newErrors.priority = "Priority is required";
    if (!assignee) newErrors.assignee = "Assignee is required";
    if (!dueDate) newErrors.dueDate = "Due Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ----- submit -----
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      project,
      workType,
      status,
      summary,
      description,
      assignee,
      priority,
      startDate,
      dueDate,
    };

    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );
    files.forEach((file) => formData.append("attachments", file));

    console.log("Submitting:", data, files);
    onClose();
  };

  // ----- UI -----
  return !isOpen ? null : (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "#00000093" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-190 p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-4 text-black">Create</h2>
          <button className="text-2xl font-semibold mb-4 text-black cursor-pointer hover:bg-gray" onClick={onClose}>x</button>
        </div>
        
         <p className="block mb-1 font-medium">Required fields are marked with an asterisk <span className="text-red-600">*</span> </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Project */}
          <div>
            <label className="block mb-1 font-medium">Project <span className="text-red-600">*</span></label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className={`w-80 border rounded px-3 py-2 focus:outline-none border-2 border-black-500 ${
                errors.project ? "border-red-500" : "border-2 border-black-500"
              }`}
            >
              <option value="">Select Project</option>
              <option value="kanban">My Kanban Project (KAN)</option>
            </select>
            {errors.project && (
              <p className="text-red-500 text-sm">{errors.project}</p>
            )}
          </div>

          {/* Work Type */}
          <div>
            <label className="block mb-1 font-medium">Work Type <span className="text-red-600">*</span></label>
            <Select defaultValue="task">
              <SelectTrigger
                className={`w-80 border rounded px-3 py-2 cursor-pointer ${
                  errors.workType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <SelectValue placeholder="task" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="task">
                  <div className="flex items-center gap-2">
                    <SquareCheck className="text-blue-500" size={20} /> Task
                  </div>
                </SelectItem>
                <SelectItem value="epic">
                  <div className="flex items-center gap-2">
                    <IoTicketOutline className="text-pink-500" size={20} /> Epic
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.workType && (
              <p className="text-red-500 text-sm">{errors.workType}</p>
            )}
          </div>

          {/* Status */}
          <div >
            <label className="block mb-1 font-medium">Status <span className="text-red-600">*</span></label>
            <Select defaultValue="todo" value="todo" >
              <SelectTrigger
                className={` border rounded px-3 py-2 cursor-pointer bg-gray-100 ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
              >
                <SelectValue placeholder="todo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo" ><span className="bg-gray-200 rounded text-black">To Do</span></SelectItem>
                <SelectItem value="inprogress"><span className="bg-yellow-300 rounded ">In Progress</span></SelectItem>
                <SelectItem value="done"><span className="bg-green-500 rounded text-white">Done</span></SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
          </div>

          {/* Summary */}
          <div>
            <label className="block mb-1 font-medium">Summary <span className="text-red-600">*</span></label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className={`w-full border rounded px-3 py-2 ${
                errors.summary ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.summary && (
              <p className="text-red-500 text-sm">{errors.summary}</p>
            )}
          </div>
          {/* Description (ReactQuill) */} <div> 
            <label className="block mb-1 font-medium">Description</label>
             <ReactQuill ref={quillRef} value={description} onChange={setDescription} className="h-30"
             modules={{ toolbar: [ ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }], ["link", "image"], ["clean"], ],
               }} formats={[ "bold", "italic", "underline", "strike", "list", "bullet", "link", "image", ]}
                placeholder="Type your description..." /> </div>

          {/* Dates */}
          <br></br>
          <br></br>
          <div className="grid  gap-4 ">
            <div>
              <label className="block mb-1 font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-80 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium ">Due Date </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={`w-80 border rounded px-3 py-2 ${
                  errors.dueDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm">{errors.dueDate}</p>
              )}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block mb-1 font-medium">Priority </label>
            <Select  defaultValue="medium">
              <SelectTrigger
                className={`w-80 border rounded px-3 py-2 cursor-pointer ${
                  errors.priority ? "border-red-500" : "border-gray-300"
                }`}
              >
                <SelectValue placeholder="Highest"   />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highest">
                  <FiChevronsUp color="red" /> Highest
                </SelectItem>
                <SelectItem value="high">
                  <MdOutlineKeyboardArrowUp color="red" /> High
                </SelectItem>
                <SelectItem value="medium">
                  <LiaEqualsSolid color="orange" /> Medium
                </SelectItem>
                <SelectItem value="low">
                  <FiChevronDown color="blue" /> Low
                </SelectItem>
                <SelectItem value="lowest">
                  <FiChevronsDown color="blue" /> Lowest
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.priority && (
              <p className="text-red-500 text-sm">{errors.priority}</p>
            )}
          </div>

          {/* Assignee */}
          <div>
            <label className="block mb-1 font-medium">Assignee </label>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className={`w-80 border rounded px-3 py-2 ${
                errors.assignee ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Assignee</option>
              <option value="automatic">Automatic</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
            </select>
            {errors.assignee && (
              <p className="text-red-500 text-sm">{errors.assignee}</p>
            )}
          </div>

          {/* Attachment */}
          <div>
            <label className="block mb-1 font-medium">Attachment</label>
            <div
              {...getRootProps()}
              className={`w-full border-2 border-dashed rounded-lg px-4 py-8 text-center cursor-pointer transition ${
                isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? <p>Drop files to attach or</p> : <p>Drag & drop files here, or click to select</p>}
              <p className="text-xs text-gray-500 mt-1">
                Up to 10 MB each. Images, PDF, TXT, ZIP.
              </p>
            </div>
            {files.length > 0 && (
              <ul className="mt-3 space-y-1">
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="flex justify-between text-sm">
                    <span>{f.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded text-gray-500  font-bold cursor-pointer "
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white  cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
