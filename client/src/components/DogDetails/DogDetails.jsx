import { useEffect } from "react"
import {get_dog_detail} from "../../redux/actions/index"
import { GET_DOG_DETAIL } from "../../redux/types";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function DogDetails(){
    let { id } = useParams();
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(get_dog_detail(id))
        return ()=>{
            dispatch({type:GET_DOG_DETAIL,payload:[]})
        }
    },[])
    const dog= useSelector(state=>state.dog_details[0])
    console.log(dog);
    return(
        <div>
            <Link to = "/home">
            <button className="back-button">back</button>
            </Link>
            {               
            dog?<div className="card-detail">
                <img 
                className="card-img"
                src={dog.image||"https://static.vecteezy.com/ti/gratis-vektor/p1/5484042-hund-logotyp-illustration-vektor-gratis-vector.jpg"}
                alt={"imagen de "+dog.name}  
                />

                <p className="name-dog">{dog.name}</p>



                <div className="temperaments-container">
                {dog.temperaments?.map((e)=>{
                    return <p className="temperament">
                    {e.name||e}
                    </p>
                })}
                </div>


                <p className="dog-weight">weight</p>
                <p className="dog-weight-datail">{" min: "+dog.weight[0]+"kg "+"max: "+dog.weight[1]+ "kg"  }</p>
                <p className="dog-weight">height</p>
                <p className="dog-weight-datail">{" min: "+dog.height[0]+"cm "+"max: "+dog.height[1]+ "cm"  }</p>    
                <p className="dog-weight">life span</p>
                <p className="dog-weight-datail">{dog.life_span}</p>
            </div>
            :<div className="spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
            <div className="dot3"></div>
            </div>
        }
        </div>
    )
}