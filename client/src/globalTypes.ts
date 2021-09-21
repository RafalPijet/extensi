export const eighteenYears = 568079996000

export enum UserGender {
    undefined = '',
    female = 'female',
    male = "male",
}

export interface UserData {
    name: string;
    surname: string;
    birthDate: string;
    email: string;
    gender: UserGender;
}

export interface InfoModalData {
    isOpen: boolean;
    isError: boolean;
    title: string;
    content: {
        _id?: string;
        name?: string;
        surname?: string;
        birthDate?: string;
        email?: string;
        gender?: UserGender;
        errorContent?: string;
    }

}