import { GET_ALL_DOGS,SET_PAGE,SEARCH_DOGS,GET_ALL_TEMPERAMENTS,GET_DOG_DETAIL, FILTER_DOGS, ORDER_DOGS } from "../types";
import { sort } from "../../utils";
const intial_state = {
    all_dogs: [],
    dogs: [],
    temperaments: [],
    dog_details: [],
    page:0,
    filtro:{origin:"all",temperament:"all temperaments"}
};
export default function root_reducer(state = intial_state, action){
    switch (action.type){
        case ORDER_DOGS:
            return{
                ...state,
                dogs:sort(state.dogs,(a,b)=>{
                    switch(action.payload){
                        case"a - z":
                            return a.name.toLowerCase()>b.name.toLowerCase()
                        break;
                        case"z - a":
                            return a.name.toLowerCase()<b.name.toLowerCase()
                        break;
                        case "min - max":
                            return a.weight[0]>b.weight[0];
                        break;
                        case "max - min":
                            return a.weight[0]<b.weight[0];
                        break;
                        default:
                            console.log("ni idea de que significa >"+action.payload+"<");
                            return 0;
                        break;
                 }
                })
            }


        case FILTER_DOGS:
            return{
                ...state,
                page:0,
                filtro:action.payload,
                dogs:state.all_dogs.filter((dog)=>{
                    if(action.payload.origin==="all")
                        return true;
                    else
                    if(action.payload.origin==="api")
                        return /^[0-9]*$/.test(""+dog.id)
                    else
                        return !/^[0-9]*$/.test(""+dog.id)
                }).filter((dog)=>{
                    return dog.temperaments?.filter((t)=>{
                        return (t.name||t).toLowerCase().includes(action.payload.temperament.toLowerCase())||action.payload.temperament=="all temperaments";  
                    }).length
                })
            }
    
        case SEARCH_DOGS:
            return{
                ...state,
                dogs:state.all_dogs.filter((dog)=>{
                    return dog.name.toLowerCase().includes(action.payload.toLowerCase());
                }).filter((dog)=>{
                    if(state.filtro.origin==="all")
                        return true;
                    else
                    if(state.filtro.origin==="api")
                        return /^[0-9]*$/.test(""+dog.id)
                    else
                        return !/^[0-9]*$/.test(""+dog.id)
                }).filter((dog)=>{
                    return dog.temperaments?.filter((t)=>{
                        return (t.name||t).toLowerCase().includes(state.filtro.temperament.toLowerCase())||state.filtro.temperament=="all temperaments";  
                    }).length
                })
            }
        case GET_DOG_DETAIL:
            
            return{
                ...state,
                dog_details:action.payload
            }            
        case SET_PAGE:
            return{
                ...state,
                page:action.payload
            }
        case GET_ALL_DOGS:
            return{
                ...state,
                all_dogs:action.payload,
                dogs:action.payload
            }
        case GET_ALL_TEMPERAMENTS:
            return{
                ...state,
                temperaments:action.payload.filter(e=>e.name),
            }
        default:
            return state;
    }
}
