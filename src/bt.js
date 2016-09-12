var exec = require('child_process').exec;
var util = require('util');

var config = require('./config/commands.json');
var platform = process.platform;

const WINDOWS = "win32";
const MAC_OS = "darwin";
const LINUX = "linux";

/**
 *
 * @param options
 * @param error Callback with error
 */
var createRemoteTunnle = function (options, error) {
    var knownHostfile = options.knownHost ? options.knownHost : "/dev/null";
    var userName = options.password ? options.username + ":" + options.password : options.username;

    var tunnleCommand = util.format(config.os[platform].ssh.ssh_tunnle_cmd,
        options.sshKey ,knownHostfile, options.localPort, options.remotePort, userName, options.remoteHost
    );

    if(platform === WINDOWS) {
        tunnleCommand = util.format(config.os[platform].ssh.ssh_tunnle_cmd,
            options.sshKey, userName, options.remoteHost, options.localPort, options.remotePort
        );
    }

    console.log(tunnleCommand)

    exec(tunnleCommand, function (err, stdout, stderr) {
        if(err) {
            error(err);
        } else {
            error(false);
        }
    })
};


/**
 *
 * @param options
 * @param error Callback with error
 */
var openRemoteTernminal = function (options, error) {
    if(platform === LINUX) {
        var knownHostfile = options.knownHost ? options.knownHost : "/dev/null";

        var tunnleLocalhostCommand = util.format(
            config.os[LINUX].ssh.tunnle_localhost_cmd, options.sshKey, knownHostfile, options.localPort
        );

        console.log(tunnleLocalhostCommand)

        var openTerminalCommand = util.format(
            config.os[LINUX].ssh.terminal_cmd, tunnleLocalhostCommand
        );

        console.log(openTerminalCommand)

        exec(openTerminalCommand, function (err, stdout, stderr) {
            if(err) {
                error(err);
            } else {
                error(false);
            }
        });
    } else if(platform === WINDOWS) {
        var openTerminalCommand = util.format(
            config.os[WINDOWS].ssh.terminal_cmd, options.localPort
        );

        console.log(openTerminalCommand)

        exec(openTerminalCommand, function (err, stdout, stderr) {
            if(err) {
                error(err);
            } else {
                error(false);
            }
        });
    } else if(platform === MAC_OS) {
        var openTerminalCommand = util.format(
            config.os[MAC_OS].ssh.terminal_cmd, options.localPort
        );

        console.log(openTerminalCommand)

        exec(openTerminalCommand, function (err, stdout, stderr) {
            if(err) {
                error(err);
            } else {
                error(false);
            }
        });
    } else {
        error("platform not supported : " + platform);
    }
};


/**
 *
 * @param options
 * @param done Callback with error
 */
var destroyTunnle = function (options, done) {
    var destroyCommand = util.format(
        config.os[platform].ssh.destroy_cmd, options.localPort
    );

    exec(destroyCommand, function (err, stdout, stderr) {
        if(err) {
            done(err)
        } else {
            done(false);
        }
    })
}


/**
 *
 * @param options
 * @param done Callback with error
 */
var openRemoteDesktop = function (options, error) {
    var openRemoteDesktopCommand = util.format(
        config.os[platform].vnc.vnc_cmd, options.localPort
    );

    exec(openRemoteDesktopCommand, function (err, stdout, stderr) {
        if(err) {
            error(err);
        } else {
            error(false);
        }
    });
};

module.exports = {
    tunnle : createRemoteTunnle,
    remoteTerminal : openRemoteTernminal,
    destroyTunnle : destroyTunnle,
    remoteDesktop : openRemoteDesktop
}