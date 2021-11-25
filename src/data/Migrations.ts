import { BaseDatabase } from "./BaseDatabase"

class Migrations extends BaseDatabase {
    public async main() {
        try {
            await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS pagar.me_transactions (
                    id VARCHAR(255) PRIMARY KEY,
                    value DOUBLE(10,2) NOT NULL,
                    description VARCHAR(255) NOT NULL,
                    payment_method VARCHAR(255) NOT NULL,
                    card_number INT NOT NULL,
                    card_owner VARCHAR(255) NOT NULL,
                    card_exp_date VARCHAR(255) NOT NULL,
                    card_CVV VARCHAR(255) NOT NULL,
                );
            
            CREATE TABLE IF NOT EXISTS pagar.me_payables (
                    id VARCHAR(255) PRIMARY KEY,
                    value DOUBLE(10,2) NOT NULL,
                    status VARCHAR(255) NOT NULL,
                    payment_date VARCHAR(255) NOT NULL,
                    transaction_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY (transaction_id) REFERENCES pagar.me_transactions(id)
                );
            `)

            console.log('Tables created')
        } catch (error) {
            console.log(error)
        } finally {
            BaseDatabase.connection.destroy()
        }
    }
}

new Migrations().main()