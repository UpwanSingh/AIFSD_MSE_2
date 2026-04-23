import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../api";

const initialForm = {
  title: "",
  description: "",
  category: "Academic",
  status: "Pending",
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [grievances, setGrievances] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [searchTitle, setSearchTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const student = useMemo(() => {
    const raw = localStorage.getItem("student");
    return raw ? JSON.parse(raw) : null;
  }, []);

  const handleUnauthorized = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");
    setAuthToken(null);
    navigate("/login");
  };

  const fetchAllGrievances = async () => {
    try {
      const response = await api.get("/grievances");
      setGrievances(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Unauthorized access");
        handleUnauthorized();
      } else {
        setError("Failed to fetch grievances");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setAuthToken(token);
    fetchAllGrievances();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    try {
      if (editingId) {
        await api.put(`/grievances/${editingId}`, formData);
        setSuccess("Grievance updated successfully");
      } else {
        await api.post("/grievances", formData);
        setSuccess("Grievance submitted successfully");
      }

      resetForm();
      fetchAllGrievances();
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Unauthorized access");
        handleUnauthorized();
      } else {
        setError(err.response?.data?.message || "Action failed");
      }
    }
  };

  const handleDelete = async (id) => {
    clearMessages();
    try {
      await api.delete(`/grievances/${id}`);
      setSuccess("Grievance deleted successfully");
      fetchAllGrievances();
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Unauthorized access");
        handleUnauthorized();
      } else {
        setError("Delete failed");
      }
    }
  };

  const handleEdit = (grievance) => {
    setEditingId(grievance._id);
    setFormData({
      title: grievance.title,
      description: grievance.description,
      category: grievance.category,
      status: grievance.status,
    });
  };

  const handleSearch = async () => {
    clearMessages();
    try {
      const response = await api.get(
        `/grievances/search?title=${encodeURIComponent(searchTitle)}`
      );
      setGrievances(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Unauthorized access");
        handleUnauthorized();
      } else {
        setError("Search failed");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("student");
    setAuthToken(null);
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="top-bar">
        <h2>Student Grievance Dashboard</h2>
        <div className="top-bar-right">
          <span>{student?.name || "Student"}</span>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        <h3>{editingId ? "Update Grievance" : "Submit Grievance"}</h3>
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Academic">Academic</option>
            <option value="Hostel">Hostel</option>
            <option value="Transport">Transport</option>
            <option value="Other">Other</option>
          </select>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
          </select>
          <div className="actions-row">
            <button type="submit">{editingId ? "Update" : "Submit"}</button>
            {editingId && (
              <button
                type="button"
                className="btn-secondary"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Search Grievances</h3>
        <div className="search-row">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <button className="btn-secondary" onClick={fetchAllGrievances}>
            Reset
          </button>
        </div>
      </div>

      {success && <p className="success-text">{success}</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="card">
        <h3>All Grievances</h3>
        {grievances.length === 0 ? (
          <p>No grievances found.</p>
        ) : (
          <div className="grievance-list">
            {grievances.map((item) => (
              <div key={item._id} className="grievance-item">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <p>
                  <strong>Category:</strong> {item.category}
                </p>
                <p>
                  <strong>Status:</strong> {item.status}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(item.date).toLocaleString()}
                </p>
                <div className="actions-row">
                  <button onClick={() => handleEdit(item)}>Update</button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
