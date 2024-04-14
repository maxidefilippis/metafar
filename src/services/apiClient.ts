import i18next from 'i18next';

export async function apiConnect<T>(url: string, method: string, body: any = null): Promise<T> {
    try {
        if (!url.startsWith('http')) throw new Error(i18next.t('api:ERRORS.URL'));

        const options: RequestInit = {
            headers: { 'Content-Type': 'application/json' },
            method: method,
            body: body ? JSON.stringify(body) : null,
        };

        let response = await fetch(url, options);
        const data = await response.json();

        return data;
    } catch (error: any) {
        console.error(i18next.t('api:ERRORS.REQUEST'), error.message);
        throw error;
    }
}
