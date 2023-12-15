import { Roles } from "../../Middleware/AuthMiddleware.js"

export const EndPoint = {

    Create:[Roles.Admin],
    Update:[Roles.Admin],
    Delete:[Roles.Admin],
}