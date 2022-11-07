import Card from "../Card/Card"
export default function CardContainer({dogs}) {
    return (
      <div className="card-container">
        {
          dogs.map(dog => {
            return <Card key={Math.random()} image={dog.image} 
            name= {dog.name}
            temperaments= {dog.temperaments}
            weight={dog.weight}
            id={dog.id}
            use_link = {true}
            />
          })
        }
      </div>
    );
  }