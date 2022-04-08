import React, { useState } from "react";
import QuadraDataService from "../services/QuadraService";

const AddQuadra = () => {
  const initialQuadraState = {
    id: null,
    name: "",
    description: "",
    
  };
  const [quadra, setQuadra] = useState(initialQuadraState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setQuadra({ ...quadra, [name]: value });
  };

  const saveQuadra = () => {
    var data = {
      name: quadra.name,
      description: quadra.description
    };

    QuadraDataService.create(data)
      .then(response => {
        setQuadra({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newQuadra = () => {
    setQuadra(initialQuadraState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Quadra Adicionada!</h4>
          <button className="btn btn-success" onClick={newQuadra}>
            Adicionar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={quadra.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={quadra.description}
              onChange={handleInputChange}
              name="description"  
            />
          </div>

          <button onClick={saveQuadra} className="btn btn-success mt-2">
            Adicionar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddQuadra;
