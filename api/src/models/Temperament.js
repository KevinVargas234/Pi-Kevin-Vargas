const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => { 
  sequelize.define('temperament', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }
  );
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