Array.prototype.shuffle = function () {
    var i = this.length;
    while (i) {
        var j = Math.floor(Math.random() * i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

function shuffleArray(n) {
    const array = Array.from({ length: n }, (_, index) => index); // 0 から N-1 までの整数の配列を生成
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 0 から i の間でランダムなインデックスを生成
        [array[i], array[j]] = [array[j], array[i]]; // 要素をランダムに入れ替える
    }
    return array;
}

Array.prototype.zip = function (...args) {
    const new_array = [];
    for (let i = 0; i < this.length; i++) {
        new_array.push([this[i], ...args.map(arg => arg[i])]);
    }
    return new_array;
}

// start experiment
function start_experiment() {
    // get user name
    // convert display
    Display();

    // read filepath
    var list = wav_dir + "sound.list";
    song_list = loadText(list);
    //console.log(song_list)
    console.log(song_list)
    //console.log(file_list);
    init();
}

function setLylic() {
    //console.log(scores.length)
    document.getElementById("page").textContent = (n + 1) + "/" + scores.length;
    /*document.getElementById("lylic").innerHTML = '歌詞:<br>'
    + '<object data="'
    + file_list[0]
    + 'lylic.txt'
    + '"type="text/plain"'
    + 'width="100%"'
    + 'height="7%">'
    + '</object>';*/
}

function loadText(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, false);
    xhr.send(null);
    // var list = xhr.responseText.split(/\r\n|\r|\n/);
    var list = xhr.responseText.split(/\r\n|\r|\n/).filter(function(line) {
        return line.trim() !== ""; // 空行を除外
    });
    return list;
}

// convert display
function Display() {
    document.getElementById("Display1").style.display = "none";
}

function evalCheck() {
    const c = 6 - scores[n];
    if ((c <= 0) || (c > eval.length)) {
        for (var i = 0; i < eval.length; i++) {
            eval[i].checked = false;
        }
    }
    else {
        eval[c - 1].checked = true;
    }
}

function setButton() {
    var finish_flag = 0;
    var next_flag = 0;
    if (n == (scores.length - 1)) {
        document.getElementById("prev").disabled = false;
        document.getElementById("next2").disabled = true;
        document.getElementById("finish").disabled = true;
        for (var i = 0; i < eval.length; i++) {
            if (eval[i].checked) {
                finish_flag += 1;
            }
            if (finish_flag >= 1) {
                document.getElementById("finish").disabled = false;
                break;
            }
        }
    }
    else {
        if (n == 0) {
            document.getElementById("prev").disabled = true;
        }
        else {
            document.getElementById("prev").disabled = false;
        }
        document.getElementById("next2").disabled = true;
        document.getElementById("finish").disabled = true;
        for (var i = 0; i < eval.length; i++) {
            //console.log(next_flag);
            if (eval[i].checked) {
                next_flag += 1;
            }
            if (next_flag >= 1) {
                document.getElementById("next2").disabled = false;
                break;
            }
            //console.log(next_flag);
        }
    }
}

function evaluation() {
    for (var i = 0; i < eval.length; i++) {
        if (eval[i].checked) {
            scores[n] = 5 - i;
        }
    }
    setButton();
}

function setAudio() {
    //console.log(n)
    //console.log(song_list)
    document.getElementById("Choral1").innerHTML = 'Voice:<br>'
        + '<audio src="'  + song_list[n] + '.wav'
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral2").innerHTML = 'Voice:<br>'
        + '<audio src="'  + song_list[n] + '.wav'
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral3").innerHTML = 'Voice:<br>'
        + '<audio src="'  + song_list[n] + '.wav'
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral4").innerHTML = 'Voice:<br>'
        + '<audio src="'  + song_list[n] + '.wav'
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral5").innerHTML = 'Voice:<br>'
        + '<audio src="'  + song_list[n] + '.wav'
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral6").innerHTML = 'Voice:<br>'
        + '<audio src="'  + song_list[n] + '.wav'
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral7").innerHTML = 'Voice:<br>'
        + '<audio src="'  + song_list[n] + '.wav'
        + '" controls preload="auto">'
        + '</audio>';
    document.getElementById("Choral8").innerHTML = 'Voice:<br>'
        + '<audio src="'  + song_list[n] + '.wav'
        + '" controls preload="auto">'
        + '</audio>';
}

function init() {
    n = 0;
    //setLylic();
    setAudio();
}

function exportCSV() {
    var csvData = "";
    for (var i = 0; i < song_list.length; i++) {
        csvData += song_list[i] + ","
            + scores[i] + "\r\n";
    }

    const link = document.createElement("a");
    document.body.appendChild(link);
    link.style = "display:none";
    const blob = new Blob([csvData], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    link.href = url;
    link.download = outfile;
    link.click();
    window.URL.revokeObjectURL(url);
    link.parentNode.removeChild(link);
}

function next() {
    n++;
    //setLylic();
    setAudio();
    evalCheck();
    setButton();
}

function prev() {
    n--;
    //setLylic();
    setAudio();
    evalCheck();
    setButton();
}

function finish() {
    exportCSV();
}


//------------設定---------------//
const wav_dir = "site_sound/";
document.onkeypress = invalid_enter();

//var natural;
var choral;
var lylic;
var outfile;
var song;
var file_list;
var song_list;
var scores;

// ローカルで行う場合はloadText()は動作しないため
var n = 0;
var eval = document.getElementsByName("eval");
