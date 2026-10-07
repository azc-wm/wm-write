export function resolveEffectiveTheme(preference, defaultTheme, systemIsDark = false) {
	if (preference === 'light' || preference === 'dark') return preference;
	if (defaultTheme === 'light' || defaultTheme === 'dark') return defaultTheme;
	return systemIsDark ? 'dark' : 'light';
}

export function toggleTheme(theme) {
	return theme === 'dark' ? 'light' : 'dark';
}
