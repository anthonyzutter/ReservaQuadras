import React, { useState, useEffect } from "react";
import QuadraDataService from "../services/QuadraService";
import { Link } from "react-router-dom";

const QuadrasList = () => {
  const [quadras, setQuadras] = useState([]);
  const [currentQuadra, setCurrentQuadra] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveQuadras();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveQuadras = () => {
    QuadraDataService.getAll()
      .then(response => {
        setQuadras(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveQuadras();
    setCurrentQuadra(null);
    setCurrentIndex(-1);
  };

  const setActiveQuadra = (quadra, index) => {
    setCurrentQuadra(quadra);
    setCurrentIndex(index);
  };

  const removeAllQuadras = () => {
    QuadraDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    QuadraDataService.findByName(searchName)
      .then(response => {
        setQuadras(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar por nome"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Pesquisar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de Quadras</h4>

        <ul className="list-group">
          {quadras &&
            quadras.map((quadra, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveQuadra(quadra, index)}
                key={index}
              >
                {quadra.name}
              </li>
            ))}
        </ul>

       {/*  <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllQuadras}
        >
          Remove All
        </button> */}
      </div>
      <div className="col-md-6">
        {currentQuadra ? (
          <div>
            <h4>Quadra</h4>
            <div>
              <label>
                <strong>Nome:</strong>
              </label>{" "}
              {currentQuadra.name}
            </div>
            <div>
              <label>
                <strong>Descrição:</strong>
              </label>{" "}
              {currentQuadra.description}
            </div>

            <Link
              to={"/quadras/" + currentQuadra.id}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecione uma quadra...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuadrasList;
