import { sp } from 'sp-pnp-js';

/**
 * Get Info of current user
 * @returns {any}  Current Logged in User Object
 */
export const GetCurrentUser = async (): Promise<any> => {
    try {
        const response = await sp.web.currentUser.get();
        return response;
    } catch (e) {
        console.error("[UserService: Catch]: " + e);
    }
};

/**
 * Get Logged In user property
 * @param   {string}    PropName    Property Name that need to find
 * @returns {string}                Property Value
 */
export const GetLoggedInUserProperty = async (PropName: string): Promise<string> => {
    try {
        const currentUser = await GetCurrentUser();
        const response = await sp.profiles.getUserProfilePropertyFor(currentUser.LoginName, PropName);
        
        return response;
                           
    } catch (e) {
        console.error("[UserService: Catch]: " + e);
    }
};