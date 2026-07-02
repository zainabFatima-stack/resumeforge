import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
})

// Attach token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// Auth
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  getMe: () => api.get('/api/auth/me'),
  updateProfile: (data) => api.put('/api/auth/me', data),
  changePassword: (data) => api.post('/api/auth/change-password', data),
}

// Resumes
export const resumeAPI = {
  list: () => api.get('/api/resumes/'),
  create: (data) => api.post('/api/resumes/', data),
  get: (id) => api.get(`/api/resumes/${id}`),
  update: (id, data) => api.put(`/api/resumes/${id}`, data),
  delete: (id) => api.delete(`/api/resumes/${id}`),
  duplicate: (id) => api.post(`/api/resumes/${id}/duplicate`),
}

// AI
export const aiAPI = {
  enhanceBullet: (data) => api.post('/api/ai/enhance-bullet', data),
  generateSummary: (data) => api.post('/api/ai/generate-summary', data),
  extractSkills: (data) => api.post('/api/ai/extract-skills', data),
  atsScore: (data) => api.post('/api/ai/ats-score', data),
}

// Export
export const exportAPI = {
  docx: (id) => `${API_URL}/api/export/${id}/docx`,
  pdf: (id) => `${API_URL}/api/export/${id}/pdf`,
  json: (id) => `${API_URL}/api/export/${id}/json`,

  downloadDocx: async (id, token) => {
    const res = await api.get(`/api/export/${id}/docx`, { responseType: 'blob' })
    return res.data
  },
  downloadPdf: async (id) => {
    const res = await api.get(`/api/export/${id}/pdf`, { responseType: 'blob' })
    return res.data
  },
}

export default api
