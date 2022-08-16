
export interface migrantsStatementsI {
    dataSISBEN: string;
    direction: string;
    mobile: number;
    locationId: number;
    statamentsDate: Date;
    validityDate: Date;
    latitude: string;
    longitude: string;
}

export interface ResponseStatamentsI {
    isRegistered: boolean;
    errorMessage: string;
    migrantsStatements: migrantsStatementsI;
}

export interface formUpdateI {
    dataSISBEN: string;
    direction: string;
    mobile: number;
    locationId: number;
}