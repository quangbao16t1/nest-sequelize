import { Sequelize } from "sequelize-typescript";
import { Booking } from "src/models/booking.model";
import { Role } from "src/models/role.model";
import { Tables } from "src/models/tables.model";
import { User } from "src/models/user.model";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "booking",
      });
      sequelize.addModels([Role, User, Tables, Booking]);
      await sequelize.sync( {
        force: false
      }).then(() => {
        console.log("connect database success!!");
      });
      return sequelize;
    },
  },
];
