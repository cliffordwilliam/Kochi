const { app, server } = require("../app");

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  `listening to ${PORT}`;
});

/**
 * npx sequelize db:migrate:undo:all ^
& npx sequelize db:migrate ^
& npx sequelize db:seed:all ^
nodemon .\bin\www.js
 */
