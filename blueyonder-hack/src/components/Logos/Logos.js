import React from "react"
import instagramlogo from "../components/social_instagram_icon.png"
import facebooklogo from "../components/social_facebook_icon.png"
import githublogo from "../components/social_github_icon.png"
import twitterlogo from "../components/social_twitter_icon.png"
const Logos = () => {
    return(
<div className="right-logos">
        <div>
        <ul>
            <li><img class="icon_instagram" src = {instagramlogo} alt="social_icon_instagram" /></li>
            <li><img class="icon_facebook"src={facebooklogo} alt="social_icon_facebook" /></li>
            <li><img class="icon_github"src={githublogo} alt="social_icon_github" /></li>
            <li><img class="icon_twitter"src={twitterlogo} alt="social_icon_twitter" /></li>
        </ul>
        </div>
        </div>
    );
}
export default Logos;