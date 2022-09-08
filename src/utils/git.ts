import {shell} from "./shell";
import {error} from "./log";
import {exit} from "process";

const isGitInstalled = () => !shell.which('git')

export const assertGitIsInstalled = () => {
	if (isGitInstalled()) return;

	error("Git is not installed. Please install git and try again.");
	exit(127);
}
