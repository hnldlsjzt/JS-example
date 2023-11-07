/**
 * 发邮件功能
 */
const nodemailer = require('nodemailer');
const fs = require('fs');
// const user = argv[2];
// const pass = argv[3];
// const to = argv[4];
const [, , user, pass, to] = argv
if (!user || !pass) {
    throw new Error('参数错误，user 和授权码不能为空')
}
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',// 对应的邮件服务器。邮件的文档中都会有
    port: 465,
    secure: true,
    auth: {
        // 你自己的邮箱
        user,
        // 授权码，注意不要暴露了
        pass
    }
});


async function main() {
    await transporter.sendMail({
        // 和 user 授权的邮箱必须相同
        from: user,
        to,
        subject: 'Hello',
        text: 'Hello world?',
        // 发送的邮件支持 HTML 和 css，不支持 js。如果要用 markdown 来写，那需要把 md 格式转为 html
        html: fs.readFileSync('./text.html', 'utf-8')
    })
    console.info('邮件发送成功');
}
main().catch(err => console.error('main-error', err));