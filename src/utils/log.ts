// noinspection JSUnusedGlobalSymbols

import chalk from "chalk";

export const info = (...args: unknown[]) => {
	console.log(chalk.cyan(...args));
}

export const warn = (...args: unknown[]) => {
	console.log(chalk.yellow(...args));
}

export const success = (...args: unknown[]) => {
	console.log(chalk.green(...args));
}

export const error = (...args: unknown[]) => {
	console.error(chalk.red(...args));
}
