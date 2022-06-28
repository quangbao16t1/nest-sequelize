import { Tables } from "src/models/tables.model";

export const tabelProviders = [
    {
        provide: "TABLE_REPOSITORY",
        useValue: Tables

    }
]
