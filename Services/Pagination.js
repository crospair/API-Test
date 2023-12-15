export function Pagination(page,limit){
    if(page || page<=0){
        page = 1;
    }
    if(!limit || limit<=0){
        limit = 2;
    }
    const skip = (page - 1) * limit;
    return{skip,limit}
}