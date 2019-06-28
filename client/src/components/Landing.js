import React from 'react';

const Landing = () => {

    return (
        <div className="Landing" >
            <h1>uFeedback</h1>
            <h5>Collect feedback from your users!</h5>
            <br />
            <div className="valign-wrapper">
                <div className="row">
                    <div className="col s8 offset-s2">
                        <div>
                            <h4>Get Started:</h4>
                            <ul className="Align-left">
                                <li className="Landing-li">Login with Google</li>
                                <li className="Landing-li">App requires users to maintain a credit balance:</li>
                                    <li className="Landing-nested-li">To purchase mock credits, use credit card <strong>4242-4242-4242-4242</strong> with any future expiration date along with any random CVC and email.</li>
                                
                                <li className="Landing-li">Click the red + icon at the bottom right to create a new survey.</li>
                                <li className="Landing-li">Fill out the survey form to email the survey to your desired email addresses.</li>
                                <li className="Landing-li">Recipients may respond to the survey with a Yes/No option in the email.</li>
                                <li className="Landing-li">Feedback is tracked on the user dashboard. Users can view customer feedback and details of all surveys they've created.</li>
                                    <li className="Landing-nested-li">For example, if a user sends a survey to 100 recipients and 60 recipients respond, the user can see the breakdown of these 60 responses.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
