var express = require('express')

var User = require('./models/user')

var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/', function (req, res) {
	res.render('index.html')
})

router.get('/login', function (req, res) {
	res.render('login.html')
})

router.post('/login', function (req, res) {
	/**/
})

router.get('/register', function (req, res) {
	res.render('register.html')
})

router.post('/register', function (req, res) {
	/*1、获取表单数据
	 *2、操作数据库
	 *	判断用户是否存在，不存在不能祖册
	 *3、发送响应
	*/
	var body = req.body
	User.findOne({ 
		$or: [
			{
				email: body.email
			},
			{
				nickname: body.nickname
			}
		]
	}, function (err, data) {
		if (err) {
			return res.status(500).send('Server Error')
		}

		if (data) {
			return res.status(200).json({
				err_code: 1,
				message: 'Email or Nickname aleary exists'
			})
		}
		/*==== 对密码两次加密 ====*/
		body.password = md5(md5(body.password))
		new User(body).save(function (err, user) {
			if (err) {
				return res.status(200).json({
					err_code: 500,
					message: 'Internal error'
				})
			}
		})

		res.status(200).json({
			err_code: 0,
			message: 'Ok'
		})
	})
})

/*解决嵌套过深，让代码更优美
router.post('/register', async function (req, res) {
	var body = req.body
	try{
		if (await User.findOne({ email: body.email })) {
			return res.status(200).json({
				err_code: 1,
				message: 'Email aleary exists'
			})
		}

		if (await User.findOne({ nickname: body.nickname })) {
			return res.status(200).json({
				err_code: 2,
				message: 'Nickname aleary exists'
			})
		}

		body.password = md5(md5(body.password))
		 
		await new User(body).save()

		res.status(200).json({
			err_code: 0,
			message: 'Ok'
		})
	}catch (err) {
		return res.status(200).json({
			err_code: 500,
			message: err.message
		})
	}
})*/

module.exports = router