import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { ActiveTaskList } from "../components/ActiveTaskList";
import custom_axios from "../axios/AxiosSetup";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import { ApiConstants } from "../api/ApiConstants";

interface TaskModel {
  title: string;
  date: string;
  id: string;
}

export function ActiveTasks() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const title: any = React.useRef();

  // get all tasks not completed with respect to userid
  const getAllNotCompletedTasks = async () => {
    const userId = getLoginInfo()?.userId;
    if (userId != null) {
      const response = await custom_axios.get(
        ApiConstants.TASK.FIND_NOT_COMPLETED(userId),
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      setTasks(response.data);
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  const saveTask = async () => {
    if (title.current.value == "") {
      toast.info("Please Provide Title");
      return;
    }
    const userId = getLoginInfo()?.userId;
    if (userId !== null) {
      const response = await custom_axios.post(
        ApiConstants.TASK.ADD(userId),
        {
          title: title.current.value,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      await getAllNotCompletedTasks();
      title.current.value = "";
      toast.success("Task Added Successfully!!");
    } else {
      toast.info("Sorry you are not authenticated");
    }
  };

  useEffect(() => {
    if (tasks.length == 0) getAllNotCompletedTasks();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="container mt-24 flex mx-auto w-full items-center justify-center">
        <ul className="flex flex-col p-4">
          <div className="flex space-x-5">
            <input
              ref={title}
              placeholder="Enter your task"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            <button
              onClick={saveTask}
              className="w-36 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
            >
              Add Task
            </button>
          </div>

          {tasks.map((task) => {
            return (
              <ActiveTaskList
                key={task.id}
                dateTime={task.date}
                deleteTask={async () => {
                  const response = await custom_axios.delete(
                    ApiConstants.TASK.DELETE(task.id),
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                  await getAllNotCompletedTasks();
                  toast.success("Task Deleted Successfully!!");
                }}
                markComplete={async () => {
                  const response = await custom_axios.patch(
                    ApiConstants.TASK.MARK_COMPLETE(task.id),
                    {},
                    {
                      headers: {
                        Authorization:
                          "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  );
                  await getAllNotCompletedTasks();
                  toast.success("Task Marked Completed");
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
}
