import axios from "axios";

const BASE_URL = "http://localhost:3000/notes";

//getnotes
export const getNotes = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

//create note
export const createNote = async (note) => {
  const res = await axios.post(BASE_URL, note);
  return res.data;
};

//delete note
export async function deleteNote(id) {
  await axios.delete(`${BASE_URL}/${id}`);
}

//update note
export const updateNote = async (id, note) => {
  const res = await axios.put(`${BASE_URL}/${id}`, note);
  return res.data;
};
