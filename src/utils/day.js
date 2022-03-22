export function formatDay(day){
    
    if(day==1){
        return 'MON'
    }

    if(day==2){
        return 'TUE'
    }

    if(day==3){
        return 'WED'
    }

    if(day==4){
        return 'THU'
    }
    
    if(day==5){
        return 'FRI'
    }

    if(day==6){
        return 'SAT'
    }
    
    if(day==0){
        return 'SUN'
    }
}