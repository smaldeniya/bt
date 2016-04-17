var exec = require('child_process').exec;
var util = require('util');

var config = require('./config/commands.json');
var platform = process.platform;

/**
 *
 * @param options
 * @param error Callback with error
 */
var createRemoteTunnle = function (options, error) {
    var knownHostfile = options.knownHost ? options.knownHost : "/dev/null";
    var userName = options.password ? options.username + ":" + options.password : options.username;

    var tunnleCommand = util.format(config.os[platform].ssh.ssh_tunnle_cmd,
        knownHostfile, options.localPort, options.remotePort, userName, options.remoteHost
    );

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
    var knownHostfile = options.knownHost ? options.knownHost : "/dev/null";

    var tunnleLocalhostCommand = util.format(
        config.os[platform].ssh.tunnle_localhost_cmd, knownHostfile, options.localPort
    );

    var openTerminalCommand = util.format(
        config.os[platform].ssh.terminal_cmd, tunnleLocalhostCommand
    );

    exec(openTerminalCommand, function (err, stdout, stderr) {
        if(err) {
            error(err);
        } else {
            error(false);
        }
    });
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
        config.os.linux.vnc.vnc_cmd, options.localPort
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