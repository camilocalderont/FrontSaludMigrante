
export interface validationRequestI {
    docNum: string;
    surname: string;
    birthDate: Date;
}

export interface ResponseI {
    isRegistered: boolean;
    errorMessage: string;
    migrantsStatementsFile: string;
}


