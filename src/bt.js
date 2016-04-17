var exec = require('child_process').exec;
var util = require('util');

var config = require('./config/commands.json');
var platform = process.platform;

/**
 *
 * @param options
 * @param done Callback with error
 */
var createRemoteTunnle = function (options, done) {
    var knownHostfile = options.knownHost ? options.knownHost : "/dev/null";
    var userName = options.password ? options.username + ":" + options.password : options.username;

    var tunnleCommand = util.format(config.os[platform].ssh.ssh_tunnle_cmd,
        knownHostfile, options.localPort, options.remotePort, userName, options.remoteHost
    );

    exec(tunnleCommand, function (err, stdout, stderr) {
        if(err) {
            done(err);
        } else {
            done(false);
        }
    })
};


/**
 *
 * @param options
 * @param done Callback with error
 */
var openRemoteTernminal = function (options, done) {

};


/**
 *
 * @param options
 * @param done Callback with error
 */
var destroyTunnle = function (options, done) {

}


/**
 *
 * @param options
 * @param done Callback with error
 */
var openRemoteDesktop = function (options, done) {

};

module.exports = {
    tunnle : createRemoteTunnle,
    remoteTerminal : openRemoteTernminal,
    destroyTunnle : destroyTunnle,
    remoteDesktop : openRemoteDesktop
}