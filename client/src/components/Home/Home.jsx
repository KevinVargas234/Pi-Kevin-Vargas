import CardContainer from "../CardContainer/CardContainer"
import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { get_all_dogs,set_page } from "../../redux/actions";
import { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
export default function Home() {
  const dispatch=useDispatch();  
  

  const dogs = useSelector(estate=>estate.dogs)
  const page=useSelector(estate=>estate.page)

  useEffect(()=>{
    dispatch(get_all_dogs());
   },[])
  return (

    <div>
      <SearchBar />
      <div id="page-button-container">
        {dogs.filter((dog,i)=>{
          return i%8===0;
        }).map((dog,i)=>{
            return<button key={Math.random()} className={"page-button"+(i==page?"-current":"")} onClick={()=>{
              dispatch(set_page(i));
            }}>{i+1}</button>
        })}
      </div>

      {dogs.length
      ?<div>
        <CardContainer dogs={
            dogs.filter((dog,i)=>{
              return i>=(page*8) &&i<(page*8)+4;
            })        
        } />
        <CardContainer dogs={
            dogs.filter((dog,i)=>{
              return i>=(page*8)+4 &&i<(page*8)+8;
            })        
        } />

      </div>
      :<div className="spinner">
      <div className="dot1"></div>
      <div className="dot2"></div>
      <div className="dot3"></div>
      </div>
      }



    </div>
  );
}