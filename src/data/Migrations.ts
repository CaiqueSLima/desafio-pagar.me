import { BaseDatabase } from "./BaseDatabase"

class Migrations extends BaseDatabase {
    public async main() {
        try {
            await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS pagar.me_transactions (
                    id VARCHAR(255) PRIMARY KEY,
                    description VARCHAR(255) NOT NULL,
                    payment_method VARCHAR(255) NOT NULL,
                    card_number INT NOT NULL,
                    card_owner VARCHAR(255) NOT NULL,
                    card_exp_date VARCHAR(255) NOT NULL,
                    card_CVV VARCHAR(255) NOT NULL,
                );

                
            `)
        } catch (error: any) {

        }
    }
}