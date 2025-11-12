import React from "react";
import { Github } from "lucide-react";

const ProjectCard = ({ project, index, onEdit, onDelete }) => {
  return (
    <div
      className="group bg-white/10 dark:bg-gray-800/30 backdrop-blur-xl rounded-2xl shadow-lg
                 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3
                 overflow-hidden w-full border border-white/20 hover:border-purple-400/50
                 max-w-[420px] sm:max-w-[500px] mx-auto"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={`${project.imageUrl}`}
          alt={project.title}
          className="w-full h-44 sm:h-52 md:h-60 lg:h-64 object-cover rounded-t-2xl
                     transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 text-xs sm:text-sm bg-purple-600/90
                        text-white font-medium rounded-full backdrop-blur-sm">
          {project.category}
        </div>

        {/* Technologies */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.technologies?.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-white/90 text-purple-600 text-[10px] sm:text-xs
                         font-medium rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 3 && (
            <span className="px-2 py-0.5 bg-white/90 text-purple-600 text-[10px] sm:text-xs
                             font-medium rounded-md">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white
                         group-hover:text-purple-300 transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-[11px] sm:text-xs text-gray-400 font-medium">
            {project.year}
          </span>
        </div>
        <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed line-clamp-4">
          {project.description}
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[44px] flex items-center justify-center px-4 py-3
                       bg-gradient-to-r from-purple-600 to-purple-700
                       hover:from-purple-500 hover:to-purple-600
                       text-white text-sm font-medium rounded-xl transition-all duration-300
                       hover:scale-105 focus:outline-none focus:ring-2
                       focus:ring-purple-300 focus:ring-opacity-50 shadow-lg"
          >
            Visit
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-4 py-3
                       border-2 border-purple-500 text-purple-300
                       hover:bg-purple-500 hover:text-white text-sm font-medium
                       rounded-xl transition-all duration-300 hover:scale-105
                       focus:outline-none focus:ring-2 focus:ring-purple-300
                       focus:ring-opacity-50"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Admin Controls */}
        {(onEdit || onDelete) && (
          <div className="flex justify-end gap-3 mt-4">
            {onEdit && (
              <button
                onClick={() => onEdit(project)}
                className="px-3 py-1 text-sm rounded-md bg-yellow-500 text-white
                           hover:bg-yellow-600 transition"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(project._id)}
                className="px-3 py-1 text-sm rounded-md bg-red-500 text-white
                           hover:bg-red-600 transition"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
