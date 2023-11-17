import { Roles } from "../../Middleware/AuthMiddleware.js";

export const Endpoint = {
    Create:[Roles.User],
    Remove:[Roles.User],
    Clear:[Roles.User],
    Get:[Roles.User],
}