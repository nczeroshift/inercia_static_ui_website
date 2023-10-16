function encodeQueryData(data) {
    const ret = [];
    for (let key of data.keys())
        ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(data.get(key)));
    return ret.join('&');
}

$(document).ready(function(){
    const initParams= new URLSearchParams(window.location.search);
    const defLang = initParams.has("lang")?initParams.get("lang").toLowerCase():"pt";

    $("select.lang").change(function(){
        let currentParams= new URLSearchParams(window.location.search);
        currentParams.set("lang",$(this).val());
        window.location.search = encodeQueryData(currentParams);
    }).val(defLang);

    let links = $("a");
    for (let i = 0; i < links.length; i++) {
        let link = $(links[i]);
        let params = new URLSearchParams(link.attr("href").substring(1));
        params.set("lang",defLang);
        let pArr =[];
        for (let key of params.keys()) {
            if(params.has(key) && params.get(key).trim().length>0)
                pArr.push(key + '=' + params.get(key));
            else
                pArr.push(key);
        }
        link.attr("href","/?" + pArr.join("&"));
    }
});