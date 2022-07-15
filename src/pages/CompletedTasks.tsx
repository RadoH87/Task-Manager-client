import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import { CompletedTaskList } from "../components/CompletedTaskList";
import { getLoginInfo } from "../utils/LoginInfo";
import custom_axios from "../axios/AxiosSetup";
import { ApiConstants } from "../api/ApiConstants";
import { toast } from "react-toastify";

interface TaskModel {
  title: string;
  date: string;
  id: string;
}

export const CompletedTasks = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  const getAllCompletedTasks = async () => {
    const userId = getLoginInfo()?.userId;
    if (userId != null) {
      const response = await custom_axios.get(
        ApiConstants.TASK.FIND_COMPLETED(userId),
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setTasks(response.data);
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  React.useEffect(() => {
    if (tasks.length == 0) getAllCompletedTasks();
  }, []);

  return (
    <div>
      <NavBar />
      <h1 className="text-white text-center text-5xl p-8 uppercase">
        Completed Tasks
      </h1>
      <div className="container  mb-2 flex mx-auto w-full items-center justify-center">
        <ul className="flex flex-col p-4 ">
          {tasks.map((task) => {
            return (
              <CompletedTaskList
                key={task.id}
                dateTime={task.date}
                deleteTask={async () => {
                  await custom_axios.delete(ApiConstants.TASK.DELETE(task.id), {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  });
                  await getAllCompletedTasks();
                  toast.success("Task Deleted Successfully!!");
                }}
                id={task.id}
                task={task.title}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
