export const API = async <T>(url: string) => {
    try {
        const res = await fetch(`https://api.github.com${url}`, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${process.env.EXPO_PUBLIC_GITHUB_KEY}`
            }
        });

        return await res.json() as T;
    } catch (e) {
        console.log(e);
    }
}