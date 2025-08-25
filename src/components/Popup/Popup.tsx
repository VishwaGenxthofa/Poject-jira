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
import { TbCloudUpload } from "react-icons/tb";
import './model.css'
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
type ModalProps = { isOpen: boolean; onClose: () => void };

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const today = new Date().toISOString().split("T")[0];
  // ----- form state -----
  const [project, setProject] = useState("kanban");
  const [workType, setWorkType] = useState("task");
  const [status, setStatus] = useState("todo");
  const [summary, setSummary] = useState("");
  const [priority, setPriority] = useState("medium");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState<string>(today);
  const [assignee, setAssignee] = useState("");
;
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
  const statusColors: Record<string, string> = {
    todo: "bg-gray-200 font-semibold text-black-600",
    inprogress: "bg-blue-200 font-semibold text-black-600 ",
    done: "bg-green-200 font-semibold text-black-600",
  };


  // ----- attachments (Drag & Drop) -----
  const [files, setFiles] = useState<File[]>([]);
  // const { getRootProps, getInputProps, isDragActive, fileRejections } =
  //   useDropzone({
  //     onDrop: (accepted) => setFiles((prev) => [...prev, ...accepted]),
  //     multiple: true,
  //     maxSize: 10 * 1024 * 1024,
  //     accept: {
  //       "image/*": [],
  //       "application/pdf": [],
  //       "text/plain": [],
  //       "application/zip": [],
  //     },
  //   });
  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  // ----- validation state -----
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const clearError = (field: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };
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
            <label className="block mb-1 font-semibold text-gray-600">Project <span className="text-red-600">*</span></label>
            <select
              value={project}
              onChange={(e) =>{ setProject(e.target.value);  clearError("project");}}
               
              className={`w-80  rounded px-3 py-2  outline-border ${
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
            <label className="block mb-1 font-semibold text-gray-600">Work Type <span className="text-red-600">*</span></label>
            <Select defaultValue="task" onValueChange={(value)=>{setWorkType(value);clearError("worktype");}}>
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
            <label className="block mb-1  ">Status</label>
            <Select defaultValue="todo" onValueChange={setStatus}>
              <SelectTrigger
              
                className={` border rounded px-3 py-2 cursor-pointer status ${
                  errors.status ? "border-red-500" : "border-gray-200"
                  
                } data-[state=open]:ring-2 data-[state=open]:ring-black-500 ${statusColors[status]}`}
              >
                <SelectValue placeholder="todo"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo" className="data-[state=checked]:text-black-500" ><span className="bg-gray-200 rounded font-semibold text-black-600 ">To Do</span></SelectItem>
                <SelectItem value="inprogress" className="data-[state=checked]:text-black-500" ><span className="bg-blue-200  rounded font-semibold text-black-600">In Progress</span></SelectItem>
                <SelectItem value="done" className="data-[state=checked]:text-black-500"><span className=" bg-green-200 rounded  font-semibold text-black-600">Done</span></SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status}</p>
            )}
          </div>

          {/* Summary */}
          <div>
            <label className="block mb-1 font-semibold text-gray-600">Summary <span className="text-red-600">*</span></label>
            <input
              type="text"
              value={summary}
              
              onChange={(e) => {setSummary(e.target.value); clearError("summary");}}
              className={`w-full border rounded px-3 py-2 ${
                errors.summary ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.summary && (
              <p className="text-red-500 text-sm">{errors.summary}</p>
            )}
          </div>
          {/* Description (ReactQuill) */} <div> 
            <label className="block mb-1 font-semibold text-gray-600">Description</label>
             <ReactQuill ref={quillRef} value={description} onChange={setDescription} className="text-center"
             modules={{ toolbar: [ ["bold", "italic", "underline", "strike"],
             [{ list: "ordered" }, { list: "bullet" }], ["link", "image"], ["clean"], ],
           }} formats={[ "bold", "italic", "underline", "strike", "list", "bullet", "link", "image", ]}
                placeholder="Paste a Confluence link here ,and we can help generate the description from the page's contents." /> </div>

          {/* Dates */}
         
          <div className="grid  gap-4 ">
            <div>
              <label className="block mb-1 font-semibold text-gray-600">Start Date</label>
              <input
                type="date"
                value={startDate}
                
                onChange={(e) => {setStartDate(e.target.value);clearError("Start Date")}}
                className="w-80 border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-600 ">Due Date </label>
              <input
                type="date"
                
                value={dueDate}
                onChange={(e) => {setDueDate(e.target.value);clearError("duedate")}}
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
            <label className="block mb-1 font-semibold text-gray-600">Priority </label>
            <Select  defaultValue="medium" onValueChange={(value)=>{setPriority(value);clearError("priority")}}>
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
            <label className="block mb-1 font-semibold text-gray-600">Assignee </label>
            <select
              value={assignee}
              onChange={(e) => {setAssignee(e.target.value); clearError("assignee")}}
              className={`w-80 border rounded px-3 py-2 cursor-pointer ${
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
     <div className="w-full">
      <label className="block mb-1 font-semibold text-gray-600">Attachment</label>
      <div className="border border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center text-sm text-gray-600">
        <TbCloudUpload  size={18} className="" />
        {file ? (
          <span className="text-gray-800 font-medium ">{file.name}</span>
        ) : (
          <span className=" text-gray-500  text-base p-2">
            Drop files to attach or{" "}
            <label className="text-gray-400 font-medium cursor-pointer p-2 m-2 border border-gray-300 rounded ">
             Browse
              <input 
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </span>
        )}
      </div>
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
