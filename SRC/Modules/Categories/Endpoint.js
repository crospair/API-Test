const Roles = {Admin:'Admin' , User:'User'};

export const EndPoint = {

    Create:[Roles.Admin],
    GetAll:[Roles.Admin],
    GetActive:[Roles.User , Roles.Admin],
    Update:[Roles.Admin],
    GetSpecific:[Roles.User , Roles.Admin]
}