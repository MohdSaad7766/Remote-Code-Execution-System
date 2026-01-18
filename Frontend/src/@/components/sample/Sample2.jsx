import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import SocialFamily from '../../../pages/SocialFamily'
import { faYoutube, faLinkedin, faTelegram, faGithub } from '@fortawesome/free-brands-svg-icons';
import SocialIcons from '../SocialIcons'

export default function Sample2() {
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
      href: "https://github.com",
      icon: faGithub,
      color: "github",
      name: "Github"
    }
  ];

  return (
    <div className="relative isolate overflow-hidden flex bg-white py-16 sm:py-24 lg:py-32">
      <div className="flex-wrap h-full w-full justify-center items-center float-none">
<p className='text-black text-5xl text-center m-6'>Welcome to Our Coding Family</p>
        <p className='flex text-center text-black justify-center items-center text-l'>Join a supportive community of passionate coders, where learning, collaboration, and innovation <br></br> come together. Embark on your coding journey with us.</p>


        <div className="flex flex-wrap justify-center items-center mt-10">
        
        {socialLinks.map((link) => (
            <SocialIcons key={link.name} href={link.href} icon={link.icon} color={link.color} name={link.name} />
          ))}
  


         
        </div>
      </div>

      
    </div>
  )
}
