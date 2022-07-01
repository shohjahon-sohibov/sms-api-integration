const fetch = require("node-fetch");
const Code = require("../models/Code");
const Sms = require("../models/Sms");

const verifyPhoneNumber = {
  POST: async (req, res) => {
    try {
      let code = Math.floor(Math.random() * 4);
      const newCode = new Code({ code: code });
      await newCode.save();
  
      let requestIdArr = [];
                                          
      fetch('http://185.8.212.184/smsgateway/', {
          method: 'POST',
          body: JSON.stringify({
            login: "Urgaz",
            password: "Pq0Ho78U7ltOM6cvol6J",
            data: [{"phone": req.body.data[0].phone, "text": req.body.data[0].text}]
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
    } catch (error) {
      console.log({ error: error.message });
    }
  }
};

const getPhones = async (_, res) => {
  try {
    res.json("ok");
  } catch (error) {
    console.log({ error: error.message });
  }
};

module.exports = {
  verifyPhoneNumber,
  getPhones,
};
