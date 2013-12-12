/**
 * Created by gmeszaros on 2013.12.12..
 */
var RobotSpeech = (function () {
    return {
        commands: []
    }
}());

function Command(name, action) {
    return{
        name: name,
        action: action
    }
}