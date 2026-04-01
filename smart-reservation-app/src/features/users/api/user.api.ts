import fetchClient from "../../../config/fetchClient";
import type { User } from "../types/user.types";

export const getUserByIdApi = async(id : number): Promise<User> => {
  return fetchClient.get(`/utilisateurs/${id}`)
}

export const getAllUsersApi = async (): Promise<User[]> => {
  return fetchClient.get("/utilisateurs")
}

export const updateUserApi = async(id: number, data:Partial<User>): Promise<User> => {
  return fetchClient.put(`/utilisateurs/${id}`)
}