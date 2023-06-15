const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const port = 8080;

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

app.get("/write", (req, res) => {
    res.render("write", { title: "테스트 게시판" });
});

app.get("/detail/:id", async (req, res) => {
    res.render("detail", {
        title: "테스트 게시판",
        post: "",
    });
});

app.listen(port, () => {
    console.log("🎃express api server");
});
