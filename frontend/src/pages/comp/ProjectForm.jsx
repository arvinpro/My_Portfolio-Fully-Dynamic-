import { useEffect, useState } from "react";
import { FaEdit, FaExternalLinkAlt, FaGithub, FaTrash } from "react-icons/fa";
import api from "../../utils/api";
import React from "react";



const ProjectForm = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    liveLink: "",
    github: "",
    category: "",
    technologies: "",
    year: "",
    image: null,
  });
  const [editId, setEditId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (!file) return;

      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setUploadError(
          "Please upload a valid image file (JPEG, PNG, WebP, or GIF)"
        );
        e.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size must be less than 5MB");
        e.target.value = "";
        return;
      }

      setUploadError(null);
      setFormData({ ...formData, image: file });

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadError(null);

    const data = new FormData();
    if (formData.image) data.append("image", formData.image);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("liveLink", formData.liveLink);
    data.append("github", formData.github);
    data.append("category", formData.category);
    data.append("technologies", formData.technologies);
    data.append("year", formData.year);

    try {
      let res;
      if (editId) {
        res = await api.put(`/api/projects/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProjects((prev) =>
          prev.map((p) => (p._id === editId ? res.data : p))
        );
        setEditId(null);
      } else {
        res = await api.post("/api/projects", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProjects([res.data, ...projects]);
      }

      setFormData({
        title: "",
        description: "",
        liveLink: "",
        github: "",
        category: "",
        technologies: "",
        year: "",
        image: null,
      });
      setImagePreview(null);

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error(error);
      setUploadError(error.response?.data?.message || "Upload error");
      alert(uploadError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/api/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete error");
    }
  };

  const handleEdit = (proj) => {
    setEditId(proj._id);
    setFormData({
      title: proj.title,
      description: proj.description,
      liveLink: proj.liveLink,
      github: proj.github,
      category: proj.category,
      technologies: proj.technologies?.join(", ") || "",
      year: proj.year,
      image: null,
    });
    setImagePreview(proj.imageUrl || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({
      title: "",
      description: "",
      liveLink: "",
      github: "",
      category: "",
      technologies: "",
      year: "",
      image: null,
    });
    setImagePreview(null);
    setUploadError(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-5">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        {editId ? "Edit Project" : "Add New Project"}
      </h2>

      {uploadError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
          {uploadError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl space-y-6 transition"
      >
        {/* Title & Category */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-400 transition"
        ></textarea>

        {/* Live & GitHub */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="liveLink"
            placeholder="Live Link"
            value={formData.liveLink}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            name="github"
            placeholder="GitHub Link"
            value={formData.github}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Technologies & Year */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="technologies"
            placeholder="Technologies (comma separated)"
            value={formData.technologies}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Project Image{" "}
            {editId && !formData.image && "(Leave empty to keep current image)"}
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-400 transition"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 w-48 h-32 object-cover rounded-xl border"
            />
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Uploading..."
              : editId
              ? "Update Project"
              : "Add Project"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Projects Grid */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <img
              src={
                proj.imageUrl ||
                "https://dummyimage.com/400x300/cccccc/000000&text=No+Image"
              }
              alt={proj.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src =
                  "https://dummyimage.com/400x300/cccccc/000000&text=No+Image";
              }}
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {proj.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">
                {proj.description}
              </p>
              <p className="text-sm mt-1 text-blue-500">{proj.category}</p>
              <p className="text-sm mt-1 text-gray-500">{proj.year}</p>
              <div className="flex gap-3 mt-3">
                {proj.liveLink && (
                  <a
                    href={proj.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800 transition"
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                  >
                    <FaGithub />
                  </a>
                )}
                <button
                  onClick={() => handleEdit(proj)}
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(proj._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectForm;
