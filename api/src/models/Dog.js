const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('breed', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.ARRAY(DataTypes.STRING),//al enviar los datos por medio del body se hace con un array
      allowNull: false
    },
    weight: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(1048576),
    },
    rewiew:{
      type:DataTypes.STRING,
    }
  });
};


/*
[
  {
    "weight":{"imperial":"30 - 60","metric":"14 - 27"},
    "height":{"imperial":"17 - 21","metric":"43 - 53"},
    "id":15,
    "name":"American Pit Bull Terrier",
    "country_code":"US",
    "bred_for":"Fighting",
    "breed_group":"Terrier",
    "life_span":"10 - 15 years",
    "temperament":"Strong Willed, Stubborn, Friendly, Clownish, Affectionate, Loyal, Obedient, Intelligent, Courageous",
    "reference_image_id":"HkC31gcNm"
  }
]
*/