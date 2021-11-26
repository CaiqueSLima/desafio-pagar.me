import { BaseDatabase } from "./BaseDatabase"

abstract class Migrations extends BaseDatabase {
    public static async main() {
        try {
            await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS pagar_me_transactions (
                    id VARCHAR(255) PRIMARY KEY,
                    value DOUBLE(10,2) NOT NULL,
                    description VARCHAR(255) NOT NULL,
                    payment_method VARCHAR(255) NOT NULL,
                    card_number INT NOT NULL,
                    card_owner VARCHAR(255) NOT NULL,
                    card_exp_date VARCHAR(255) NOT NULL,
                    card_CVV VARCHAR(255) NOT NULL
                );
            
            CREATE TABLE IF NOT EXISTS pagar_me_payables (
                    id VARCHAR(255) PRIMARY KEY,
                    value DOUBLE(10,2) NOT NULL,
                    status VARCHAR(255) NOT NULL,
                    payment_date DATE NOT NULL,
                    transaction_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY (transaction_id) REFERENCES pagar_me_transactions(id)
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

Migrations.main()