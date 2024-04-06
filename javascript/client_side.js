const socket = io('http://localhost:8000/');

const user_name = prompt("Enter Your Name..! ( Max. 20 character. )"); // SIGN UP FOR NEW USER
// user_name = "PRAJWAL";
if ( user_name )    {
    socket.emit('new-user-joined', user_name);
}

var redceivedBox = [];

// FUNCTION TO START GAME
socket.on('start-game', () =>{
    document.getElementById("turn").innerText = "Click on any one box"  
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function checkBox(id){
    if (redceivedBox.includes(id)) {
        socket.emit('caught', id)
        document.getElementById("box-container").style.display = "None"  
        document.getElementById("sticker").src = "../images/loser.gif"  
        var audio = new Audio('../sound/loser.mp3');
        audio.play();
        document.getElementById("turn").innerText = ""  
        setTimeout(() => {
            location.reload();
        }, 15000);
    }else{
        if (redceivedBox){
            document.getElementById(redceivedBox).style.background = getRandomColor()
        }
        document.getElementById(id).style.background = getRandomColor()
        document.getElementById("turn").innerText = "Wait for player two response"  
        socket.emit('received-response', id)
    }
}

socket.on('your-turn', receivedBoxId =>{
    redceivedBox.push(receivedBoxId.receivedBoxId);
    document.getElementById("turn").innerText = "Click on any one box"  
});

socket.on('you-won', () =>{
    document.getElementById("box-container").style.display = "None"  
    document.getElementById("sticker").src = "../images/won.gif"  
    var audio = new Audio('../sound/won.mp3');
    audio.play();
    document.getElementById("turn").innerText = "Congratulation..! You won the game"  
    setTimeout(() => {
        location.reload();
    }, 10000);
});