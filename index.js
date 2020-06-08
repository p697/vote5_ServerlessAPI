const mysql = require('mysql')
const uuid = require('node-uuid')
const md5 = require('md5-node')
const getRawBody = require('raw-body')

module.exports.handler = function (req, resp, context) {
  getRawBody(req, function (err, data) {
    var body = JSON.parse(data)
    const answers = body.answers
    if (!answers) {
      return sendResponse(300, "参数错误")
    }
    saveDB(answers)
    
  })

  const saveDB = (answers) => {
    const db_config = {
      host: "rm-bp1xh78n7jgm1kks3io.mysql.rds.aliyuncs.com",
      user: "p697",
      password: "******",
      port: "3306",
      database: "vote5"
    }
    let connect = mysql.createConnection(db_config);
    //开始链接数据库
    connect.connect(function (err) {
      if (err) {
        sendResponse(301, `mysql连接失败: ${err}!`)
      } else {
        operateDB(connect, answers)
      }
    });
  }

  const operateDB = (connect, answers) => {
    let creatuuid = uuid.v1().split('-') + 'sp697'
    let id = md5(creatuuid)
    let time = new Date().getTime()
    let sex = answers["50001"]
    let edu = answers["50002"]
    let work = answers["50003"]
    let topic1 = answers["50401"]
    let topic2 = answers["50402"]
    let topic3 = answers["50403"]
    let topic4 = answers["50404"]
    let topic5 = answers["50405"]
    let topic6 = answers["50406"]
    let topic7 = answers["50407"]
    let topic8 = answers["50408"]
    let topic9 = answers["50409"]
    let topic10 = answers["50410"]
    let topic11 = answers["50411"]
    let topic12 = answers["50412"]
    let topic13 = answers["50413"]
    let topic14 = answers["50414"]
    let topic15 = answers["50415"]
    let topic16 = answers["50416"]
    let topic17 = answers["50417"]
    let topic18 = answers["50418"]
    let topic19 = answers["50419"]
    let topic20 = answers["50420"]
    let topic21 = answers["50421"]
    let topic22 = answers["50422"]
    let topic23 = answers["50423"]
    let topic24 = answers["50424"]

    let sqlQuery = `insert into votedata (id, ip, time, sex, edu, work, topic1, topic2, topic3, topic4, topic5, topic6, topic7, 
    topic8, topic9, topic10, topic11, topic12, topic13, topic14, topic15, topic16, topic17, topic18, topic19, topic20, topic21, 
    topic22, topic23, topic24) values (
      "${id}","${req.clientIP}","${time}",${sex},${edu},${work},${topic1},${topic2},${topic3},${topic4},${topic5},${topic6},${topic7},
      ${topic8},${topic9},${topic10},${topic11},${topic12},${topic13},${topic14},${topic15},${topic16},${topic17},${topic18},
      ${topic19},${topic20},${topic21},${topic22},${topic23},${topic24}) `;
    connect.query(sqlQuery, function (err, result) {
      if (err) {
        sendResponse(302, `SQL error: ${err}!`)
      } else {
        // 这里进行运算，更新分数
        // calculateScore(connect, result)
        sendResponse(200, result)
      }
    });
    // sendResponse(200, req.queries)
  }

  const sendResponse = (code, info) => {
    resp.setHeader('content-type', 'application/json');
    let reqInfo = {
      code: code,
      data: info
    }
    resp.send(JSON.stringify(reqInfo));
  }
}