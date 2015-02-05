/*global require */

(function(require) {

    "use strict";

    var gulp = require("gulp");

    var atomShell = require("gulp-atom-shell");

    var appInfo = {
        "secured-video-player": {
            name: "Secured Video Player",
            version: "0.0.1"
        }
    };

    function createBuildTasks(appInfo, taskName) {

        var _platforms = ["darwin", "linux", "win32"];

        var _buildTasks = [];

        _platforms
            .forEach(function(platform) {

                function _createTaskName(platform) {

                    if(typeof(platform) !== "string") {
                        throw new Error("Platform name must be string");
                    }

                    return "build-" + taskName + "-" + platform;

                }

                function _createArchiveName(platform) {

                    if(typeof(platform) !== "string") {
                        throw new Error("Platform name must be string");
                    }

                    return "bin/svp-" + platform + "-" + taskName + "-" + appInfo.version + ".zip";

                }

                var _currentTaskName = _createTaskName(platform);
                var _currentArchiveName = _createArchiveName(platform);

                _buildTasks.push(_currentTaskName);

                gulp.task(_currentTaskName, function() {

                    gulp.src("./src/**")
                        .pipe(atomShell({
                            platform: platform,
                            version: "0.21.1",
                            productName: appInfo.name,
                            productVersion: appInfo.version
                        }))
                        .pipe(atomShell.zfsdest(_currentArchiveName));

                });
            });

        return _buildTasks;

    }

    gulp.task("build-prod", createBuildTasks(appInfo["secured-video-player"], "prod"));

    gulp.task("default", ["build-prod"]);

})(require);
