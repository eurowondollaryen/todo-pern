import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";
//useEffect :
const ListDones = () => {
  const [dones, setDones] = useState([]);
  const getDones = async () => {
    try {
      const body = {};
      const response = await fetch("http://localhost:5000/getDone");
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getDones();
  }, []);

  return (
    <div>s</div>
  );
};

export default ListDones;
