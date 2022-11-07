import axios from "axios"
import { GET_ALL_DOGS,SET_PAGE ,SEARCH_DOGS,GET_ALL_TEMPERAMENTS,GET_DOG_DETAIL,FILTER_DOGS,ORDER_DOGS} from "../types"

axios.defaults.baseURL= "http://localhost:3001";



export function get_dog_detail(id){
    return async function(dispatch){
        var data = await axios.get("/dogs/"+id)
        return dispatch({
            type:GET_DOG_DETAIL,
            payload:data.data
        })
    }
}
export function filter_dogs(type){
    return{
        type:FILTER_DOGS,
        payload:type
    }
}
export function order_dogs(type){
    return{
        type:ORDER_DOGS,
        payload:type
    }
}

export function search_dogs(name){
    return {
        type:SEARCH_DOGS,
        payload:name
    }
}

export function set_page(page){
    return {type:SET_PAGE,payload:page}
}

export function get_all_dogs(){
    return async function(dispatch){
        var data = await axios.get("/dogs")
        return dispatch({
            type:GET_ALL_DOGS,
            payload:data.data
        })
    }
}
export function get_all_temperaments(){
    return async function(dispatch){
        var data = await axios.get("/temperament")
        return dispatch({
            type:GET_ALL_TEMPERAMENTS,
            payload:data.data
        })
    }
}