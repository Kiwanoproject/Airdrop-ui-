const express = require("express");
const router = express.Router();
const Mail = require("../models/mail");
const Participant = require("../models/participant");
const Pass = require("../models/pass");



// ROUTES
router.get("/", async(req, res) => {
  const title = "The Kiwano Project - Fostering Crypto Usability";
  const description ="The Kiwano project is a project centred around a learning platform that aims to foster the adoption of cryptocurrencies and blockchain technology.";
  res.render("home", {title, description});
});
router.post("/", async(req, res) => {
  // const checkMail = await Mail.findOne({ email: req.body.email });
  // if (checkMail != null) {
  //   req.flash('success_msg','You joined Already!');
  //   res.redirect("/");
  // } else {
  //   const mail = new Mail({ email: req.body.email })
  //   .save()
  //   .then(() => {
  //       req.flash('success_msg','You Joined Successfully!');
  //       res.redirect("/");
  //       })
  // .catch((err) => {
  //       res.redirect("/");
  //       }); 
  // };

  res.redirect("/");
});
router.get("/branding", (req, res) => {
  const title = "The Kiwano Project - Branding";
  const description ="Download the Kiwano project's official logos and mockup kit.";
  res.render("branding", {title, description});
});
router.get("/details", async(req, res) => {
  const title = "The Kiwano Project - Airdrop";
  const description ="The Kiwano project official airdrop page. The kiwano airdrop program is live.";
  const wallet = req.query; 
  const ref = await Pass.findOne(wallet).lean();
  if (ref == null) {
    const refNum = '';
    const mywallet = "NONE";
    const balance = 0;
    res.render("details", { refNum, mywallet, balance, description, title});
  } else {
    const refNum = await Pass.find({ referre: ref.referral }).lean();
    if (Object.entries(wallet).length === 0) {
      const mywallet = "NONE";
      const refNum = '';
      const balance = 0;
      res.render("details", { refNum, mywallet, balance, title, description });
    } else {
      const detail = await Pass.findOne(wallet).lean();
      const mywallet = detail.wallet;
      const balance = 10;
      res.render("details", {
        detail,
        refNum,
        mywallet,
        balance,
        title,
        description,
      });
    }
  }
});
router.get("/buy", (req, res) => {
  const title = "The Kiwano Project - Buy Kiwano Tokens Here";
  const description ="You can now buy kiwano(wano) tokens via our official website. Buy now!";
  res.render("buy", {title, description});
});
router.get("/token", (req, res) => {
  const title = "The Kiwano Project - Tokenomics";
  const description ="The Kiwano project is a project centred around a learning platform that aims to foster the adoption of cryptocurrencies and blockchain technology.";
  res.render("token", {title, description});
});
module.exports = router;
