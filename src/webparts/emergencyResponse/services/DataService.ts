import IMessage from "../models/IMessage";
import { sp } from "sp-pnp-js";

export const GetEmergencyResponseMessages = async (city: string, maxMessage: number): Promise<IMessage[]> => {
    const data : IMessage[] = [];

    let filter = `Active eq 1 and ((EndDate eq null) or (EndDate gt '` + new Date().toISOString() + `')) `;
    
    // Fetch only GLOBAL if City is null 
    filter += city ?  `and ((City eq 'GLOBAL') or (City eq '` + city + `' ))` : `and City eq 'GLOBAL'`;


    const alerts = await sp.web.lists.getByTitle("EmergencyResponseList").items
                                    .select('Id', 'Title', 'Description', 'StartDate', 'EndDate', 'Active', 'EmergencyType', 'City')
                                    .filter(filter)
                                    .orderBy("Modified", false)
                                    .top(maxMessage)
                                    .get();

    alerts.forEach((alert) => {
        data.push({
            id: alert.Id,
            message: alert.Description,
            title: alert.Title,
            active: alert.Active,
            country: alert.Country,
            startDate: alert.StartDate, 
            endDate: alert.EndDate, 
            emergencyType: alert.EmergencyType
        });
    });

    return data;
};