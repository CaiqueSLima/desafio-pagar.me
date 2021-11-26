import app from "./app"
import { AddressInfo } from "net"
import dotenv from "dotenv"

dotenv.config()

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo
        console.log(`Server is running on port ${address.port}`)
    } else {
        console.error('Failure upon starting server.')
    }
})