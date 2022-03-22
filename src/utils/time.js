export function formatTime(time){
    
    var s = time+''
    var month1 = s.substring(5,6)
    if(month1==='0'){
        month1=''
    }
    var month2 = s.substring(6,7)


    var day1 = s.substring(8,9)
    if(day1==='0'){
        day1=''
    }
    var day2 = s.substring(9,10)



    var hour1 = s.substring(11,12)
    if(hour1==='0'){
        hour1=''
    }
    var hour2 = s.substring(12,13)



    
    return month1 + month2 + "月" + day1 + day2 + "日" + hour1 + hour2 +"时"
}