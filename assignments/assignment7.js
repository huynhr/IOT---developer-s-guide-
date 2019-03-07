function Service(appClient) {
  this.appClient = appClient;
  this.currentWarning;
}

Service.prototype.connect = function () {
  // TODO connect to iotf here with this.appClient
  this.appClient.connect();

  this.appClient.on('connect', function () {
    // TODO hook up device events here with this.appClient
    this.appClient.subscribeToDeviceEvents();
  }.bind(this));

  this.appClient.on('deviceEvent', function (deviceType, deviceId, eventType, format, payload) {
    // TODO act on device events and call handleTempEvent when the right type of event arrives
    var temp = Math.floor(JSON.parse(payload).d.temperature);
    this.handleTempEvent(temp);
  }.bind(this));
};

Service.prototype.handleTempEvent = function (temp) {
  // TODO handle temperature changes here and call this.warningOn/this.warningOff accordingly.
  if (temp > 29) {
    if (this.currentWarning === undefined) {
      this.warningOn();
    } else if (this.currentWarning.screen === 'off') {
      this.warningOn();
    }
  } else if (temp < 29) {
    if (this.currentWarning === undefined) {
      this.warningOff();
    } else if (this.currentWarning.screen === 'on') {
      this.warningOff();
    }
  }
};

Service.prototype.warningOn = function () {
  var output = { screen: "on" }
  this.currentWarning = output;
  return this.appClient.publishDeviceCommand('SenseHat', 'senb827eb7ddd6d', 'environment', 'json', JSON.stringify(output));
};

Service.prototype.warningOff = function () {
  // TODO send a device commmand here
  // warningOff should only be called when the warning isn't already off
  var output = { screen: "off" }
  this.currentWarning = output;
  this.appClient.publishDeviceCommand('SenseHat', 'senb827eb7ddd6d', 'environment', 'json', JSON.stringify(output));
};

module.exports = Service;
