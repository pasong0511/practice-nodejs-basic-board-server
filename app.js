const express = require("express");
const mongodbConnection = require("./configs/mongodb-connection"); //몽고 DB 사용 임포트
const postService = require("./services/post-service");
const handlebars = require("express-handlebars");
const POSRT = 8080;

const app = express();

//req.body와 POST 요청을 해석하기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//템플릿 엔진으로 햄들바 등록
app.engine(
    "handlebars",
    handlebars.create({
        helpers: require("./configs/handlebars-helpers"),
    }).engine
);

//웹 페이지 로드시 사용할 템플릿 엔진 설정
app.set("view engine", "handlebars");
//뷰 디렉터리를 views로 설정
app.set("views", __dirname + "/views"); //__dirname 이용해서 절대 경로로 이용

app.get("/", (req, res) => {
    //home.handlebars 파일에 매칭 시켜서 들어감
    res.render("home", { title: "테스트 게시판", messages: "만나서 반갑~" });
});

//------------ 쓰기 페이지 이동 -------------
app.get("/write", (req, res) => {
    res.render("write", { title: "테스트 게시판" });
});

app.post("/write", async (req, res) => {
    const post = req.body;
    const result = await postService.writePost(collection, post);

    console.log("write 전송 데이터", post);
    console.log("write 전송 결과", result);

    //생성된 도큐먼트의 _id를 이용해서 상세페이지 이동
    res.redirect(`/detail/${result.insertedId}`);
});

app.get("/detail/:id", async (req, res) => {
    res.render("detail", {
        title: "테스트 게시판",
        post: "",
    });
});

let collection;
app.listen(POSRT, async () => {
    console.log("서버 실행합니다....🌭🍟🌭🍟");
    const mongidbClient = await mongodbConnection();
    collection = mongidbClient.db().collection("post"); //post라는 컬렉션 선택
    console.log("몽고디비 연결.....🍿🍔🍿🍔");
});
