import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import QuadraDataService from "../services/QuadraService";

const Quadra = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialQuadraState = {
    id: null,
    name: "",
    description: "",
  };
  const [currentQuadra, setCurrentQuadra] = useState(initialQuadraState);
  const [message, setMessage] = useState("");

  const getQuadra = id => {
    QuadraDataService.get(id)
      .then(response => {
        setCurrentQuadra(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getQuadra(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentQuadra({ ...currentQuadra, [name]: value });
  };

  const updateQuadra = () => {
    QuadraDataService.update(currentQuadra.id, currentQuadra)
      .then(response => {
        console.log(response.data);
        setMessage("Quadra atualizada!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteQuadra = () => {
    QuadraDataService.remove(currentQuadra.id)
      .then(response => {
        console.log(response.data);
        navigate("/quadras");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentQuadra ? (
        <div className="edit-form">
          <h4>Quadra</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentQuadra.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentQuadra.description}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button className="btn btn-danger mr-2" onClick={deleteQuadra}>
            Deletar
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={updateQuadra}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Selecione uma Quadra...</p>
        </div>
      )}
    </div>
  );
};

export default Quadra;
