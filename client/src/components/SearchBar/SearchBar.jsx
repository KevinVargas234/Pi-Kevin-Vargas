import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {get_all_temperaments,search_dogs,set_page,filter_dogs, order_dogs } from "../../redux/actions";
export default function(){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(get_all_temperaments());
    },[])
    const temperaments=useSelector(state=>state.temperaments)
    return(
        <div>
            <input type="text" placeholder="search dog" onChange={(e)=>{
                e.preventDefault();
                dispatch(search_dogs(e.target.value))
                dispatch(set_page(0))
            }}/>
            <select id="temp_fliter" onChange={(e)=>{
                    e.preventDefault();
                    
                    dispatch(filter_dogs({temperament:e.target.value,origin:document.getElementById("origin_filter").value}))
                    dispatch(set_page(0))
                }}>
                <option value="all temperaments">all temperaments</option>
                {temperaments.map((t)=>{
                    return <option key={Math.random()} value={t.name||t}>{t.name||t}</option>
                })}
            </select>
            <select id="origin_filter" onChange={(e)=>{
                e.preventDefault();
                dispatch(filter_dogs({origin:e.target.value,temperament:document.getElementById("temp_fliter").value}))
                dispatch(set_page(0))
            }}>
                <option value="all">all</option>
                <option value="db">db</option>
                <option value="api">api</option>
            </select>
            <select onChange={(e)=>{ 
                dispatch(order_dogs(e.target.value))
            }}>
                <option value="a - z">a - z</option>
                <option value="z - a">z - a</option>
                <option value="min - max">min - max weight</option>
                <option value="max - min">max - min weight</option>
            </select>

            <Link to ="/form-dog"><button className="search-bar-button">create</button></Link>
            


        </div>
    )
}