
const Login = require("../models/login-model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../_helpers/send-email');
async function forgotPassword(user, origin) {
    console.log('origin', origin)
    const account = await Login.findOne({ username: user });
    // always return ok response to prevent email enumeration
    if (!account) return;

    // create reset token that expires after 24 hours
    account.resetToken = {
        token: randomTokenString(),
        expires: Date.now() + 24 * 60 * 60 * 1000
    };
    await account.save();

    // send email
    await sendPasswordResetEmail(account, origin);
}
function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}
async function sendPasswordResetEmail(account, origin) {
    let message;
    if (origin) {
        const resetUrl = `${origin}update-password?code=${account.resetToken.token}`;
        message = `<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                   <a href="${resetUrl}">${resetUrl}</a>`;
    } else {
        message = `<p>Please use the below token to reset your password with the <code>/account/reset-password</code> api route:</p>
                   <p><code>${account.resetToken.token}</code></p>`;
    }

    await sendEmail({
        from: "hieunguyenvan3032@gmail.com",
        to: account.username,
        subject: 'Sign-up Verification API - Reset Password',
        html: `<h4>Reset Password Email</h4>
               ${message}`
    });
}
module.exports = {
    forgotPassword
}