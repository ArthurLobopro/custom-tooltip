//@ts-check

const { execSync } = require("node:child_process")

async function build() {
    console.log("Post CSS Building: \n\n")

    execSync(
        "yarn postcss src/index.scss -o dist/compiled.scss",
        { cwd: process.cwd(), stdio: "inherit" }
    )

    console.log("Sass Building: \n\n")

    execSync(
        "yarn sass ./dist/compiled.scss ./dist/index.css --no-source-map",
        { cwd: process.cwd(), stdio: "inherit" }
    )

    if (process.argv.includes("--clean")) {
        const fs = require("node:fs")
        const path = require("node:path")

        const compiledPath = path.join(process.cwd(), "./dist/compiled.scss")

        if (fs.existsSync(compiledPath)) {
            fs.unlinkSync(compiledPath)
        }
    }
}

if (process.argv[1] === __filename) {
    build()
}