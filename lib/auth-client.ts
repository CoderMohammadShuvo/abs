export async function authenticatedFetch(url: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    }

    const response = await fetch(url, {
        ...options,
        headers
    })

    // Handle 401 Unauthorized - maybe redirect to login or throw
    if (response.status === 401) {
        // Optionally redirect to login, but for now just let the caller handle it
        // window.location.href = '/auth' 
    }

    return response
}
