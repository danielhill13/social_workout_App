function setTime(str){
        var hours = str.toString().substr(0,2);
        hours = parseInt(hours);
        var mins = str.toString().substr(3, 2);
        mins = parseInt(mins);
        var time = (hours-12) +':' + mins + 'PM';
        return time;
}
// var afternoon = document.getElementById("starttime").innerHTML

document.getElementById('starttime').innerHTML = setTime(document.getElementById("starttime").innerHTML);
