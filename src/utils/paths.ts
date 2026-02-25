export const getAssetPath = (path: string): string => {
    // If the path is already an external URL, return it as is
    if (path.startsWith('http') || path.startsWith('https')) {
        return path;
    }

    const isProd = process.env.NODE_ENV === 'production';
    const prefix = isProd ? '/sample-MSD' : '';

    // Ensure the path starts with a slash if it doesn't already
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${prefix}${normalizedPath}`;
};
