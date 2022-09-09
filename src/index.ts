import {error} from "./utils/log";
import {cli} from "./cli";
import {assertGitIsInstalled} from "./utils/git";

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
