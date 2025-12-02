import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Create an axios instance with default config
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "https://ivory-goat-545233.hostingersite.com/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = cookies.get("access_token", { path: "/" });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// login
export const loginVolunteer = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
// Reusable PUT function
export const updateVolunteerInfo = async (data) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });

  try {
    const response = await api.put(`/volunteer/info?${params.toString()}`, {});

    return response.data;
  } catch (error) {
    console.error("Error updating volunteer info:", error);
    throw error;
  }
};

//
// In src/services/volunteerService.js
export const getVolunteerInfo = async () => {
  try {
    const response = await api.get("/volunteer/info");
    return response.data;
  } catch (error) {
    console.error("Error fetching volunteer info:", error);
    throw error;
  }
};

// Update the default export
export const submitComplaint = async (complaintData) => {
  try {
    const response = await api.post("/complaints", complaintData);
    return response.data;
  } catch (error) {
    console.error("Error submitting complaint:", error);
    throw error;
  }
};

export const getSupervisors = async () => {
  try {
    const response = await api.get("/supervisors");
    return response.data;
  } catch (error) {
    console.error("Error fetching supervisors:", error);
    throw error;
  }
};

// Submit supervisor rating
export const submitSupervisorRating = async (ratingData,id) => {
  try {
    const response = await api.post(`/supervisors/${id}/rate`, {
      supervisor_id: ratingData.supervisor_id,
      activity_score: ratingData.activity_score,
      behavior_score: ratingData.behavior_score,
      motivation_score: ratingData.motivation_score,
      scientific_skill_score: ratingData.scientific_skill_score,
      pros_cons: ratingData.pros_cons,
      fairness_score: ratingData.fairness_score,
      team_quality_score: ratingData.team_quality_score,
      tasks_distribution_fairness: ratingData.tasks_distribution_fairness,
      general_supervisor_time: ratingData.general_supervisor_time,
      management_behavior: ratingData.management_behavior,
      space_given: ratingData.space_given,
      listening_and_suggestions: ratingData.listening_and_suggestions,
      volunteer_id: ratingData.volunteer_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting supervisor rating:", error);
    throw error;
  }
};

// Evaluation related functions
export const getEvaluations = async () => {
  try {
    const response = await api.get("/evaluations");
    return response.data;
  } catch (error) {
    console.error("Error fetching evaluations:", error);
    throw error;
  }
};

export const getEvaluationById = async (evaluationId) => {
  try {
    const response = await api.get(`/evaluations/${evaluationId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching evaluation ${evaluationId}:`, error);
    throw error;
  }
};
