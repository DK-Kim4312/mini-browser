import React from "react";
import { useEffect } from "react";
import { useState } from "react";
//import { useSelector, useDispatch } from "react-redux";
//import DATA from "../fetchData/constants";



const PathObject = (props) => (
    <tr>
        <td>{props.title}</td>
        <td>{props.link}</td>
        <td>{props.score}</td>
    </tr>
);

export default function LinkList() {
    const [records, setRecords] = useState([]);
    // This method fetches the records from the database.
    useEffect(() => {
    async function getRecords() {
        const response = await fetch(`http://localhost:3000/record/`);
        if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
        }
        const records = await response.json();
        setRecords(records);
    }
        getRecords();
        return;
    }, [records.length]);

    /* Must Add Middleware to use this
    const { linksData, isLoading } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestLinks());
    }, []);

    async function requestLinks() {
        dispatch({
            type: DATA.LOAD,
        });
        try {
            const json = await fetch(`http://localhost:3000/record/`);
            console.log(json);
            dispatch({
                type: DATA.LOAD_SUCCESS,
                linksData: json.data,
                isError: false,
            });
        } catch (e) {
            dispatch({
                type: DATA.LOAD_SUCCESS,
                linksData: [],
                isError: true,
            });
        }
    }

    */
    function showList() {
        return records?.map((link) => (
            <PathObject title={link.title} link={link.link} score={link.score} />
        ));
    }
    

    return (
        <table className="list-links">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Link</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>{showList()}</tbody>
        </table>
    );
}