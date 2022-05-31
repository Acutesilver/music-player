import service from "..";
export function getData(url) {
    //获取数据

    return service({
        method: 'get',
        url: url,
    })

}
