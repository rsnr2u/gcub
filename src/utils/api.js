export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem('authToken');

    const headers = {
        ...options.headers,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

    if (!(options.body instanceof FormData) && !headers['Content-Type'] && options.method && options.method !== 'GET') {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, { ...options, headers });

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
    const headers = {
        ...options.headers,
    };

    if (!(options.body instanceof FormData) && !headers['Content-Type'] && options.method && options.method !== 'GET') {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, { ...options, headers });
    return response;
};
