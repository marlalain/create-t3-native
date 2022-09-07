export type PackageManager = "npm" | "yarn" | "pnpm";

export const getPackageManager = (): PackageManager => {
	const userAgent = process.env.npm_config_user_agent;

	if (userAgent?.includes("yarn")) {
		return "yarn";
	} else if (userAgent?.includes("pnpm")) {
		return "pnpm";
	} else {
		return "npm";
	}
}
