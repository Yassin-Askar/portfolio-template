import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

import SectionDivider from '../ui/SectionDivider';

const Experience = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-12 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.experience.title}</h2>
          <SectionDivider />
        </motion.div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ltr:ml-5 before:rtl:mr-5 before:-translate-x-px md:before:ltr:ml-[8.75rem] md:before:rtl:mr-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {t.experience.items.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex items-start md:group"
            >
              {/* Timeline dot */}
              <div
                className="absolute ltr:left-0 rtl:right-0 md:ltr:left-[8.75rem] md:rtl:right-[8.75rem] w-3 h-3 bg-primary rounded-full mt-1.5 -ml-1.5 ring-4 ring-background"
                aria-hidden="true"
              />

              {/* Date (Desktop) */}
              <div className="hidden md:block w-32 pe-6 text-end text-sm text-muted-foreground pt-1">
                {exp.period}
              </div>

              {/* Content */}
              <div className="ltr:ml-10 rtl:mr-10 md:ltr:ml-10 md:rtl:mr-10 w-full">
                <div className="p-6 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-xl hover:shadow-[0_0_20px_-5px_hsl(var(--accent)/0.3)] hover:border-accent/50 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                        {exp.role}
                        {exp.link && (
                          <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:text-accent hover:underline ltr:ml-2 rtl:mr-2">
                            {t.experience.viewLink}
                          </a>
                        )}
                      </h3>
                      <div className="text-accent font-medium mb-1">{exp.company}</div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground md:hidden mb-2">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {exp.period}</span>
                        <span className="flex items-center gap-1"><MapPin size={12} /> {exp.location}</span>
                      </div>
                      <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
