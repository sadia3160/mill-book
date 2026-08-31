
const dateRange = ((day, month, year) => {
    day = Number(day);
    month = Number(month);
    year = Number(year);

    let start, end;
    //yyyy/mm/dd
    if(day===0 && month===0){ //get 1 whole year summary
        start = new Date(year, 0, 1); //january=0
        end = new Date(year+1, 0, 1); //last date is not included
    }
    else if(day===0 && month>0){ //specific month summary
        start = new Date(year, month-1, 1);
        end = new Date(year, month, 1);
    }
    else if(day>0 && month>0){
        start = new Date(year, month-1, day);
        end = new Date(year, month-1, day+1);
    }
    else{ //default
        start = new Date(year, 0, 1); //january=0
        end = new Date(year+1, 0, 1); //last date is not included
    }

    return {start, end};
});

export {dateRange};