export default interface IMessage {
    id : number;
    message : string;
    title?: string;
    startDate?: Date;
    endDate?: Date;
    active: boolean;
    emergencyType: string;
    country: string;
}