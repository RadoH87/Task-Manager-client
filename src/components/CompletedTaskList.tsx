import React from "react";

interface CompletedTasksProps {
  id: string;
  task: string;
  dateTime: string;
  deleteTask: (id: string) => void;
}

export const CompletedTaskList = (props: CompletedTasksProps) => {
  return (
    <li className="border-gray-400 mt-4  flex flex-row ">
      <div className="select-none bg-gray-800 flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-b-2 p-6 hover:shadow-2xl border-white text-white">
        <div className="flex-1 pl-1 mr-16">
          <div className="font-medium">{props.task}</div>
          <div className="font-medium">{props.dateTime}</div>
        </div>
        <button
          onClick={() => props.deleteTask(props.id)}
          className="bg-red-500 hover:bg-red-700 ml-8 text-white font-bold py-2 px-4 rounded-full"
        >
          Delete
        </button>
      </div>
    </li>
  );
};
