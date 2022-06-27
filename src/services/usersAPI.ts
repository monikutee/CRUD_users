import { User } from "../types";
import Axios from "axios";
import { Country } from "../types";

export function addUser(user: User): void {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  localStorage.setItem("users", JSON.stringify([...users, user]));
}

export function getUsers(): User[] {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

export function updateUsers(users: User[]): void {
  localStorage.setItem("users", JSON.stringify(users));
}

export async function getCountries(): Promise<Country[]> {
  //mazas failas del to cia palikau :/
  try {
    const response = await Axios.get("https://restcountries.com/v2/all");
    return response.data;
  } catch (error) {
    throw error;
  }
}
