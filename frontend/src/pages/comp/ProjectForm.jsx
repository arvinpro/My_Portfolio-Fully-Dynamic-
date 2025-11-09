import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaGithub, FaExternalLinkAlt, FaEdit, FaTrash } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 5;
  const [totalMessages, setTotalMessages] = useState(0);

  // Fetch messages with pagination
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `/api/messages?page=${currentPage}&limit=${messagesPerPage}`
        );
        const msgs = res.data.messages || []; // Ensure it's always an array
        setMessages(msgs);
        setTotalMessages(res.data.total || msgs.length);
      } catch (err) {
        console.error("Error fetching messages", err);
        setMessages([]);
        setTotalMessages(0);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [currentPage]);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") setFormData({ ...formData, image: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      if (editId) {
        const res = await axios.put(`/api/projects/${editId}`, data);
        setProjects((prev) =>
          prev.map((p) => (p._id === editId ? res.data : p))
        );
        setEditId(null);
      } else {
        const res = await axios.post("/api/projects", data);
        setProjects([...projects, res.data]);
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
    } catch (error) {
      console.error(error);
      alert("Error uploading project");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
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
  };

  // Render messages safely
  const renderMessages = () => {
    if (loading) return <p className="text-center">Loading messages...</p>;
    if (!Array.isArray(messages) || messages.length === 0)
      return <p className="text-center text-gray-500">No messages found.</p>;

    return messages.map((msg) => (
      <div
        key={msg._id}
        className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
      >
        <h3 className="text-lg font-semibold">{msg.name}</h3>
        <p className="text-sm text-gray-500">{msg.email}</p>
        <p className="mt-2 text-gray-700">{msg.message}</p>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(msg.createdAt).toLocaleString()}
        </p>
      </div>
    ));
  };

  const totalPages = Math.ceil(totalMessages / messagesPerPage);

  return (
    <div className="max-w-7xl mx-auto py-12 px-5">
      {/* -------- Projects Form -------- */}
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        {editId ? "Edit Project" : "Add New Project"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl space-y-6 transition"
      >
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

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-400 transition"
        ></textarea>

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

        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border rounded-xl p-3 w-full focus:ring-2 focus:ring-blue-400 transition"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
        >
          {editId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* -------- Projects Grid -------- */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-3xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <img
              src={proj.imageUrl}
              alt={proj.title}
              className="w-full h-48 object-cover"
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
                    className="text-green-600 hover:text-green-800 transition"
                  >
                    <FaExternalLinkAlt />
                  </a>
                )}
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
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

      {/* -------- Messages Section -------- */}
      <h2 className="text-3xl font-bold text-center mt-16 mb-8 text-blue-600">
        Contact Form Data
      </h2>
      <div className="p-6 max-w-3xl mx-auto grid gap-4">
        {renderMessages()}

        {/* -------- Pagination -------- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-gray-100 rounded-full disabled:opacity-40 hover:bg-gray-200 transition"
            >
              <ChevronLeft size={20} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-100 rounded-full disabled:opacity-40 hover:bg-gray-200 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectForm;
