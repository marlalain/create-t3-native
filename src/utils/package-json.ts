import {PKG_ROOT} from "../consts.js";
import path from "path";
import fs from "fs-extra";
import {PackageJson} from "type-fest";

const content = () => {
	const jsonPath = path.join(PKG_ROOT, "package.json");
	return fs.readJSONSync(jsonPath) as PackageJson;
}

export const packageJsonValues = {
	name: content().name!,
	description: content().description!,
	version: content().version!,
}
