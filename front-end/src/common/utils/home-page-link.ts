import { User } from "@suleigolden/the-last-spelling-bee-api-client";


export const homePageLink = (user: User) => {
    if(user.role === "system-admin") {
        return `/admin/${user.id}/dashboard`;
    }else if(user.role === "character") {
        return `/user/${user.id}/dashboard`;
    }else{
        return `/`;
    }
};  
