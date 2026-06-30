import ContextBox from "./utility/context-box.jsx";
import ShinyText from "./components/ShinyText.jsx";
import Branding from "./Branding.jsx";

const AboutMe = () => {
  return (
    <div className={"flex flex-col gap-8 min-w-[min(600px, 100vw)] blur-fade-in origin-top"}>
      <Branding />
      <ContextBox>
        <div className="flex items-center gap-5 group mb-6">
          <div
            className="flex items-center justify-center w-14 h-14 text-accent-secondary text-2xl rounded-2xl bg-secondary-bg/50 border border-card-border transition-all duration-300 group-hover:scale-105 group-hover:border-accent-primary/50">
            <i className="fa-regular fa-address-card"></i>
          </div>
          <div>
            <h2 className="text-bright-text text-4xl font-bold tracking-tight heading-font">About Me</h2>
            <div className="h-1 w-0 group-hover:w-full bg-accent-primary transition-all duration-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
          {/* Bio text */}
          <div className="md:col-span-7 flex flex-col gap-5 text-left">
            <p className="text-gray-text leading-relaxed text-base md:text-lg font-light">
              Hey there! I'm <ShinyText text="Kowshik Baskaran" />, a curious and passionate Information Technology student who's always chasing that next line of code and the thrill of building something impactful.
            </p>
            <p className="text-gray-text leading-relaxed text-base md:text-lg font-light">
              Currently in my third year of B.Tech IT, I spend my days diving deep into <span className="text-accent-secondary font-medium">Data Structures & Algorithms</span>, exploring the vast world of AI and Machine Learning, and crafting projects with ReactJS, Kotlin, and Spring Boot.
            </p>
            <p className="text-gray-text leading-relaxed text-base md:text-lg font-light">
              Beyond code, I'm passionate about anime and gaming. In my free time, you'll often find me in the worlds of <span className="text-accent-primary font-medium">Genshin Impact</span> or Minecraft.
            </p>
          </div>

          {/* Interactive macOS code window */}
          <div className="md:col-span-5 w-full flex justify-center">
            <div className="w-full max-w-[340px] rounded-xl shadow-2xl overflow-hidden font-mono text-xs text-left dev-profile-window">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 dev-profile-window-header">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="text-gray-text text-[10px] opacity-80">developer.json</span>
                <span className="w-10" />
              </div>
              {/* Code Content */}
              <div className="p-4 leading-relaxed overflow-x-auto text-[11px] syntax-default">
                <div>
                  <span className="syntax-punctuation">{`{`}</span>
                </div>
                <div className="pl-4">
                  <span className="syntax-key">"name"</span>: <span className="syntax-string">"Kowshik Baskaran"</span>,
                </div>
                <div className="pl-4">
                  <span className="syntax-key">"role"</span>: <span className="syntax-string">"Full Stack Developer"</span>,
                </div>
                <div className="pl-4">
                  <span className="syntax-key">"education"</span>: <span className="syntax-string">"B.Tech IT (3rd Year)"</span>,
                </div>
                <div className="pl-4">
                  <span className="syntax-key">"solvedProblems"</span>: <span className="syntax-number">1000</span>,
                </div>
                <div className="pl-4">
                  <span className="syntax-key">"interests"</span>: <span className="syntax-punctuation">{`[`}</span>
                  <span className="syntax-string">"Coding"</span>, <span className="syntax-string">"Anime"</span>, <span className="syntax-string">"Gaming"</span>
                  <span className="syntax-punctuation">{`]`}</span>
                </div>
                <div>
                  <span className="syntax-punctuation">{`}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContextBox>

      <ContextBox>
        <div className="flex items-center gap-5 group mb-8">
          <div
            /* Simplified shadow and removed rotate for GPU performance */
            className="flex items-center justify-center w-14 h-14 text-accent-secondary text-2xl rounded-2xl bg-secondary-bg/50 border border-card-border transition-all duration-300 group-hover:scale-105 group-hover:border-accent-primary/50">
            <i className="fa-solid fa-code-branch"></i>
          </div>
          <div>
            <h2 className="text-bright-text text-4xl font-bold tracking-tight heading-font">Tech Stack</h2>
            <div className="h-1 w-0 group-hover:w-full bg-accent-secondary transition-all duration-500 rounded-full"></div>
          </div>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4"
        >
          {[
            { icon: "fa-brands fa-java", label: "Java", color: "#f89820" },
            { icon: "fa-solid fa-leaf", label: "Spring Boot", color: "#6db33f" },
            { icon: "fa-solid fa-mountain-sun", label: "Kotlin", color: "#7f52ff" },
            { icon: "fa-brands fa-python", label: "Python", color: "#3776ab" },
            { icon: "fa-solid fa-brain", label: "Tensorflow", color: "#ff6f00" },
            { icon: "fa-solid fa-code-branch", label: "VCS", color: "#f05032" },
            { icon: "fa-brands fa-react", label: "ReactJS", color: "#61dafb" },
            { icon: "fa-solid fa-database", label: "MongoDB", color: "#47a248" },
            { icon: "fa-solid fa-wind", label: "Tailwind CSS", color: "#06b6d4" },
          ].map(({ icon, label, color }) => (
            <div
              key={label}
              className="group relative cursor-default p-4 flex flex-col items-center justify-center gap-3 rounded-2xl bg-secondary-bg/20 border border-card-border/40 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[var(--hover-color)]/60 hover:bg-[var(--hover-color)]/10 hover:[box-shadow:0_10px_30px_-10px_var(--hover-shadow-color)]"
              style={{
                '--hover-color': color,
                '--hover-shadow-color': `${color}40`,
              }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110"
                style={{ color: color }}
              >
                <i className={icon}></i>
              </div>
              <p className="text-sm font-medium text-gray-text group-hover:text-bright-text transition-colors duration-300">{label}</p>
            </div>
          ))}
        </div>
      </ContextBox>
    </div>
  );
};

export default AboutMe;