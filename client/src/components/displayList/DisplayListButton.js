import React from 'react';
import { useDispatch } from 'react-redux';
import { DISPLAY_LIST } from '../../reducer/display';
import store from '../../store';

export default function OpenDisplayListButton() {

    const dispatch = useDispatch();

    const displayList = () => {
        dispatch({ type: DISPLAY_LIST });
    }

    return (
        <button 
            onClick={displayList}
            >display links</button>

    )
}