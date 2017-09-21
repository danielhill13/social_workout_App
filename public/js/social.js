// function setTime(str){
//         var hours = parseInt(str.toString().substr(0,2))
//         var mins = str.toString().substr(3, 2);
//                 if (hours > 12){
//                 var time = (hours-12) + ':' + mins + 'PM';
//                 } else if (hours < 10) {
//                         hours = hours.toString(). substr(0,1);
//                 var time = hours + ':' + mins + 'AM'
//                 } else {
//                 var time = hours + ':' + mins + 'AM';
//         }
//         return time;
// }
// document.getElementById('starttime').innerHTML = setTime(document.getElementById("starttime").innerHTML);