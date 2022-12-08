import clientAxios from ".";

export const createLoggerHistory = async (message: string) => {
  await clientAxios.post("/api/v1/loghistory", { message });
};
