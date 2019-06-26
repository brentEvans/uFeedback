const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');


module.exports = app => {
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send(
            `<html>
            <body>
            <h1 style="margin: 10px auto; width: 265px;">Thanks for voting!</h1>
            <p style="margin: 0 auto; width: 310px">We appreciate your feedback! Have a nice day!</p>
            </body>
            </html>`
            );
    })

    app.post('/api/surveys/webhooks', (req, res) => {
        // use Path (matcher) from path-parser library to attempt to extract surveyId and choice from pathname object
        const p = new Path('/api/surveys/:surveyId/:choice');
        // map over all events in req.body array, pull unique events from URLs that contain both surveyId and choice variables
        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false  }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec()
            })
            .value(); // since I'm no longer storing the result of _.chain in a variable, .value() may not be necessary

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // sending an email !! 
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};

