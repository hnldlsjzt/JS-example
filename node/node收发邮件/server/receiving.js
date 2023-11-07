/**
 * 收邮件，借助 imap 包
 */

const Imap = require('imap'), inspect = require('util').inspect;;
const { MailParser } = require('mailparser')
const fs = require('fs')
const path = require('path')
console.log('process.argv ', process.argv)
var argv1 = require('minimist')(process.argv.slice(2));
console.log(argv1);
const argv = process.argv;
// const user = argv[2];
// const password = argv[3];
// const [, , user, password] = argv
const {
    user,
    pass: password
} = argv1

if (!user || !password) {
    throw new Error('参数错误，user 和授权码不能为空')
}
const imap = new Imap({
    // 你自己的邮箱
    user,
    // 授权码，注意不要暴露了
    password,
    host: 'imap.qq.com',
    port: 993,
    tls: true
});




function openInbox(cb) {
    imap.openBox('INBOX', true, cb);
}

imap.once('ready', function () {
    openInbox(function (err, box) {
        if (err) throw err;
        // search 的参数我们写了两个：

        // ['SEEN'] 是查询已读的邮件。

        // ['SINCE', '某个日期'] 是查询从这个日期以来的邮件。
        imap.search([['SEEN'], ['SINCE', new Date('2023-10-10 19:00:00').toLocaleString()]], (err, results) => {
            if (!err) {
                handleResults(results);
                console.log('results: ', results);
            } else {
                throw err;
            }
        });
    });
});
function handleResults(results) {
    // bodies 为 '' 是查询 header + body 的意思：
    imap.fetch(results, {
        bodies: '',
    }).on('message', (msg) => {
        const mailparser = new MailParser();
        msg.on('body', (stream) => {
            const info = {}
            stream.pipe(mailparser);
            mailparser.on('headers', (headers) => {
                console.log('headers: ', headers);
                info.theme = headers.get('subject');
                info.form = headers.get('from').value[0].address;
                info.mailName = headers.get('from').value[0].name;
                info.to = headers.get('to').value[0].address;
                info.datatime = headers.get('date')?.toLocaleString();
                // console.log(info);

            })
            mailparser.on('data', (data) => {
                // console.log('data: ', data);
                // 下载后的文件，可以使用 ```npx http-sereve .``` 查看 html 文件
                if (data.type === 'text') {
                    info.html = data.html
                    info.text = data.text
                    // const filepath = path.join(params.path, 'mails', info.subject + '.html');
                    // fs.writeFileSync(filepath, info.html || info.text)
                    const filePath = path.join(__dirname, 'mails', info.theme + '.html');
                    console.log('filePath: ', filePath);
                    fs.writeFileSync(filePath, info.html || info.text)
                }
                if (data.type === 'attachment') {
                    const filepath = path.join(params.path, 'files', data.filename)
                    const ws = fs.WriteStream(filepath);
                    data.content.pipe(ws);
                }
            })
        })
    })
}
// imap.once('error', function (err) {
//     console.log(err);
// });

// imap.once('end', function () {
//     console.log('Connection ended');
// });

imap.connect();