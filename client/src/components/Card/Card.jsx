import {Link} from "react-router-dom"

export default function Card({image,name,temperaments,weight,id,use_link,on_delete}) {

    return (
      <div className="card">

        {
        use_link?
        <Link to = {"/dog-detail/"+id} >
          <img 
            className="card-img"
            src={image||"https://static.vecteezy.com/ti/gratis-vektor/p1/5484042-hund-logotyp-illustration-vektor-gratis-vector.jpg"}
            alt={"imagen de "+name}  
          />
        </Link>
        :<img 
        className="card-img"
        src={image||"https://static.vecteezy.com/ti/gratis-vektor/p1/5484042-hund-logotyp-illustration-vektor-gratis-vector.jpg"}
        alt={"imagen de "+name}  
      />
        
        }
        
        
        
        
        <p className="name-dog">{name}</p>



        <div className="temperaments-container">
          {temperaments?.map((e)=>{
            
            return <p key={Math.random()} className="temperament">
              {e.name||e}
              {
              on_delete?
              <button className="close_button" onClick={
                ()=>{
                  on_delete(e.name||e)
                }
              }>x</button>
              :undefined
              }
            </p>




          })}
        </div>
      
        
        <p className="dog-weight">weight</p>
        <p className="dog-weight-datail">{(" min: "+weight[0]+"kg "+"max: "+weight[1]+ "kg")}</p>    
      </div>

    );
  }