"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle } from "lucide-react"

interface Step {
    id: number
    title: string
    description: string
    completed?: boolean
}

interface RoadmapProps {
    steps: Step[]
}

export function Roadmap({ steps }: RoadmapProps) {
    return (
        <div className="container mx-auto py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
                Seu Roadmap de Aprendizado
            </h2>

            <div className="relative">
                {/* Linha central animada */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-400 rounded-full origin-top"
                />

                <div className="space-y-16 relative z-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className={`relative flex items-center ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                                }`}
                        >
                            {/* Card */}
                            <div
                                className={`w-full md:w-[45%] bg-card border rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"
                                    }`}
                            >
                                <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                                    {step.completed ? (
                                        <CheckCircle2 className="text-green-500 w-5 h-5" />
                                    ) : (
                                        <Circle className="text-muted-foreground w-5 h-5" />
                                    )}
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {step.description}
                                </p>
                            </div>

                            {/* Bolinha central */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary flex items-center justify-center shadow-md"
                            >
                                {step.completed && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
