import api from "./api";

const formatNote = (note) => ({
  ...note,
  id: note._id,
});

//getnotes
export const getNotes = async (page = 1, limit = 5, search = "") => {
  const res = await api.get("/notes", {
    params: {
      page,
      limit,
      search,
    },
  });

  return {
    ...res.data,
    data: res.data.data.map(formatNote),
  };
};

//create note
export const createNote = async (note) => {
  const res = await api.post("/notes", note);
  return formatNote(res.data.data);
};

// Get single note
export const getSingleNote = async (id) => {
  const res = await api.get(`/notes/${id}`);

  return {
    ...res.data.data,
    id: res.data.data._id,
  };
};

//delete note
export const deleteNote = async (id) => {
  const res = await api.delete(`/notes/${id}`);

  return res.data;
};

//update note
export const updateNote = async (id, note) => {
  const res = await api.put(`/notes/${id}`, note);
  return formatNote(res.data.data);
};
