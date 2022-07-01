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

      const form = new FormData();
      form.append('login', 'Urgaz');
      form.append('password', 'Pq0Ho78U7ltOM6cvol6J');
      form.append('data', JSON.stringify([{"phone": req.body.data[0].phone, "text": req.body.data[0].text}]));
                           
      fetch('http://185.8.212.184/smsgateway/', {
          method: 'POST',
          body: form,
          headers: { 'Content-Type': 'application/x-www-form-encoded' }
      }).then(res => res.json())
      .then( async (json, err) => {
        if(err) {
          res.send(err)
        } else {
          const newSms = new Sms(json)
          await newSms.save()
          requestIdArr.push(newSms.request_id)

          console.log(requestIdArr)

          const form = new FormData();
          form.append('login', 'Urgaz');
          form.append('password', 'Pq0Ho78U7ltOM6cvol6J');
          form.append('data', JSON.stringify([{"request_id": requestIdArr}]));
  
          fetch('http://185.8.212.184/smsgateway/status', {
            method: 'POST',
            body: from,
            headers: { 'Content-Type': 'application/x-www-form-encoded' }
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
