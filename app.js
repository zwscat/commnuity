var express = require('express')

var path = require('path')

var router = require('./router')

var bodyParser = require('body-parser')

var session = require('express-session')

var app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))

/*==== 配置解析表单POST请求体插件 需放在app.use(router)之前 ====*/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}))


/*挂载路由器到app中*/
app.use(router)

app.listen(3000, function () {
  console.log('start success running...')
})