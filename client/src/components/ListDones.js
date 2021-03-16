import React, { Fragment, useEffect, useState } from "react";

const ListDones = () => {
    const getDones = async () => {
        try {
            const body = {};
            const response = await fetch("http://localhost:5000/getDone");
            const jsonData = await response.json();
        } catch(err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getDones();
      }, []);

    return (
        <div>hello im listdones.</div>
    );
}

export default ListDones;