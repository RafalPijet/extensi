import moment from 'moment';

export const calculateAge = (date: string) => {
    const today = moment();
    const birthDate = moment(date);
    const age = moment.duration(today.diff(birthDate))
    return age.years()
}