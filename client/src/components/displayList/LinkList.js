import React from "react";
import { useState, useEffect } from "react";


const dbPath = "../../../../db/db.json";

const PathObject = (props) => (
    <tr>
      <td>{props.link.title}</td>
      <td>{props.link.link}</td>
    </tr>
  );

export default function LinkList() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    async function getLinks() {
        fetch(dbPath)
    .then((response) => response.json())
      const response = await fetch(``);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const links = await response.json();
      setLinks(links);
    }
    getLinks();
  }, []);

  function showList() {
    return links.map((link) => (
      <PathObject link={link} key={link.title} score={link.score} />
    ));
  }

  return (
      <table className="list-links">
        <thead>
          <tr>
            <th>Title</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{showList()}</tbody>
      </table>
  );
}