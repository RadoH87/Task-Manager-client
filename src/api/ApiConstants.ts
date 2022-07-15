export const ApiConstants = {
  TASK: {
    ADD: (userId: string | undefined) => {
      return "/task/" + userId;
    },
    FIND_NOT_COMPLETED: (userId: string) => {
      return "/task/findAllNotCompleted/" + userId;
    },
    FIND_COMPLETED: (userId: string) => {
      return "/task/findAllCompleted/" + userId;
    },
    MARK_COMPLETE: (taskId: string) => {
      return "/task/" + taskId;
    },
    DELETE: (taskID: string) => {
      return "/task/" + taskID;
    },
  },
  USER: {
    SIGN_UP: "/user/signUp",
    FIND_ALL: "/user",
    DELETE: (userId: string) => {
      return "/user/" + userId;
    },
  },
  LOGIN: "/auth/login",
};
