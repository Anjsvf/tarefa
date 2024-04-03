import React, { useState, useEffect } from "react";
import "./TodoList.css";
import Icone from "./assets/list-items.png";

function TodoList() {
  const [lista, setLista] = useState([]);
  const [novoItem, setNovoItem] = useState("");

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("todoList")) || [];
    setLista(savedList);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(lista));
  }, [lista]);

  function adicionaItem(form) {
    form.preventDefault();
    if (!novoItem.trim()) {
      return;
    }
    setLista([...lista, { text: novoItem, isCompleted: false }]);
    setNovoItem("");
  }

  function deletarItem(index) {
    const novaLista = [...lista];
    novaLista.splice(index, 1);
    setLista(novaLista);
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={adicionaItem}>
        <input
          id="input-entrada"
          type="text"
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
          placeholder="Adicione uma tarefa"
        />
        <button className="add" type="submit">
          Adicionar
        </button>
      </form>
      <div className="listaTarefas">
        {lista.length === 0 ? (
          <img className="icon-central" src={Icone} alt="Ícone Lista de Tarefas" />
        ) : (
          lista.map((item, index) => (
            <div key={index} className={`item ${item.isCompleted ? "completo" : ""}`}>
              <span>{item.text}</span>
              <button className="del" onClick={() => deletarItem(index)}>
                Deletar
              </button>
            </div>
          ))
        )}
        {lista.length > 0 && (
          <button className="delAll" onClick={() => setLista([])}>
            Deletar Tudo
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoList;
