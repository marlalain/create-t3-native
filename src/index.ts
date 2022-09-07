import {error} from "./utils/log";
import {cli} from "./cli";

const main = async () => {
	await cli();

	process.exit(0);
}

main().catch((err) => {
	error(err);
	process.exit(1);
})
