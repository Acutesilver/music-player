import service from "..";
// 获取歌单详情页数据
export function getMusicItemList(data) {
    return service({
        method: 'get',
        url: `/playlist/detail?id=${data}`
    })
}
//获取歌单歌曲
export function getItemList(id) {
    return service({
        method: 'get',
        url: `/playlist/track/all?id=${id}&offset=0`
    })
}
// 获取歌词
export function getSongLyric(id) {
    return service({
        method: 'get',
        url: `/lyric?id=${id}`
    })
}