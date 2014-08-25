nomato.filter('toMin',function (){
    return function (sec){
        var m=Math.floor(sec/60);
        var s=sec%60;
        m=m<10?'0'+m:m;
        s=s<10?'0'+s:s;
        return m+':'+s;
    };
});