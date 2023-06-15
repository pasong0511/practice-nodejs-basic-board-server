//글쓰기 함수
async function writePost(collection, post) {
    //생성일시와 조회수 추가
    post.hits = 0;
    post.createDt = new Date().toISOString(); //날짜는 ISO 포맷으로 저장
    return await collection.insertOne(post); //몽고디비에 post 저장 후 반환
}

//require()로 파일 임포트 시 외부 노출
module.exports = {
    writePost,
};
