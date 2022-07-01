const fetch = import('node-fetch')
const Code = require('../models/Code')
const Sms = require('../models/Sms')

const verifyPhoneNumber = async (req, res) => {
  const isAdded = await User.findOne({ phone: req.body.phone });
  if (isAdded) {
    return res.status(403).send({
      message: 'This Phone already Added!',
    });
  } else {
    tokenForVerify(req.body);
    let code = Math.floor(Math.random() * 4)
    await Code.save(code)

  let requestIdArr = [];
  
  fetch('http://185.8.212.184/smsgateway/', {
      method: 'POST',
      body: JSON.stringify({
        login: "Urgaz",
        password: "Pq0Ho78U7ltOM6cvol6J",
        data: [{"phone": "8990090", "text": code}] 
      }),
      headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())
    .then( async (json, err) => {
      if(err) {
        res.send(err)
      } else {
        const newSms = new Sms(json)
        await newSms.save()
        requestIdArr.push(newSms.request_id)

        fetch('http://185.8.212.184/smsgateway/status', {
          method: 'POST',
          body: JSON.stringify({
            login: "Urgaz",
            password: "Pq0Ho78U7ltOM6cvol6J",
            data: [{request_id: requestIdArr}] 
          }),
          headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then( async (json, err) => {
            if(err) {
              res.send(err)
            } else {
              const newSms = new Sms(json)
              await newSms.updateOne()
            }
          });
      }
    });

    let smsCode = req?.params.code
    const isMath = await Code.findOne({ code: smsCode })
    if(!isMath) {
      res.send("Code is not correct")
    } else {
      res.send("Phone verified successfully")
      await Code.deleteOne({ code: smsCode })
    }
  }
};

const getPhones = async (req, res) => {
    try {
        res.json(await Sms.find())
    } catch (error) {
        console.log({ error: error.message })
    }
}

module.exports = {
    verifyPhoneNumber,
    getPhones
}