/*

0l_kE@@je\3PU_d

 *PPOST /api HTTP/1.1
Content-Type: application/json; charset=utf-8
User-Agent: Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)
Host: ewnt.schneidereit-trac.com
Connection: Keep-Alive
Accept-Encoding: gzip
Content-Length: 130

{"request":{"head":{"credentials":{"user":"api","pass":"wdfbjkh78326z3rejknfdeqcw89uz3r2adsjoi"},"requesttype":"authentication"}}}"" */



function getToken(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState != 4) return;

    if (this.status == 200) {
        console.log(this.responseText);
        var data = JSON.parse(this.responseText);
        console.log(data);
        // we get the returned data
    }

      // end of state change: it can be after some time (async)
  };
  xhr.open("POST", 'http://ewnt.schneidereit-trac.com/api', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({"request":{"head":{"credentials":{"user":"api","pass":"wdfbjkh78326z3rejknfdeqcw89uz3r2adsjoi"},"requesttype":"authentication"}}}));
}
