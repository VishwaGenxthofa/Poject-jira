
import  { useState,useRef } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
 
} from "@hello-pangea/dnd";
import { FiEdit } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDateRange } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";
import type { DropResult } from "@hello-pangea/dnd";
import { GoPlus } from "react-icons/go";
import dayjs from "dayjs";
interface Task {
  id: string;
  title: string;
  type: string;
  dueDate: string;
  assigned: string;
 
}

interface Column {
  id: string;
  title: string;
  tasks:Task[];
  
  
}

export default function Mainboard() {
  const [columns, setColumns] = useState<Column[]>([
    { id: "todo", title: "TO DO", tasks: [] },
    { id: "progress", title: "IN PROGRESS", tasks: [] },
    { id: "done", title: "DONE", tasks: [],},
  ]);
 const date = dayjs().format("MMM D, YYYY");
  const [showColumnForm, setShowColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [activeTaskColumn, setActiveTaskColumn] = useState<string | null>(null);
  const [taskInput, setTaskInput] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [taskType, setTaskType] = useState("Feature");
  const [dueDate, setDueDate] = useState("");
 
  const [assigned, setAssigned] = useState("");
const inputRef = useRef<HTMLInputElement>(null);
const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short", // Aug
      day: "numeric", // 25
      year: "numeric", // 2025
    });
  };
  const saveTaskEdit = (updatedTask: Task) => {
  setColumns(
    columns.map((col) => ({
      ...col,
      tasks: col.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      ),
    }))
  );
  setEditingTask(null);
};

  // Add new column
  const addColumn = () => {
    
    if (!newColumnTitle.trim()) return;
    setColumns([
      ...columns,
      { id: Date.now().toString(), title: newColumnTitle, tasks: [] },
    ]);
    setTimeout(() => inputRef.current?.focus(), 0);
    setNewColumnTitle("");
    setShowColumnForm(false);
    
  };

  // Add task to column
  const addTask = (columnId: string) => {
    if (!taskInput.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskInput,
      type: taskType,
      dueDate: dueDate ? formatDate(dueDate):"no due date",
      assigned: assigned || "Unassigned",
    };
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
      )
    );
    setTaskInput("");
    setTaskType("Feature");
    setDueDate("");
    setAssigned("");
    setActiveTaskColumn(null);
  };

  
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    
    const sourceCol = columns.find((c) => c.id === source.droppableId)!;
    const destCol = columns.find((c) => c.id === destination.droppableId)!;
     const [movedTask]=sourceCol.tasks.splice(source.index,1)
    // Moving inside same column
    if (source.droppableId === destination.droppableId) {
      sourceCol.tasks.splice(destination.index,0,movedTask)

      setColumns(
        columns.map((col) =>
          col.id === sourceCol.id ? { ...col, tasks:[...sourceCol.tasks] } : col
        )
      );
    } else {
      
      
      destCol.tasks.splice(destination.index, 0, movedTask);

      setColumns(
        columns.map((col) => {
          if (col.id === sourceCol.id) return { ...col, tasks:[...sourceCol.tasks]};
          if (col.id === destCol.id) return { ...col, tasks:[...destCol.tasks] };
          return col;
        })
      );
    }
  };
  const Cancel=()=>{
    setTaskInput("")
    setActiveTaskColumn(null)
  }

  return (
    <div className="p-6  ">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4  ">
          {columns.map((col) => (
            <Droppable key={col.id} droppableId={col.id}>
              {(provided,snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-lg p-4 w-[250px] transition-all duration-300 border 
        ${snapshot.isDraggingOver ? "bg-blue-50 border-blue-400" : "bg-gray-100 border-transparent"}`}
      style={{
        // grow the column when a card is over it
        minHeight: snapshot.isDraggingOver ? 420 : 298,
        // avoid the fixed scroll box fighting your height change
        overflowY: snapshot.isDraggingOver ? "visible" : "auto",
      }}
                >
                  <h2 className="text-sm mb-2">{col.title} <span className="rounded bg-gray-300 p-1"> {col.tasks.length}</span></h2>

                  {col.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided,) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-2 mb-2 bg-white shadow rounded"
                        >
                          <div className="font-semibold text-gray-800 p-1 flex gap-2">
                          <h2 >{task.title}</h2>
                          <button
                           onClick={() => setEditingTask(task)}
                       className="text-blue-500 cursor-pointer text-sm "
                              ><FiEdit size={20} /></button>
                        </div>
                        <div className="text-xs text-gray-600 p-2">
                          <span className="font-medium"></span> {task.type}
                        </div>
                        <div className="flex gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                 <MdOutlineDateRange size={20} className="text-blue-500" />
                                   <span>{task.dueDate}</span>
                                   </div>
                        <div className="text-xs text-gray-600 p-2 flex gap-2">
                          <div className="font-medium"><CgProfile size={24} /></div> <div> {task.assigned}</div>
                         
                          
                        </div>
                        </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
              
                  {/* Create Task Form */}
                  {activeTaskColumn === col.id ? (
                    <div className="mt-2 space-y-2">
                    <input
                      value={taskInput}
                      onChange={(e) => setTaskInput(e.target.value)}
                      placeholder="Task title"
                      required
                      className="w-full p-2 border rounded"
                    />
                    <select
                      value={taskType}
                      onChange={(e) => setTaskType(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                       <option value="Feature"> Feature</option>
                           <option value="Bug"> Bug</option>
                           <option value="Task"> Task</option>
                    </select>
                     
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

     
                    <input
                      value={assigned}
                      onChange={(e) => setAssigned(e.target.value)}
                      placeholder="Assignee name"
                      className="w-full p-2 border rounded"
                      required
                    />
                    <div className="flex gap-2">
                    <button
                      onClick={() => addTask(col.id)}
                      className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer"
                    >
                      Add Task
                    </button>
                    <button onClick={Cancel}
                      className="w-full bg-blue-500 text-white p-2 rounded cursor-pointer">Cancel</button>
                      </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveTaskColumn(col.id)}
                    className="mt-2 w-full  rounded cursor-pointer text-transparent text-left hover:text-gray-500 cursor-pointer  transition"
                  > <GoPlus size={24} />
                  </button>
                )}
              </div>
              )}
            </Droppable>
          ))}
          {editingTask && (
  <div className="fixed inset-0  flex items-center justify-center "  style={{ backgroundColor: "#00000093" }}>
    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
      <h2 className="text-lg font-semibold mb-4">Edit Task</h2>

      <input
        type="text"
        value={editingTask.title}
        onChange={(e) =>
          setEditingTask({ ...editingTask, title: e.target.value })
        }
        className="w-full p-2 border rounded mb-3"
      />

      <select
        value={editingTask.type}
        onChange={(e) =>
          setEditingTask({ ...editingTask, type: e.target.value })
        }
        className="w-full p-2 border rounded mb-3"
      >
        <option>Feature</option>
        <option>Bug</option>
        <option>Task</option>
      </select>

      <input
        type="date"
        value={
          editingTask.dueDate
            ? new Date(editingTask.dueDate).toISOString().split("T")[0]
            : ""
        }
        onChange={(e) =>
          setEditingTask({
            ...editingTask,
            dueDate: e.target.value ? new Date(e.target.value).toDateString() : "",
          })
        }
        className="w-full p-2 border rounded mb-3"
      />

      <input
        type="text"
        placeholder="Assigned To"
        value={editingTask.assigned}
        onChange={(e) =>
          setEditingTask({ ...editingTask, assigned: e.target.value })
        }
        className="w-full p-2 border rounded mb-3"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setEditingTask(null)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => saveTaskEdit(editingTask)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

          {/* Small + button for adding column */}
          <div className="flex items-start">
            {showColumnForm ? (
              <div className="rounded-lg p-3 min-w-[200px]">
                <input
                ref={inputRef}
                  type="text"
                  placeholder=""
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  className="w-full rounded border-2 border-gray-300 px-3 py-2 text-sm 
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition"
                />
                <div className="flex gap-1 mt-2   flex-row-reverse" >
                  <button
                    onClick={addColumn}
                    className=" w-8 h-8 items-center text-gray-500 text-lg  justify-center rounded shadow  cursor-pointer"
                  > ✓
                  </button>
                  <button
                    onClick={() => setShowColumnForm(false)}
                    className=" w-8 h-8 text-center justify-center text-gray-500 text-lg  rounded shadow   cursor-pointer"
                  > X
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowColumnForm(true)}
                className="w-8 h-8 flex items-center justify-center rounded  text-gray-500 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none shadow cursor-pointer"
              >
               <GoPlus size={24} />
              </button>
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
