import ContextBox from "./utility/context-box.jsx";

const Contact = () => {
  const contactDetails = [
    { icon: "fa-regular fa-envelope", label: "Email", value: "kowshi587@gmail.com", url: "mailto:kowshi587@gmail.com" },
    { icon: "fa-solid fa-mobile", label: "Phone", value: "8778987449", url: "tel:8778987449" },
    { icon: "fa-regular fa-calendar-days", label: "Birthday", value: "04 May 2006", url: null },
    { icon: "fa-solid fa-location-dot", label: "Location", value: "Tamil Nadu, India", url: null }
  ];

  const socialLinks = [
    { name: "GitHub", icon: "fa-brands fa-github", url: "https://github.com/LuckyBoy587", colorClass: "text-[#24292f] dark:text-[#f0f6fc] hover:border-[#24292f]/40 dark:hover:border-[#f0f6fc]/30" },
    { name: "LinkedIn", icon: "fa-brands fa-linkedin", url: "https://www.linkedin.com/in/kowshi587/", colorClass: "text-[#0077b5] hover:border-[#0077b5]/40" },
    { name: "Instagram", icon: "fa-brands fa-instagram", url: "https://www.instagram.com/luckyboy_587", colorClass: "text-[#e1306c] hover:border-[#e1306c]/40" },
    { name: "Twitter", icon: "fa-brands fa-x-twitter", url: "https://x.com/luckyboy_587", colorClass: "text-[#1da1f2] hover:border-[#1da1f2]/40" }
  ];

  return (
    <div className="flex flex-col gap-8 min-w-[min(600px, 100vw)] w-full blur-fade-in origin-top">
      <ContextBox>
        <div className="flex items-center gap-5 group mb-8">
          <div className="flex items-center justify-center w-14 h-14 text-accent-secondary text-2xl rounded-2xl bg-secondary-bg/50 border border-card-border transition-all duration-300 group-hover:scale-105 group-hover:border-accent-primary/50">
            <i className="fa-solid fa-address-book"></i>
          </div>
          <div>
            <h2 className="text-bright-text text-4xl font-bold tracking-tight heading-font">Contact</h2>
            <div className="h-1 w-0 group-hover:w-full bg-accent-primary transition-all duration-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details Column */}
          <div className="flex flex-col gap-4">
            {contactDetails.map(({ icon, label, value, url }) => {
              const content = (
                <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary-bg/20 border border-card-border/40 hover:border-accent-primary/30 hover:bg-secondary-bg/40 transition-all duration-300 group/item">
                  <div className="flex items-center justify-center w-11 h-11 text-accent-secondary text-lg bg-secondary-bg/40 border border-card-border/50 rounded-lg group-hover/item:text-accent-primary group-hover/item:scale-105 transition-all duration-300">
                    <i className={icon} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-text text-[10px] uppercase tracking-wider font-semibold opacity-70">{label}</p>
                    <p className="text-bright-text font-medium text-base truncate">{value}</p>
                  </div>
                </div>
              );

              return url ? (
                <a key={label} href={url} target="_blank" rel="noreferrer" className="block focus:outline-none">
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}
          </div>

          {/* Social Links Column */}
          <div className="flex flex-col justify-center gap-4">
            <p className="text-gray-text text-sm leading-relaxed mb-2 font-light">
              Feel free to reach out for collaborations, project inquiries, or just to chat about anime, gaming, or coding! You can also find me on these social platforms.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map(({ name, icon, url, colorClass }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center justify-center gap-3 p-4 rounded-xl bg-secondary-bg/20 border border-card-border/40 hover:bg-secondary-bg/40 transition-all duration-300 group/social ${colorClass}`}
                >
                  <i className={`${icon} text-xl transition-transform duration-300 group-hover/social:scale-110`} />
                  <span className="font-semibold text-sm text-bright-text">{name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </ContextBox>
    </div>
  );
};

export default Contact;
