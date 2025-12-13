import { motion } from 'framer-motion';
import Icon from '../ui/Icons';
import { useLanguage } from '../../context/LanguageContext';
import SectionDivider from '../ui/SectionDivider';

const Projects = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-12 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.projects.title}</h2>
          <SectionDivider />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.projects.items.map((project, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-xl overflow-hidden hover:shadow-[0_0_20px_-5px_hsl(var(--accent)/0.3)] hover:border-accent/50 transition-all duration-300 group flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <div className="mb-4 bg-secondary/50 p-3 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                    <Icon name={project.icon} size={40} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-primary mb-4 font-medium">{project.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-muted/30 border-t border-border flex justify-end">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                    >
                      {t.projects.viewProject} <Icon name="ExternalLink" size={16} />
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground italic flex items-center gap-2">
                      {t.projects.internalTool}
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
