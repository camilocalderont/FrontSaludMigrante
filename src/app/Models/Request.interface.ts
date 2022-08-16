import { DatePipe } from "@angular/common";

export interface validationRequestI {
    docNum: string;
    surname: string;
    birthDate: string;
}

export interface ResponseI {
    isRegistered: boolean;
    errorMessage: string;
    migrantsStatementsFile: string;
}


