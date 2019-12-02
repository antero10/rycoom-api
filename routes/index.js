var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.post('/email', async function(req, res, next) {
  try {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: req.body.to,
        from: 'test@test.com',
        subject: req.body.subject,
        html: `<p>Company: ${req.body.company}</p>`,
        attachments: req.body.attachments,
    };
    await sgMail.send(msg);
    res.status(200).send();
  } catch(e) {
    res.status(500).send();
  }
});

module.exports = router;
