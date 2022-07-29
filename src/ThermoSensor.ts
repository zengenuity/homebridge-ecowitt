import { Service, PlatformAccessory } from 'homebridge';
import { EcowittPlatform } from './EcowittPlatform';
import { EcowittAccessory } from './EcowittAccessory';

export class ThermoSensor extends EcowittAccessory {
  protected temperatureSensor: Service;

  constructor(
    protected readonly platform: EcowittPlatform,
    protected readonly accessory: PlatformAccessory,
  ) {
    super(platform, accessory);

    this.temperatureSensor = this.accessory.getService(this.platform.Service.TemperatureSensor)
      || this.accessory.addService(this.platform.Service.TemperatureSensor);
  }

  updateTemperature(tempf) {
    this.updateCurrentTemperature(this.temperatureSensor, tempf);
  }

}
