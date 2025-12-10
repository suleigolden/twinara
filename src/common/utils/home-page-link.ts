import { User } from "@suleigolden/the-last-spelling-bee-api-client";


export const homePageLink = (user: User) => {
    if(user.role === "system-admin") {
        return `/user/${user.id}/dashboard`;
    }else if(user.role === "character") {
        return `/character/${user.id}/dashboard`;
    }else{
        return `/`;
    }
};  
