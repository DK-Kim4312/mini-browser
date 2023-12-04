import React from 'react';
import { useSelector } from 'react-redux';
import { DisplayWrapper } from './Display.style';
import { useDispatch } from 'react-redux';
import { HIDE_LIST } from '../../reducer/display';


export default function Display() {
    const isShow = useSelector((state) => state.display.isShow)
    const dispatch = useDispatch();

    const hideList = () => {
        dispatch({ type: HIDE_LIST });
    }

    if (!isShow) { return null };

    return (
        <DisplayWrapper>
            <div className="container" >
                <div className="header" >
                    <h1>Display Header</h1>
                    <button className="Hide List"
                        onClick={hideList} >Close</button>
                </div>
                <div className="content" >
                    <p>Display Content</p>
                    
                </div>
            </div>
        </DisplayWrapper>
    );
}