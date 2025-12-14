import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../ui/Icons';
import { useLanguage } from '../../context/LanguageContext';

import SectionDivider from '../ui/SectionDivider';

const Contact = () => {
   const [copied, setCopied] = useState(false);
   const { t } = useLanguage();

   const contact = t?.contact;
   const hero = t?.hero;
   const email = hero?.social?.email;

   const copyToClipboard = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (email) {
         navigator.clipboard.writeText(email);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      }
   };

   // Hide section if no data
   if (!contact?.title) {
      return null;
   }

   return (
      <section id="contact" className="py-24 bg-muted/30">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5 }}
               className="text-center mb-16"
            >
               <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{contact.title}</h2>
               <SectionDivider />
               {contact.description && (
                  <p className="text-muted-foreground max-w-xl mx-auto mt-8">
                     {contact.description}
                  </p>
               )}
            </motion.div>

            <div className="max-w-2xl mx-auto">
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8 bg-card/80 backdrop-blur-sm p-8 rounded-xl border border-primary/20 hover:shadow-[0_0_20px_-5px_hsl(var(--accent)/0.3)] hover:border-accent/50 transition-all duration-300 text-center"
               >
                  {contact.connectTitle && <h3 className="text-2xl font-bold text-foreground">{contact.connectTitle}</h3>}
                  {contact.connectDescription && (
                     <p className="text-muted-foreground">
                        {contact.connectDescription}
                     </p>
                  )}

                  <div className="space-y-4 flex flex-col items-center">
                     {/* Email Item */}
                     {email && (
                        <div className="flex items-center gap-2 w-full max-w-md">
                           <a href={`mailto:${email}`} className="flex-1 flex items-center gap-4 p-4 bg-muted/50 rounded-lg border border-border hover:border-primary transition-colors group text-start">
                              <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                                 <Icon name="Mail" className="text-primary" size={24} />
                              </div>
                              <div>
                                 {contact.labels?.email && <div className="text-sm text-muted-foreground">{contact.labels.email}</div>}
                                 <div className="font-medium text-foreground text-sm sm:text-base break-all">{email}</div>
                              </div>
                           </a>
                           <button
                              onClick={copyToClipboard}
                              className="p-4 bg-muted/50 rounded-lg border border-border hover:border-primary transition-colors hover:bg-primary/10 text-muted-foreground hover:text-primary h-[84px] w-[60px] flex items-center justify-center flex-shrink-0"
                              title={contact.labels?.copyEmail || ''}
                           >
                              {copied ? <Icon name="Check" size={24} /> : <Icon name="Copy" size={24} />}
                           </button>
                        </div>
                     )}

                     {hero?.social?.linkedin && (
                        <a href={hero.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-full max-w-md flex items-center gap-4 p-4 bg-muted/50 rounded-lg border border-border hover:border-primary transition-colors group text-start">
                           <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                              <Icon name="Linkedin" className="text-primary" size={24} />
                           </div>
                           <div>
                              {contact.labels?.linkedin && <div className="text-sm text-muted-foreground">{contact.labels.linkedin}</div>}
                              <div className="font-medium text-foreground">{contact.handles?.linkedin || 'linkedin-user'}</div>
                           </div>
                        </a>
                     )}

                     {hero?.social?.github && (
                        <a href={hero.social.github} target="_blank" rel="noopener noreferrer" className="w-full max-w-md flex items-center gap-4 p-4 bg-muted/50 rounded-lg border border-border hover:border-primary transition-colors group text-start">
                           <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                              <Icon name="Github" className="text-primary" size={24} />
                           </div>
                           <div>
                              {contact.labels?.github && <div className="text-sm text-muted-foreground">{contact.labels.github}</div>}
                              <div className="font-medium text-foreground">{contact.handles?.github || 'github-user'}</div>
                           </div>
                        </a>
                     )}
                  </div>
               </motion.div>
            </div>
         </div>
      </section>
   );
};

export default Contact;

