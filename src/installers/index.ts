export const availablePackages = [
	"prisma",
	"trpc",
	"nextAuth",
	"tailwind"
] as const;

export type AvailablePackages = typeof availablePackages[number];
