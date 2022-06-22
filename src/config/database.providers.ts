import { Sequelize } from "sequelize-typescript"
import { Role } from "src/models/role.model";
import { User } from "src/models/user.model";


export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'booking',
            });
            sequelize.addModels([Role, User]);
            await sequelize.sync().then(() => {
                console.log('connect database success!!');
            });
            return sequelize;
        }
    }
]