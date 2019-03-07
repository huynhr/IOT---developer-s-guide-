function Service(appClient) {
  this.appClient = appClient;
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
    var data = this.handleTempEvent(temp);
    data = JSON.stringify(data);
    this.appClient.publishDeviceCommand('SenseHat', 'senb827eb7ddd6d', 'environment', 'json', data);
  }.bind(this));
};

Service.prototype.handleTempEvent = function (temp) {
  // TODO handle temperature changes here and call this.warningOn/this.warningOff accordingly.
  if (!!temp) {
    if (temp > 29) {
      return this.warningOn();
    } else if (temp < 29) {
      return this.warningOff();
    }
  } else {
    return {};
  }

};

Service.prototype.warningOn = function () {
  return { screen: "on" };
};

Service.prototype.warningOff = function () {
  // TODO send a device commmand here
  // warningOff should only be called when the warning isn't already off
  return { screen: "off" };
};

module.exports = Service;
