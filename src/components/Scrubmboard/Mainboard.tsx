
import  { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
 
} from "@hello-pangea/dnd";
import { MdOutlineDateRange } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";
import type { DropResult } from "@hello-pangea/dnd";
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

  const [showColumnForm, setShowColumnForm] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [activeTaskColumn, setActiveTaskColumn] = useState<string | null>(null);
  const [taskInput, setTaskInput] = useState("");
  
  const [taskType, setTaskType] = useState("Feature");
  const [dueDate, setDueDate] = useState("");
  const [assigned, setAssigned] = useState("");

  // Add new column
  const addColumn = () => {
    if (!newColumnTitle.trim()) return;
    setColumns([
      ...columns,
      { id: Date.now().toString(), title: newColumnTitle, tasks: [] },
    ]);
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
      dueDate: dueDate || "No due date",
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

  return (
    <div className="p-6  ">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4  ">
          {columns.map((col) => (
            <Droppable key={col.id} droppableId={col.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 rounded-lg p-4 min-w-[250px] max-h-[500px] overflow-y-auto"
                >
                  <h2 className="font-semibold mb-2">{col.title} <span className="rounded bg-gray-300">0</span></h2>

                  {col.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-2 mb-2 bg-white shadow rounded"
                        >
                          <div className="font-semibold text-gray-800 p-2">
                          <h2>{task.title}</h2>
                        </div>
                        <div className="text-xs text-gray-600 p-2">
                          <span className="font-medium">Type:</span> {task.type}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                 <MdOutlineDateRange size={20} className="text-blue-500" />
                                   <span>{task.dueDate}</span>
                                   </div>
                        <div className="text-xs text-gray-600 p-2">
                          <span className="font-medium">Assigned:</span>{" "}
                          {task.assigned}
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
                    <button
                      onClick={() => addTask(col.id)}
                      className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                      Add Task
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveTaskColumn(col.id)}
                    className="mt-2 w-full text-blue-500 p-2 rounded cursor-pointer"
                  >+ Add Task
                  </button>
                )}
              </div>
              )}
            </Droppable>
          ))}
          {/* Small + button for adding column */}
          <div className="flex items-start">
            {showColumnForm ? (
              <div className="rounded-lg p-3 min-w-[200px]">
                <input
                  type="text"
                  placeholder=""
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  className="border-none rounded px-2 py-1 w-full bg-gray-200 "
                />
                <div className="flex gap-1 mt-2 grid  justify-items-end" >
                  <button
                    onClick={addColumn}
                    className="  text-sm rounded  text-white cursor-pointer"
                  ><TiTickOutline size={24} color="green"/>
                  </button>
                  <button
                    onClick={() => setShowColumnForm(false)}
                    className="text-sm rounded  text-white cursor-pointer"
                  >
                   <MdOutlineCancel size={24} color="red"/>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowColumnForm(true)}
                className="w-8 h-8 flex items-center justify-center rounded bg-gray-200 text-black text-lg shadow cursor-pointer"
              >
                +
              </button>
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
