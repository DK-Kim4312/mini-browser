import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const PathObject = (props) => (
    <tr>
        <td>{props.title}</td>
        <td>{props.link}</td>
        <td>{props.score}</td>
    </tr>
);

export default function LinkList() {
    const { linksData, isLoading } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestUsers(data));
    }, []);

    async function requestUsers(data) {
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


    function showList() {
        return linksData.map((link) => (
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