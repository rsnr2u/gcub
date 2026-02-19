export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
export const BASE_URL = API_BASE_URL.replace(/\/api$/, '') || 'http://localhost:8080';


export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('authToken');

    // Prepend base URL if the url is relative
    const finalUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;

    const headers = {
        ...options.headers,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

    if (!(options.body instanceof FormData) && !headers['Content-Type'] && options.method && options.method !== 'GET') {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(finalUrl, { ...options, headers });



    if (response.status === 401) {
        // Auto logout on unauthorized
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminName');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminLoginTime');
        localStorage.removeItem('adminId');
        window.location.href = '/admin/login';
        throw new Error('Unauthorized');
    }

    return response;
};

export const apiFetch = async (url, options = {}) => {
    const finalUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    return fetch(finalUrl, options);
};
