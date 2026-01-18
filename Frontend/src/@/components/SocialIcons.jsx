
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faLinkedin, faDiscord, faTelegram } from '@fortawesome/free-brands-svg-icons';
import './SocialIcons.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const SocialIcons = ({href,icon,color,name}) => {
    return (
        <div className="social-icons flex justify-center items-center m-8">
            
            <Link href={href} target="_blank" rel="noopener noreferrer" className="icon-wrapper">
                <FontAwesomeIcon icon={icon} className={`icon ${color} drop-shadow-2xl shadow-lg shadow-pink-500/50`} />
                <span className={`icon-text ${color}`}>{name}</span>
            </Link>
           
         </div>
    );
}

export default SocialIcons;