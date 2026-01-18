import { motion } from "framer-motion";
import TeamMember from "./TeamMember";

const teamIncharge = [
  {
    img: "../img/shukla_sir.jpeg",
    name: "Diraj Shukla",
    prof: "Guide",
    url: "https://www.linkedin.com/in/diraj-shukla", // Replace if needed
  },
  {
    img: "../img/mahajan_sir.jpeg",
    name: "Vinod Mahajan",
    prof: "Incharge",
    url: "https://www.linkedin.com/in/vinod-mahajan",
  },
  {
    img: "../img/ashfaque_sir.jpeg",
    name: "Ashfaque Khan",
    prof: "Incharge",
    url: "https://www.linkedin.com/in/ashfaque-khan",
  },
];

const teamMembers = [
  {
    img: "../img/saad.jpg",
    name: "Ansari Mohd Saad",
    prof: "Back-End Developer",
    url: "https://www.linkedin.com/in/mohd-saad-ansari-02782b275/",
    desc: "Responsible for server-side development, database management, and ensuring smooth data flow.",
  },
  {
    img: "../img/vaibhav.jpg",
    name: "Vaibhav Patil",
    prof: "DSA Animation Expert",
    url: "https://www.linkedin.com/in/vaibhavpatil36/",
    desc: "Creates smooth, informative, and intuitive animations that make DSA topics easier to understand.",
  },
  {
    img: "../img/divya.jpg",
    name: "Divya Patil",
    prof: "Front-End Developer",
    url: "https://www.linkedin.com/in/divya-patil-69b93626b/",
    desc: "Crafts the user interface and experience, ensuring a seamless interaction with the platform.",
  },
  {
    img: "../img/tanuj.jpg",
    name: "Tanuj Patil",
    prof: "Back-End Developer",
    url: "https://www.linkedin.com/in/tanuj-patil-997593241/",
    desc: "Handles server-side logic, database management, and ensures smooth data flow between front-end and back-end.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function TeamSection() {
  return (
    <section id="our-team" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl text-white font-bold text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Incharge of the Team
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <TeamMember team={teamIncharge} />
        </motion.div>

        <motion.h2
          className="text-3xl mt-20 text-white font-bold text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Meet Our Team
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <TeamMember team={teamMembers} />
        </motion.div>
      </div>
    </section>
  );
}
