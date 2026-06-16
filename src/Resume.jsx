import * as React from 'react';
import { motion } from 'framer-motion';
import ContextBox from "./utility/context-box.jsx";

/**
 * Modern Skill Badge with hover effects and subtle styling
 */
const SkillBadge = ({ name }) => (
  <motion.span
    whileHover={{ 
      scale: 1.06, 
      y: -2, 
      borderColor: "rgba(168, 85, 247, 0.45)", 
      backgroundColor: "rgba(168, 85, 247, 0.1)", 
      boxShadow: "0 4px 15px rgba(168, 85, 247, 0.15)" 
    }}
    transition={{ type: "spring", stiffness: 300, damping: 18 }}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="px-3 py-1.5 rounded-lg bg-secondary-bg/40 border border-card-border text-gray-text text-sm hover:text-bright-text transition-colors duration-300 cursor-default"
  >
    {name}
  </motion.span>
);

/**
 * Timeline icon for individual resume items
 */
const TimelineIcon = ({ icon }) => (
  <div className="absolute w-10 h-10 flex items-center justify-center -left-6 -translate-x-1/2 bg-primary-bg text-accent-secondary border border-card-border rounded-xl shadow-lg z-10 transition-all duration-300 group-hover:scale-110 group-hover:text-accent-primary group-hover:border-accent-primary/50 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]">
    <i className={icon || "fa-solid fa-circle-dot"}></i>
  </div>
);

/**
 * A modern container for resume sections (Education, Skills, etc.)
 */
const ResumeSection = ({ icon, title, children }) => (
  <ContextBox>
    <div className="flex flex-col w-full group">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 flex items-center justify-center bg-secondary-bg/60 border border-card-border rounded-2xl text-accent-secondary text-2xl shadow-[0_0_15px_rgba(99,102,241,0.08)] group-hover:border-accent-secondary/50 group-hover:text-accent-primary transition-all duration-300">
          <i className={icon}></i>
        </div>
        <h2 className="text-3xl font-bold text-bright-text heading-font tracking-tight">{title}</h2>
      </div>
      <div className="relative flex flex-col gap-4 ml-6">
        {/* Vertical Timeline Divider */}
        <div className="absolute left-0 top-0 bottom-4 w-[2px] bg-linear-to-b from-accent-secondary/40 via-secondary-bg/50 to-transparent -translate-x-6" />
        {children}
      </div>
    </div>
  </ContextBox>
);

/**
 * Individual entry in the resume (Work/Education)
 */
const ResumeItem = ({ title, subtitle, date, description, icon, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="relative pb-10 last:pb-2 group pl-6 -ml-6 pr-4 rounded-2xl border border-transparent hover:border-card-border/10 hover:bg-secondary-bg/10 transition-all duration-300"
  >
    <TimelineIcon icon={icon} />
    <div className="flex flex-col gap-2 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mt-1">
        <h3 className="text-xl font-bold text-bright-text hover:text-accent-secondary transition-colors duration-300">{title}</h3>
        <span className="text-[10px] font-bold uppercase tracking-wider text-accent-secondary bg-accent-secondary/10 border border-accent-secondary/35 px-3 py-1 rounded-full w-fit shadow-[0_0_10px_rgba(99,102,241,0.1)]">
          {date}
        </span>
      </div>
      {subtitle && <p className="text-gray-text/90 font-medium text-sm">{subtitle}</p>}
      {description && <p className="text-gray-text text-sm leading-relaxed max-w-2xl font-light">{description}</p>}
      {children}
    </div>
  </motion.div>
);

const Resume = () => {
  const education = [
    {
      icon: "fa-solid fa-graduation-cap",
      title: "B.Tech in Information Technology",
      subtitle: "Sri Krishna College of Engineering and Technology, Coimbatore",
      date: "2023 — 2027",
      description: "Focusing on software engineering, data structures, and advanced computing. Maintaining a strong academic record.",
      extra: "CGPA: 8.29"
    },
    {
      icon: "fa-solid fa-school",
      title: "Senior Secondary (Class XII), CBSE",
      subtitle: "Everest KenBridge Senior Secondary School, Mayiladuthurai",
      date: "2022 — 2023",
      description: "Completed secondary education with Excellence in Mathematics and Computer Science.",
      extra: "Percentage: 95%"
    },
    {
      icon: "fa-solid fa-building-columns",
      title: "Secondary (Class X), CBSE",
      subtitle: "Everest KenBridge Senior Secondary School, Mayiladuthurai",
      date: "2020 — 2021",
      description: "Foundational education with consistently high performance across all subjects.",
      extra: "Percentage: 95%"
    },
  ];

  const technicalSkills = [
    {
      icon: "fa-solid fa-code",
      title: "Languages",
      skills: ["C++", "Python", "Java", "Kotlin", "HTML5", "CSS3", "JavaScript (ES6+)"]
    },
    {
      icon: "fa-solid fa-layer-group",
      title: "Frameworks & Libraries",
      skills: ["React.js", "Spring Boot", "Tailwind CSS", "Tensorflow", "Keras", "OpenCV", "Framer Motion"]
    },
    {
      icon: "fa-solid fa-server",
      title: "Infrastructure & Tools",
      skills: ["MySQL", "MongoDB", "Git", "Docker", "Vite", "Firebase", "Postman"]
    },
  ];

  const achievements = [
    {
      icon: "fa-solid fa-trophy",
      title: "Competitive Programming",
      date: "Ongoing",
      description: "Actively solving complex algorithmic challenges. Successfully solved over 1000+ problems on Leetcode, ranking in the top percentiles."
    },
    {
      icon: "fa-solid fa-diagram-project",
      title: "Portfolio Development",
      date: "2023 — Present",
      description: "Developed and deployed 20+ diverse projects ranging from web applications and AI models to cross-platform mobile apps."
    },
  ];

  return (
    <div className="flex flex-col gap-10 min-w-[min(600px, 100vw)] w-full blur-fade-in origin-top">
      {/* Education Section */}
      <ResumeSection icon="fa-solid fa-book-open" title="Education">
        {education.map((item, index) => (
          <ResumeItem
            key={index}
            {...item}
            delay={index * 0.1}
          >
            {item.extra && (
              <div className="mt-2 flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent-secondary" />
                <span className="text-bright-text font-bold text-sm">{item.extra}</span>
              </div>
            )}
          </ResumeItem>
        ))}
      </ResumeSection>

      {/* Technical Skills Section */}
      <ResumeSection icon="fa-solid fa-gears" title="Technical Skills">
        <div className="flex flex-col gap-8">
          {technicalSkills.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <i className={`${category.icon} text-accent-secondary text-xs`}></i>
                <h4 className="text-xs font-bold text-gray-text uppercase tracking-widest">{category.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </ResumeSection>

      {/* Achievements Section */}
      <ResumeSection icon="fa-solid fa-award" title="Achievements">
        {achievements.map((item, index) => (
          <ResumeItem
            key={index}
            {...item}
            delay={index * 0.1}
          />
        ))}
      </ResumeSection>
    </div>
  );
};

export default Resume;
