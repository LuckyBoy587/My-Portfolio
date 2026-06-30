import * as React from 'react';
import { motion } from 'framer-motion';
import ContextBox from "./utility/context-box.jsx";
import { cn } from "@/lib/utils";

// Skills details mapping (brand colors & FontAwesome icons)
const getSkillInfo = (name) => {
  const skillsMap = {
    // Languages
    "C++": { icon: "fa-solid fa-code", color: "#00599C" },
    "Python": { icon: "fa-brands fa-python", color: "#3776AB" },
    "Java": { icon: "fa-brands fa-java", color: "#F89820" },
    "Kotlin": { icon: "fa-solid fa-mountain-sun", color: "#7F52FF" },
    "HTML5": { icon: "fa-brands fa-html5", color: "#E34F26" },
    "CSS3": { icon: "fa-brands fa-css3-alt", color: "#1572B6" },
    "JavaScript (ES6+)": { icon: "fa-brands fa-js", color: "#F7DF1E" },

    // Frameworks & Libraries
    "React.js": { icon: "fa-brands fa-react", color: "#61DAFB" },
    "Spring Boot": { icon: "fa-solid fa-leaf", color: "#6DB33F" },
    "Tailwind CSS": { icon: "fa-solid fa-wind", color: "#38B2AC" },
    "Tensorflow": { icon: "fa-solid fa-brain", color: "#FF6F00" },
    "Keras": { icon: "fa-solid fa-gears", color: "#D00000" },
    "OpenCV": { icon: "fa-solid fa-eye", color: "#5C3EE8" },
    "Framer Motion": { icon: "fa-solid fa-wand-magic-sparkles", color: "#F024B6" },

    // Infrastructure & Tools
    "MySQL": { icon: "fa-solid fa-database", color: "#4479A1" },
    "MongoDB": { icon: "fa-solid fa-database", color: "#47A248" },
    "Git": { icon: "fa-brands fa-git-alt", color: "#F05032" },
    "Docker": { icon: "fa-brands fa-docker", color: "#2496ED" },
    "Vite": { icon: "fa-solid fa-bolt", color: "#646CFF" },
    "Firebase": { icon: "fa-solid fa-fire", color: "#FFCA28" },
    "Postman": { icon: "fa-solid fa-paper-plane", color: "#FF6C37" }
  };
  return skillsMap[name] || { icon: "fa-solid fa-circle-nodes", color: "#a855f7" };
};

const SkillBadge = ({ name, icon, brandColor }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
        y: -2,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--secondary-bg-30)] border border-card-border/40 text-gray-text text-sm font-semibold hover:text-bright-text transition-all duration-300 cursor-default overflow-hidden group"
      style={isHovered ? {
        borderColor: `${brandColor}50`,
        backgroundColor: `${brandColor}08`,
        boxShadow: `0 4px 15px -2px ${brandColor}25`
      } : {}}
    >
      <i
        className={cn(icon, "text-xs sm:text-sm transition-colors duration-300")}
        style={isHovered ? { color: brandColor } : { color: 'var(--accent-secondary)' }}
      />
      <span className="font-mono text-xs sm:text-sm">{name}</span>
    </motion.span>
  );
};

const TimelineItem = ({ title, subtitle, date, description, extra, icon, delay }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative pl-8 pb-10 last:pb-2 group text-left"
    >
      {/* Timeline Line Connector */}
      <div className="absolute left-[9px] top-4 bottom-0 w-[2px] bg-linear-to-b from-card-border/60 via-card-border/10 to-transparent group-last:hidden" />

      {/* Pulsing Node */}
      <div className="absolute left-0 top-2 w-5 h-5 flex items-center justify-center">
        <div className={cn(
          "w-3 h-3 rounded-full bg-primary-bg border-2 transition-all duration-300 z-10",
          isHovered
            ? "border-accent-primary scale-125 shadow-[0_0_10px_#a855f7]"
            : "border-accent-secondary"
        )} />
        {isHovered && (
          <span className="absolute w-5 h-5 rounded-full bg-accent-primary/25 animate-ping z-0" />
        )}
      </div>

      {/* Content Box */}
      <div className={cn(
        "p-6 rounded-2xl border bg-[var(--secondary-bg-10)] transition-all duration-300",
        isHovered
          ? "border-accent-primary/30 bg-secondary-bg/25 shadow-[0_4px_20px_rgba(168,85,247,0.06)] translate-x-1"
          : "border-card-border/30"
      )}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-secondary bg-accent-secondary/15 border border-accent-secondary/25 px-3 py-1 rounded-full w-fit">
            {date}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-gray-text/60">
            <i className={cn(icon, "text-accent-primary text-xs")}></i>
            <span className="font-mono text-xs tracking-wider uppercase opacity-80">SYS_NODE</span>
          </div>
        </div>

        <h3 className={cn(
          "text-xl font-bold transition-colors duration-300 heading-font",
          isHovered ? "text-accent-primary" : "text-bright-text"
        )}>
          {title}
        </h3>
        <p className="text-gray-text text-sm font-semibold mt-1 mb-3">{subtitle}</p>
        <p className="text-gray-text/85 text-sm leading-relaxed font-light mb-4">{description}</p>

        {extra && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--dev-profile-header-bg)] border border-card-border/10 rounded-lg max-w-fit font-mono text-xs">
            <span className="text-accent-secondary font-bold">RETURN_CODE</span>
            <span className="text-gray-text/50">=</span>
            <span className="text-bright-text font-bold">{extra}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const AchievementCard = ({ title, date, description, icon, command, outputLines, delay }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "p-6 rounded-2xl border bg-secondary-bg/15 text-left transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group",
        isHovered
          ? "border-accent-secondary/40 bg-secondary-bg/25 shadow-[0_4px_25px_rgba(99,102,241,0.06)] -translate-y-1"
          : "border-card-border/30"
      )}
    >
      <div className="absolute right-0 top-0 w-24 h-24 bg-accent-secondary/5 rounded-full blur-2xl pointer-events-none group-hover:bg-accent-primary/10 transition-all duration-500" />

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 flex items-center justify-center rounded-xl bg-secondary-bg/50 border border-card-border/30 text-lg transition-all duration-300",
            isHovered ? "text-accent-primary border-accent-primary/30 scale-105" : "text-accent-secondary"
          )}>
            <i className={icon}></i>
          </div>
          <div className="flex flex-col">
            <h4 className="text-base font-bold text-bright-text heading-font">{title}</h4>
            <span className="text-xs text-gray-text/70">{date}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-text text-sm leading-relaxed font-light">{description}</p>

      <div className="md:col-span-5 w-full flex justify-center">
        <div className="w-full max-w-[340px] rounded-xl shadow-2xl overflow-hidden font-mono text-xs text-left dev-profile-window">
          <div className='flex items-center justify-between px-4 py-2.5 dev-profile-window-header'>
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-gray-text text-[10px] opacity-80">console.sh</span>
            <span className="w-10" />
          </div>
          <div className="p-4">
            <div className="flex gap-1.5 text-accent-secondary text-xs">
              <span>$</span>
              <span className="text-bright-text">{command}</span>
            </div>
            {/*<div>*/}
            {/*  <span className="syntax-punctuation">{`{`}</span>*/}
            {/*</div>*/}
            {outputLines.map((pair, idx) => (
              <div key={idx} className="text-gray-text/80 pl-3 mt-0.5 text-xs">
                <div className="pl-4">
                  <span className="syntax-key">{pair.key}</span>: <span className="syntax-string">{pair.value}</span>
                </div>
              </div>
            ))}
            {/*<div>*/}
            {/*  <span className="syntax-punctuation">{`}`}</span>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillTerminal = ({ title, icon, skills, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col rounded-2xl border border-card-border/30 bg-[var(--secondary-bg-10)] overflow-hidden shadow-lg hover:border-card-border/50 transition-all duration-300"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-[var(--secondary-bg-30)] border-b border-card-border/20">
        <div className="flex items-center gap-2">
          <i className={cn(icon, "text-accent-secondary text-sm")}></i>
          <span className="text-xs font-bold text-gray-text uppercase tracking-widest font-mono">
            {title}
          </span>
        </div>
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white/5" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/15" />
        </div>
      </div>

      <div className="p-4 flex flex-wrap gap-2 text-left bg-[var(--primary-bg)] min-h-[140px] align-content-start">
        {skills.map((skill) => {
          const info = getSkillInfo(skill);
          return (
            <SkillBadge key={skill} name={skill} icon={info.icon} brandColor={info.color} />
          );
        })}
      </div>
    </motion.div>
  );
};

const Resume = () => {
  const [isCompiling, setIsCompiling] = React.useState(false);
  const [compileProgress, setCompileProgress] = React.useState(0);

  const handleCompileAndPrint = () => {
    setIsCompiling(true);
    setCompileProgress(0);

    const interval = setInterval(() => {
      setCompileProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompiling(false);
            window.print();
          }, 200);
          return 100;
        }
        return prev + 10;
      });
    }, 80);
  };

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
      description: "Actively solving complex algorithmic challenges. Successfully solved over 1000+ problems on Leetcode, ranking in the top percentiles.",
      command: "leetcode --user kowshikb --solved",
      outputLines: [
        { key: "Problems Solved", value: "1000+" },
        { key: "Rank", value: "Top Percentiles" },
        { key: "Specialization", value: "Graphs, Dynamic Programming, Trees" }
      ]
    },
    {
      icon: "fa-solid fa-diagram-project",
      title: "Portfolio Development",
      date: "2023 — Present",
      description: "Developed and deployed 20+ diverse projects ranging from web applications and AI models to cross-platform mobile apps.",
      command: "git status --porcelain",
      outputLines: [
        { key: "Total Projects", value: "20+ Active" },
        { key: "Deploy Status", value: "Build Successful" },
        { key: "Target", value: "Web, Android, AI Modules" }
      ]
    },
  ];

  return (
    <div className="flex flex-col gap-8 min-w-[min(600px, 100vw)] w-full blur-fade-in origin-top">
      {/* CV System Title & Compile Action */}
      <ContextBox level={1} className="p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-card-border/30 pb-6 mb-6 w-full text-left">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 flex items-center justify-center relative">
              <span className="absolute w-4 h-4 rounded-full bg-accent-primary/40 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent-primary" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-accent-secondary uppercase tracking-widest font-mono">
                System // Profile
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-bright-text tracking-tight heading-font">
                Curriculum Vitae
              </h2>
            </div>
          </div>

          <button
            onClick={handleCompileAndPrint}
            disabled={isCompiling}
            className={cn(
              "relative overflow-hidden flex items-center gap-3 px-5 py-2.5 rounded-xl border font-bold text-sm uppercase tracking-widest font-mono transition-all duration-300",
              isCompiling
                ? "bg-accent-primary/10 border-accent-primary/45 text-accent-primary cursor-wait"
                : "bg-secondary-bg/50 border-card-border hover:border-accent-primary/50 text-gray-text hover:text-bright-text hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] cursor-pointer"
            )}
          >
            {isCompiling ? (
              <>
                <i className="fa-solid fa-spinner animate-spin text-accent-primary"></i>
                <span>COMPILING {compileProgress}%</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-terminal text-accent-secondary"></i>
                <span>$ print --cv</span>
              </>
            )}
          </button>
        </div>

        {/* Profile mini status panel */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full text-left font-mono text-xs text-gray-text">
          <div className="flex flex-col gap-1">
            <span className="text-accent-secondary font-bold">LOC_COORDINATES</span>
            <span className="text-bright-text font-semibold">Coimbatore, IN</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-accent-secondary font-bold">DEPT_SPECIALIZATION</span>
            <span className="text-bright-text font-semibold">Information Tech</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-accent-secondary font-bold">CURRENT_FOCUS</span>
            <span className="text-bright-text font-semibold">CP & Full Stack Development</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-accent-secondary font-bold">COMPILER_STATUS</span>
            <span className="text-emerald-500 font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ONLINE_STABLE
            </span>
          </div>
        </div>
      </ContextBox>

      {/* 2-Column Grid for Education & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Left Side: Education Timeline */}
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          <ContextBox level={1} className="h-full">
            <div className="flex items-center gap-4 mb-8 text-left">
              <div className="w-11 h-11 flex items-center justify-center bg-secondary-bg/60 border border-card-border rounded-xl text-accent-secondary text-2xl transition-all duration-300">
                <i className="fa-solid fa-book-open"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-bright-text heading-font">Education</h3>
                <p className="text-xs font-mono text-gray-text/70 mt-0.5">cat ~/education.log</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {education.map((item, index) => (
                <TimelineItem
                  key={index}
                  {...item}
                  delay={index * 0.15}
                />
              ))}
            </div>
          </ContextBox>
        </div>

        {/* Right Side: Achievements */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full">
          <ContextBox level={1} className="h-full">
            <div className="flex items-center gap-4 mb-8 text-left">
              <div className="w-11 h-11 flex items-center justify-center bg-secondary-bg/60 border border-card-border rounded-xl text-accent-secondary text-2xl transition-all duration-300">
                <i className="fa-solid fa-award"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-bright-text heading-font">Achievements</h3>
                <p className="text-xs font-mono text-gray-text/70 mt-0.5">cat ~/achievements.cfg</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {achievements.map((item, index) => (
                <AchievementCard
                  key={index}
                  {...item}
                  delay={index * 0.15}
                />
              ))}
            </div>
          </ContextBox>
        </div>
      </div>

      {/* Row 2: Skills Arsenal */}
      <ContextBox level={1}>
        <div className="flex items-center gap-4 mb-8 text-left w-full">
          <div className="w-11 h-11 flex items-center justify-center bg-secondary-bg/60 border border-card-border rounded-xl text-accent-secondary text-2xl transition-all duration-300">
            <i className="fa-solid fa-gears"></i>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-bright-text heading-font">Technical Arsenal</h3>
            <p className="text-xs font-mono text-gray-text/70 mt-0.5">env | grep SYSTEM_SKILLS</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {technicalSkills.map((category, index) => (
            <SkillTerminal
              key={index}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              delay={index * 0.15}
            />
          ))}
        </div>
      </ContextBox>
    </div>
  );
};

export default Resume;
