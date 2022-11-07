import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_temperaments,get_all_dogs } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card"
import axios from "axios";
axios.defaults.baseURL= "http://localhost:3001";
export default function FormDog() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(get_all_temperaments());
  },[])

  const temperaments=useSelector(state=>state.temperaments)
  var [dog,set_dog]= useState({
    name:"",
    image:"",
    min_height:0,
    max_height:0,
    min_weight:0,
    max_weight:0,
    life_span:0,
    temperaments:[]
  })
  var [errors,set_errors]=useState([]);

  useEffect(()=>{
    var new_errors=[]
    if(!dog.name.length){
      new_errors.push("el nombre no debe estar vacio")      
    }
    if(/(?=.*[0-9])/.test(dog.name)){
      new_errors.push("el nombre no debe contener numeros")
    }
  
    if(!/^[0-9]*$/.test(dog.min_height)){
      new_errors.push("la altura solo debe contener numeros")
    }
  

    if(!/^[0-9]*$/.test(dog.max_height)){
        new_errors.push("la altura solo debe contener numeros")
      }
    

    if(Number(dog.min_height)>Number(dog.max_height)){
      new_errors.push("la altura minima no puede ser mayor que la maxima")
    }
  






    if(!/^[0-9]*$/.test(dog.min_weight)){
        new_errors.push("el peso solo debe contener numeros")
      }
    

      if(!/^[0-9]*$/.test(dog.max_weight)){
        new_errors.push("el peso solo debe contener numeros")
      }
    

      if(Number(dog.min_weight)>Number(dog.max_weight)){
        new_errors.push("el peso minimo no puede ser mayor que el maximo")
      }
    




    set_errors(new_errors);
  },[dog])
  
  
  var [show_input_temperament,set_show_input_temperament]=useState(false);
  function handleSelect(e){
    if(e.target.value!="new"){
      if(!dog.temperaments.includes(e.target.value)){
        console.log(e.target.value);
        set_dog({
          ...dog,
          temperaments:[...dog.temperaments,e.target.value]
        })
      } 
    }else{
      set_show_input_temperament(true);
    }

    e.target.value="Temperaments"
  }
  
  function handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    set_dog({
      ...dog,
      [name]: value
    });
  }



  return (
    <div>
      <Link to = "/home">
          <button className="back-button">back</button>
        </Link>
      <div id="form-dog" >
        <Card image={dog.image} 
              name= {dog.name}
              temperaments= {dog.temperaments}
              weight={[dog.min_weight,dog.max_weight]}
              id={dog.id}
              use_link ={false}
              on_delete={(t)=>{
                set_dog({
                  ...dog,
                  temperaments:dog.temperaments.filter(tem=>tem!==t)
                })            
              }}
        />
        <form>
          <div>
            <input
              name="name"
              type="text"
              placeholder="name"
              onChange={handleChange} />
            <input
              name="image"
              type="text"
              placeholder="image url"
              onChange={handleChange} />
          </div>

          
          {
          show_input_temperament
          ?<div>
            <input type="text" id="new_temperament" name="new_temperament" placeholder="new temperament" />
            
            <input type="button" value="add" onClick={()=>{
              if(document.getElementById("new_temperament").value){
                set_dog({
                  ...dog,
                  temperaments:[...dog.temperaments,document.getElementById("new_temperament").value]
                })
              }
              document.getElementById("new_temperament").value="";
              set_show_input_temperament(false);
            }} />
            



          </div>
          :<div>
            <select onChange={handleSelect}>
                <option disabled selected>Temperaments</option>
                <option value="new" >new</option>
                {temperaments.map(d => (                    
                  <option key={Math.random()} value={d.name} >{d.name}</option>
                ))}
            </select>
          </div>
          }
          
          <div>
            <input 
              name="min_height"
              type="text"
              placeholder="min_height"
              onChange={handleChange} />
            <input
              name="max_height"
              type="text"
              placeholder="max_height"
              onChange={handleChange} />
          </div>

          <div>
            <input
              name="min_weight"
              type="text"
              placeholder="min_weight"
              onChange={handleChange} />
            <input
              name="max_weight"
              type="text"
              placeholder="max_weight"
              onChange={handleChange} />
          </div>


        <input
          name="life_span"
          type="text"
          placeholder="life_span"
          onChange={handleChange} />





          <input value="submit" disabled={errors.length} onClick={
            ()=>{
              if(!errors.length){
                axios.post("/dogs",dog).then((data)=>{
                  alert(data.data);
                  dispatch(get_all_dogs());
                }).catch((e)=>{
                  console.log(e);
                  alert(e);
                })
              }
            }
          }/>

          {
          errors.map((e)=>{
            return <p className="error">{e}</p>
          })
          }

        </form>

      </div>
    </div>
  )
  }