export interface validationRequestI {
    docNum: string;
    surname: string;
    birthDate: string;
    acceptPolicy:boolean;
}

export interface ResponseI {
    isRegistered: boolean;
    errorMessage: string;
    migrantsStatementsFile: string;
}


