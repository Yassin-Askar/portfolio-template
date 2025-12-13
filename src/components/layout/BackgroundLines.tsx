import { motion } from 'framer-motion';

const BackgroundLines = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <svg
                className="absolute w-full h-full opacity-30"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* Gold Line - Diagonal */}
                <motion.path
                    d="M-10 110 L50 -10"
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.2 }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />

                {/* Red Line - Diagonal offset */}
                <motion.path
                    d="M0 110 L60 -10"
                    stroke="hsl(var(--accent))"
                    strokeWidth="0.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.2 }}
                    transition={{
                        duration: 7,
                        delay: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />

                {/* Gold Line - Secondary */}
                <motion.path
                    d="M30 110 L90 -10"
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.15 }}
                    transition={{
                        duration: 10,
                        delay: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />

                {/* Red Curves for elegance */}
                <motion.path
                    d="M0 50 Q 50 20 100 50"
                    stroke="hsl(var(--accent))"
                    strokeWidth="0.3"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.15 }}
                    transition={{
                        duration: 12,
                        delay: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
                {/* Gold Crossing Line */}
                <motion.path
                    d="M110 -10 L-10 110"
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.15 }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />

                {/* Wide Red Curve Bottom */}
                <motion.path
                    d="M-10 80 Q 50 120 110 80"
                    stroke="hsl(var(--accent))"
                    strokeWidth="0.3"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.15 }}
                    transition={{
                        duration: 18,
                        delay: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />

                {/* Vertical Gold Side Accent */}
                <motion.path
                    d="M95 -10 L95 110"
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.1 }}
                    transition={{
                        duration: 20,
                        delay: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            </svg>

            {/* Glow effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>
    );
};

export default BackgroundLines;
