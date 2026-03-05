export const API = {

  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
  },

  USER: {
    PROFILE: "/user/profile",
    UPDATE: "/user/update",
  },

  GOALS: {
    CREATE: "/goals",
    GET_ALL: "/goals",
    REPORT: "/goals/report",
  },

  CHAT: {
    MESSAGE: (chatId, agentId) => `/chat/${chatId}/${agentId}/message`,
  },

  NOTES: {
    UPLOAD: "/notes/upload",
    TRANSLATE: "/notes/translate",
  }

};