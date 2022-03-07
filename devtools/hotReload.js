const xhr = new XMLHttpRequest();

let url = window.location.toString();
setInterval(() =>{
    xhr.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            let lastReload = parseInt(xhr.responseText);
            let time =  Math.round((new Date()).getTime() / 1000).toString();
            if (this.readyState == 4 && this.status == 200) {
                if(time > lastReload - 3 && time < lastReload + 3) {
                    location.reload();
                }
            }
        }
    }
    xhr.open("GET", "http://localhost:3000");
    xhr.send();
}, 2000);