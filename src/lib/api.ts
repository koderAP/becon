// API helper for making authenticated requests

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function apiRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
) {
    const token = localStorage.getItem('adminToken');

    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        credentials: 'include',
    };

    if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || data.error || 'Request failed');
    }

    return data;
}

export function setAuthToken(token: string, type: 'admin' | 'user' = 'admin') {
    localStorage.setItem(`${type}Token`, token);
}

export function clearAuthToken(type: 'admin' | 'user' = 'admin') {
    localStorage.removeItem(`${type}Token`);
}

export function getAuthToken(type: 'admin' | 'user' = 'admin') {
    return localStorage.getItem(`${type}Token`);
}
