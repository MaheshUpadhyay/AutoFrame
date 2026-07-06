/**
 * ============================================================================
 * Enterprise Automation Framework
 * FileUtils
 * ----------------------------------------------------------------------------
 * Common file system helper methods.
 *
 * Author : Automated Script
 * ============================================================================
 */

import fs from "fs";
import path from "path";

export class FileUtils {

    static exists(filePath) {
        return fs.existsSync(filePath);
    }

    static readText(filePath, encoding = "utf8") {
        return fs.readFileSync(filePath, encoding);
    }

    static writeText(filePath, content, encoding = "utf8") {
        this.createDirectory(path.dirname(filePath));
        fs.writeFileSync(filePath, content, encoding);
    }

    static readJson(filePath) {
        return JSON.parse(this.readText(filePath));
    }

    static writeJson(filePath, object, indent = 4) {
        this.writeText(
            filePath,
            JSON.stringify(object, null, indent)
        );
    }

    static copy(source, destination) {
        this.createDirectory(path.dirname(destination));
        fs.copyFileSync(source, destination);
    }

    static move(source, destination) {
        this.createDirectory(path.dirname(destination));
        fs.renameSync(source, destination);
    }

    static delete(filePath) {
        if (this.exists(filePath)) {
            fs.rmSync(filePath, { recursive: true, force: true });
        }
    }

    static createDirectory(directory) {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
    }

    static listFiles(directory) {
        if (!fs.existsSync(directory)) {
            return [];
        }
        return fs.readdirSync(directory)
            .map(name => path.join(directory, name));
    }

    static fileName(filePath) {
        return path.basename(filePath);
    }

    static extension(filePath) {
        return path.extname(filePath);
    }

    static directory(filePath) {
        return path.dirname(filePath);
    }

    static fileSize(filePath) {
        return fs.statSync(filePath).size;
    }

    static lastModified(filePath) {
        return fs.statSync(filePath).mtime;
    }

    static isDirectory(filePath) {
        return this.exists(filePath) &&
               fs.statSync(filePath).isDirectory();
    }

    static isFile(filePath) {
        return this.exists(filePath) &&
               fs.statSync(filePath).isFile();
    }
}
