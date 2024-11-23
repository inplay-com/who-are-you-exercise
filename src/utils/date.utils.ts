export const getDateKey = (date:Date|null = null): string => {
    const day = date ? date : new Date()
    day.setHours(0)
    day.setMinutes(0)
    day.setSeconds(0)
    return `player-of-the-day-${day.toISOString().split('T')[0]}`
}

const getYesterday = () =>{
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday
}

const getPreviusDays = (day:number,date:Date) =>{
    const selected = date;
    selected.setDate(selected.getDate() - day);
    return selected
}

const getNextDays = (day:number,date:Date) =>{
    const selected = date;
    selected.setDate(selected.getDate() + day);
    return selected
}