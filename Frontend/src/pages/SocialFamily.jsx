import React from "react";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faYoutube, faLinkedin, faTelegram,faGithub } from '@fortawesome/free-brands-svg-icons';
import SocialIcons from "../@/components/SocialIcons";



export default function SocialFamily() {
    const socialLinks = [
        {
            href: "https://www.youtube.com",
            icon: faYoutube,
            color: "youtube",
            name: "YouTube"
        },
        {
            href: "https://www.linkedin.com",
            icon: faLinkedin,
            color: "linkedin",
            name: "LinkedIn"
        },
        {
            href: "https://telegram.org",
            icon: faTelegram,
            color: "telegram",
            name: "Telegram"
        },
        {
            href:"https://github.com",
            icon:faGithub,
            color:"github",
            name:"Github"
        }
    ];
    
    return (
        <div className="bg-white grid justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center space-y-4">
        <h1 className="text-5xl font-bold text-cyan-500 text-center ">Welcome to Our Coding Family</h1>

<p className="text-zinc-400 text-center">Join a supportive community of passionate coders, where learning, collaboration, and innovation come together. Embark on your coding journey with us.</p>
</div>

        <div className="flex justify-center items-center place-items-center space-x-4">
            
           
                       
        </div>
        </div>
    );
}
