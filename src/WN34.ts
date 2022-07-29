import { PlatformAccessory } from 'homebridge';
import { EcowittPlatform } from './EcowittPlatform';
import { ThermoHygroSensor } from './ThermoHygroSensor';


export class WN34 extends ThermoHygroSensor {

  constructor(
    protected readonly platform: EcowittPlatform,
    protected readonly accessory: PlatformAccessory,
    protected channel: number,
  ) {
    super(platform, accessory);

    this.setModel(
      'WN34',
      'Wireless Multi-channel Water Thermometer Sensor');
    this.setSerialNumber(`WNCH${this.channel}`);

    const name = this.platform.config?.th?.[`name${this.channel}`];

    this.setName(this.temperatureSensor, name || `WNCH${this.channel} Temperature`);
  }

  update(dataReport) {
    const batt = dataReport[`tf_batt${this.channel}`];
    const tempf = dataReport[`tf_ch${this.channel}`];

    this.platform.log.info(`WN34 Channel ${this.channel} Update`);
    this.platform.log.info('  batt:', batt);
    this.platform.log.info('  tempf:', tempf);

    const lowBattery = batt < '1.5';

    this.updateTemperature(tempf);
    this.updateStatusLowBattery(this.temperatureSensor, lowBattery);
    this.updateStatusActive(this.temperatureSensor, true);
  }
}
