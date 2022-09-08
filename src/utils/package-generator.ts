import {AvailablePackages, Dependency} from "../installers";
import fs from "fs-extra";
import path from "path";
import {PackageJson} from "type-fest";
import {sortPackageJson} from "sort-package-json";

interface PackageGenerator {
	dependencies: Dependency[];
	add: (availablePackage: AvailablePackages) => PackageGenerator;
	updateJson: (projectDir: string) => void;
}

export const packageGenerator = (): PackageGenerator => {
	const dependencies: Dependency[] = [];

	return {
		dependencies,
		add(availablePackage: AvailablePackages) {
			dependencies.push(...dependencies.filter((dependency) => dependency.option === availablePackage));

			return this;
		},
		updateJson(projectDir: string) {
			const jsonPath = path.join(projectDir, "package.json");
			let packageJson = fs.readJSONSync(jsonPath) as PackageJson;

			dependencies.forEach((dependency) => {
				if (dependency.devMode) {
					packageJson.devDependencies![dependency.option] = dependency.version;
				} else {
					packageJson.dependencies![dependency.option] = dependency.version;
				}
			});

			packageJson = sortPackageJson(packageJson);

			fs.writeJSONSync(jsonPath, packageJson, {spaces: 2});
		}
	}
}