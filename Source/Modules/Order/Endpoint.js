import { Roles } from "../../Middleware/AuthMiddleware.js";

export const EndPoint = {
    Create:[Roles.User],
    Cancel:[Roles.User],
}