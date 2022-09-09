import {error, info} from "./log.js";
import {exit} from "process";
import shell from "shelljs";

const isInstalled = (app: string) => shell.which(app)?.code === 0;

const tryToInstallGit = () => {
	if (isInstalled("brew")) {
		info("Installing git with brew...");
		shell.exec('brew install git');
	} else {
		error('Git is not installed, please install it manually.');
		exit(1);
	}
}

export const assertGitIsInstalled = () => {
	if (isInstalled('git')) return;

	tryToInstallGit();
}
