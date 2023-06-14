const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const port = 8080;

//템플릿 엔진으로 햄들바 등록
app.engine("handlebars", handlebars.engine());
//웹 페이지 로드시 사용할 템플릿 엔진 설정
app.set("view engine", "handlebars");
//뷰 디렉터리를 views로 설정
app.set("views", __dirname + "/views"); //__dirname 이용해서 절대 경로로 이용

app.get("/", (req, res) => {
    //home.handlebars 파일에 매칭 시켜서 들어감
    res.render("home", { title: "안녕하세요", messages: "만나서 반갑~" });
});

app.listen(port, () => {
    console.log("🎃express api server");
});
