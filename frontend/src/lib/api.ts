// src/lib/api.ts

// Use environment variable for production API, fallback to '/api' for dev
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

function getAuthHeaders(): HeadersInit {
	const token = localStorage.getItem("admin_token");
	return {
		"Content-Type": "application/json",
		...(token && { Authorization: `Bearer ${token}` }),
	};
}

async function handleResponse(response: Response) {
	if (!response.ok) {
		const message = await response.text();
		throw new Error(`API Error ${response.status}: ${message}`);
	}
	return response.json();
}

export const api = {
	async get(endpoint: string, useAuth = false) {
		return fetch(`${API_BASE_URL}${endpoint}`, {
			headers: useAuth ? getAuthHeaders() : undefined,
		}).then(handleResponse);
	},

	async post(endpoint: string, data?: any, useAuth = false) {
		return fetch(`${API_BASE_URL}${endpoint}`, {
			method: "POST",
			headers: useAuth
				? getAuthHeaders()
				: { "Content-Type": "application/json" },
			body: data ? JSON.stringify(data) : undefined,
		}).then(handleResponse);
	},

	async put(endpoint: string, data?: any, useAuth = true) {
		return fetch(`${API_BASE_URL}${endpoint}`, {
			method: "PUT",
			headers: useAuth
				? getAuthHeaders()
				: { "Content-Type": "application/json" },
			body: data ? JSON.stringify(data) : undefined,
		}).then(handleResponse);
	},

	async delete(endpoint: string, useAuth = true) {
		return fetch(`${API_BASE_URL}${endpoint}`, {
			method: "DELETE",
			headers: useAuth
				? getAuthHeaders()
				: { "Content-Type": "application/json" },
		}).then(handleResponse);
	},
};
