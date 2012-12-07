/**
 *
 *  NOT FUNCTIONAL REBUILDING
 *
 *  WIP
 *
 *
 */


require('shelljs/global');

var fs = require('fs')
  , path = require('path')
  , child_process = require('child_process')
  , wrench = require('wrench');


// /**
//  * [printFinished description]
//  * @return {[type]} [description]
//  */
// function printFinished() {
//   console.log('\nFinished in ' + ((Date.now() - startTime) / 1000).toFixed(1) + ' seconds\n');
// }


// var startTime = Date.now();

// Read the titanium version number
console.log('\n* Determining SDK source code version');
var TI_VERSION = grep(/[0-9].[0-9].[0-9]/g ,process.env.PWD + '/build/titanium_version.py');
console.log(TI_VERSION);
// // Formulate the SDK dir and SDK platform name
// console.log('* Fetching SDK location information');
// switch(process.platform) {
//   case 'darwin':
//     sdkPlatformName = 'osx';
//     titaniumSDKDir = path.resolve(path.join(__dirname, '..', 'Library', 'Application Support', 'Titanium', 'mobilesdk', sdkPlatformName, titaniumVersion));
//     break;
//   case 'win32':
//     sdkPlatformName = 'win32';
//     titaniumSDKDir = path.join(process.env.APPDATA, 'Titanium', 'mobilesdk', sdkPlatformName, titaniumVersion);
//     break;
//   default:
//     console.error('Platform "' + process.platform + '" is not supported by this build script');
//     process.exit(1);
// }

// // Build the platform
// console.log('* Building the SDK\n');
// var command = 'scons';
// //args = ['build_jsca=0', 'v3=1'];
// var args = ['mobileweb=true'];

// var buildProcess = child_process.spawn(command, args, {
//   cwd: process.env.PWD + '/titanium_mobile',
//   stdio: 'inherit'
// });

// buildProcess.on('exit', function (error, stdout, stderr) {
//   console.log(error,stdout,stderr)
//   if (error) {
//     console.error('\nBuild failed: ' + stderr.toString());
//     printFinished();
//   } else {
//     console.log('* Installing the SDK');
//     console.log(process.env.PWD);
//     // Determine the name of the SDK zip file, if it exists
//     if (fs.existsSync(path.join('titanium_mobile', 'dist'))) {
//       contents = fs.readdirSync(path.join('titanium_mobile', 'dist'));
//       for(i = 0, len = contents.length; i < len; i++) {
//         content = contents[i].toString();
//         if (fs.statSync(path.join('titanium_mobile', 'dist', content)).isFile() && content.match(/.zip$/)) {
//           break;
//         }
//         content = undefined;
//       }
//     }

//     // If we found the SDK zip, extract it
//     if (content) {
//       child_process.exec('unzip -o -q ' + content, {
//         cwd: path.join('titanium_mobile', 'dist'),
//         stdio: 'inherit'
//       }, function (error, stdout, stderr) {
//         if (error) {
//           console.error('SDK zip extraction failed: ' + stderr.toString());
//           printFinished();
//         } else {

//           // Copy the zip file to the Titanium install dir
//           wrench.copyDirSyncRecursive(path.join('titanium_mobile', 'dist', 'mobilesdk', sdkPlatformName, titaniumVersion), titaniumSDKDir);

//           // Remove the unzipped mobile SDK folder
//           wrench.rmdirSyncRecursive(path.join('titanium_mobile', 'dist', 'mobilesdk'));

//           // Remove the zip file
//           fs.unlink(path.join('titanium_mobile', 'dist', content));

//           // Finish
//           console.log('* Success');
//           printFinished();
//         }
//       });

//     } else {
//       console.error('Error: could not find the built SDK zip file');
//       printFinished();
//     }
//   }
// });