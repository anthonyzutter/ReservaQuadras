import http from "../http-common";

const getAll = () => {
  return http.get("/quadras");
};

const get = id => {
  return http.get(`/quadras/${id}`);
};

const create = data => {
  return http.post("/quadras", data);
};

const update = (id, data) => {
  return http.put(`/quadras/${id}`, data);
};

const remove = id => {
  return http.delete(`/quadras/${id}`);
};

const removeAll = () => {
  return http.delete(`/quadras`);
};

const findByName = name => {
  return http.get(`/quadras?name=${name}`);
};

const QuadraService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};

export default QuadraService;
