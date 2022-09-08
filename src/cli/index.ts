import {Command} from "commander";
import {packageJsonValues} from "../utils/package-json";
import {DEFAULT_APP_NAME} from "../consts";
import {getPackageManager} from "../utils/package-manager";
import inquirer from "inquirer";
import {error, info, success} from "../utils/log";
import {AvailablePackages, availablePackages} from "../installers";

interface CliFlags {
	noGit: boolean;
	noInstall: boolean;
	default: boolean;
}

interface CliResults {
	appName: string;
	packages: AvailablePackages[];
	flags: CliFlags;
}

export const cli = async () => {
	const program = new Command()
		.name(packageJsonValues.name)
		.description(packageJsonValues.description)
		.version(
			packageJsonValues.version,
			"-v, --version", "Display the current version");

	program
		.argument("[dir]", "The name of the application, as well as the name of the directory to create")
		.option("--noGit", "Do not initialize a git repository", false)
		.option("--noInstall", "Do not install dependencies", false)
		.option(
			"-y, --default",
			"Bypass the CLI and use all default options to bootstrap a new t3-native-app",
			false)
		.parse(process.argv);

	const results: CliResults = {
		appName: program.args[0] || DEFAULT_APP_NAME,
		packages: [],
		flags: program.opts(),
	}

	await askLanguage();
	results.packages = await askPackages();
	if (!results.flags.noGit) results.flags.noGit = !await askGit();
	if (!results.flags.noInstall) results.flags.noInstall = !await askInstall();

	return results;
}

const askLanguage = async (): Promise<void> => {
	const {language} = await inquirer.prompt<{ language: string }>({
		name: "language",
		type: "list",
		message: "What language would you like to use?",
		choices: [
			{name: "TypeScript", value: "typescript", short: "TypeScript"},
			{name: "JavaScript", value: "javascript", short: "JavaScript"}
		],
		default: "typescript"
	});

	if (language === "javascript") {
		error("Wrong answer! Using TypeScript instead...")
	} else {
		success("Good choice! Using TypeScript!")
	}
}

const askPackages = async (): Promise<AvailablePackages[]> => {
	const {packages} = await inquirer.prompt<Pick<CliResults, "packages">>({
		name: "packages",
		type: "checkbox",
		message: "Which packages would you like to use?",
		choices: availablePackages.map((pkg) => ({
			name: pkg,
			checked: false,
		})),
	});

	return packages;
}

const askGit = async (): Promise<boolean> => {
	const {git} = await inquirer.prompt<{ git: boolean }>({
		name: "git",
		type: "confirm",
		message: "Would you like to initialize a git repository?",
		default: true,
	});

	if (git) {
		success("Nice! Initializing a git repository...")
	} else {
		info("Okay, no git repository for you...")
	}

	return git;
}

const askInstall = async (): Promise<boolean> => {
	const packageManager = getPackageManager();

	const {install} = await inquirer.prompt<{ install: boolean }>({
		name: "install",
		type: "confirm",
		message: `Would you like to install dependencies with ${packageManager}?`,
		default: true,
	});

	if (install) {
		success("Alright. We'll install the dependencies for you!")
	} else {
		info(`No worries. You can run '${packageManager} install' later to install the dependencies.`)
	}

	return install;
}
