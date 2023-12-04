import React from "react";
import { requestLinks } from "../fetchData/Data"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import data from "../../../../db/data.json";
const PathObject = (props) => (
    <tr>
        <td>{props.link.title}</td>
        <td>{props.link.link}</td>
    </tr>
);

export default function LinkList() {
    const { linksData, isLoading } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestUsers(data));
    }, []);


    function showList() {
        return linksData.map((link) => (
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