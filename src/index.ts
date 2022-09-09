import {error} from "./utils/log.js";
import {cli} from "./cli/index.js";
import {assertGitIsInstalled} from "./utils/git.js";

const main = async () => {
	assertGitIsInstalled();

	const {
		appName,
		packages,
		flags,
	} = await cli();

	process.exit(0);
}

main().catch((err) => {
	error(err);
	process.exit(1);
})
