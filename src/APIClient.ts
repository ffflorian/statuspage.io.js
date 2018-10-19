import {RequestService} from './RequestService';
import {API, Request, Result} from './Interfaces';
import {IncidentsAPI, ScheduledMaintenancesAPI, SubscribersAPI} from './api/';
import {Endpoint} from './Endpoints';

export class StatusPage {
  private readonly requestService: RequestService;
  private readonly options: Request.ClientOptions;
  public readonly api: API;

  constructor(apiUrl: string);
  constructor(options: Request.ClientOptions);
  constructor(options: Request.ClientOptions | string) {
    if (typeof options === 'string') {
      options = {apiUrl: options};
    }

    this.options = options;

    if (!this.options.apiUrl) {
      throw new Error('A StatusPage URL needs to be set in order to use the client.');
    }

    this.requestService = new RequestService(options.apiUrl);

    this.api = {
      getComponents: this.getComponents,
      getStatus: this.getStatus,
      getSummary: this.getSummary,
      incidents: new IncidentsAPI(this.requestService),
      scheduledMaintenances: new ScheduledMaintenancesAPI(this.requestService),
      subscribers: new SubscribersAPI(this.requestService),
    };
  }

  /**
   * Set a new API URL.
   * @param newUrl The new API url
   */
  public setApiUrl(newUrl: string): void {
    this.requestService.setApiUrl(newUrl);
  }

  /**
   * Get the components for the page. Each component is listed along with its status -
   * one of `operational`, `degraded_performance`, `partial_outage`, or `major_outage`.
   */
  private getComponents(): Promise<Result.Component[]> {
    const endpoint = Endpoint.components();
    return this.requestService.get(endpoint);
  }

  /**
   * Get the status rollup for the whole page. This endpoint includes an indicator -
   * one of `none`, `minor`, `major`, or `critical`, as well as a human description of the
   * blended component status. Examples of the blended status include "All Systems
   * Operational", "Partial System Outage", and "Major Service Outage".
   */
  private getStatus(): Promise<Result.Status> {
    const endpoint = Endpoint.status();
    return this.requestService.get(endpoint);
  }

  /**
   * Get a summary of the status page, including a status indicator, component statuses,
   * unresolved incidents, and any upcoming or in-progress scheduled maintenances.
   */
  private getSummary(): Promise<Result.Summary> {
    const endpoint = Endpoint.summary();
    return this.requestService.get(endpoint);
  }
}
