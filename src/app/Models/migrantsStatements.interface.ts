
export interface migrantsStatementsI {
    dataSISBEN: string;
    direction: string;
    mobile: string;
    locationId: number;
    statamentsDate: Date;
    validityDate: Date; 
}

export interface ResponseStatamentsI {
    isRegistered: boolean;
    errorMessage: string;
    migrantsStatements: migrantsStatementsI;
}

export interface formUpdateI {
    dataSISBEN: string;
    direction: string;
    mobile: string;
    locationId: number;
}