import { User } from "../types";
import Axios from "axios";

export function addUser(user: User): void {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  localStorage.setItem("users", JSON.stringify([...users, user]));
}

export function getUsers() {
  return localStorage.getItem("users") || "[]";
}

export function updateUsers(users: User[]): void {
  localStorage.setItem("users", JSON.stringify(users));
}

export async function getCountries() {
  //mazas failas del to cia palikau :/
  try {
    const response = await Axios.get("https://restcountries.com/v2/all");
    return response.data;
  } catch (error) {
    throw error;
  }
}
