import path from "path";
import {fileURLToPath} from "url";

// @ts-ignore
const filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(filename);
export const PKG_ROOT = path.join(distPath, "..");

export const DEFAULT_APP_NAME = "t3-native-app";
