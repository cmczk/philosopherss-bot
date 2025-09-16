import { saveUser } from "../storage/sqlite.js"

export const registerUser = (tgId: number, username: string) => {
  saveUser(tgId, username)
}
