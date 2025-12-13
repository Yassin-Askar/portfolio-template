import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

import SectionDivider from '../ui/SectionDivider';

const Education = () => {
   const { t } = useLanguage();

   return (
      <section id="education" className="py-12 md:py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
               className="text-center mb-16"
            >
               <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.education.title}</h2>
               <SectionDivider />
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
               className="px-6 py-12 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl md:flex md:items-center md:justify-between hover:shadow-[0_0_20px_-5px_hsl(var(--accent)/0.3)] hover:border-accent/50 transition-all duration-300"
            >
               <div className="mb-6 md:mb-0">
                  <div className="flex items-center gap-3 mb-2">
                     <GraduationCap className="text-primary" size={28} />
                     <h3 className="text-xl text-foreground font-medium">{t.education.degree}</h3>
                     <p className="text-muted-foreground">{t.education.school}</p>
                     <a href={t.education.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-1 inline-block">
                        {t.education.visitWebsite}
                     </a>
                  </div>
               </div>


               <div className="text-start md:text-end">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1 md:justify-end">
                     <Calendar size={16} />
                     <span>{t.education.period}</span>
                  </div>

               </div>
            </motion.div>
         </div>
      </section>
   );
};

export default Education;
