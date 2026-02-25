"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { projects } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";
import type { Project } from "@/lib/data";

// Encode filename for use in src attribute
const videoSrc = (filename: string) => `/videos/${encodeURIComponent(filename)}`;

function PlayIcon({ size = 5 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-${size} h-${size} ml-0.5`}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// Card with hover-to-preview video
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleLoadedMetadata = () => {
    if (videoRef.current) videoRef.current.currentTime = 0.001;
  };

  const handleMouseEnter = () => {
    setPlaying(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0.001;
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative aspect-[9/16] overflow-hidden bg-[#161616] cursor-pointer rounded-sm"
    >
      {/* Video — always visible, shows first frame when paused */}
      <video
        ref={videoRef}
        src={videoSrc(project.videoFile)}
        preload="metadata"
        muted
        playsInline
        loop
        onLoadedMetadata={handleLoadedMetadata}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Permanent dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Category label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-accent text-[9px] tracking-[0.25em] uppercase block">
          {project.category}
        </span>
      </div>

      {/* Play button overlay (only when not playing) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          playing ? "opacity-0" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <div className="w-11 h-11 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/30 backdrop-blur-sm text-white">
          <PlayIcon size={4} />
        </div>
      </div>
    </motion.article>
  );
}

// Modal with real video player
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-[#0d0d0d] border border-[#2a2a2a] w-full overflow-hidden"
        style={{ maxWidth: "min(340px, 90vw)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors text-xl bg-black/50 rounded-full backdrop-blur-sm"
          aria-label="Close"
        >
          ×
        </button>

        {/* 9:16 video player */}
        <video
          src={videoSrc(project.videoFile)}
          controls
          autoPlay
          playsInline
          className="w-full bg-black"
          style={{ aspectRatio: "9/16" }}
        />

        {/* Info */}
        <div className="px-5 py-4">
          <span className="text-accent text-[10px] tracking-[0.3em] uppercase">
            {project.category}
          </span>
          <h3 className="text-base font-semibold text-white mt-1 mb-1">
            {project.title}
          </h3>
          <p className="text-muted text-xs leading-relaxed">
            {project.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" ref={ref} className="py-24 md:py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-accent" />
            <span className="text-accent text-xs tracking-[0.35em] uppercase">
              {t.portfolio.eyebrow}
            </span>
          </div>
          <h2 className="font-bebas text-6xl md:text-8xl text-white tracking-wide">
            {t.portfolio.title}
          </h2>
        </motion.div>

        {/* Grid — reel-style vertical feed */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
