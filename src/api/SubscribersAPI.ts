import {Endpoint} from '../Endpoints';
import {Subscriber} from '../Interfaces';
import {RequestService} from '../RequestService';

export class SubscribersAPI {
  private readonly requestService: RequestService;

  constructor(requestService: RequestService) {
    this.requestService = requestService;
  }

  /**
   * A page subscriber is by default subscribed to all incidents
   * associated with a page.
   */
  public getPageSubscribers(): Promise<Subscriber[]> {
    const endpoint = Endpoint.subscribers();
    return this.requestService.get(endpoint);
  }

  /**
   * When an incident is created, a subscriber can be associated
   * to that incident to receive notifications on updates until the
   * incident is resolved. The incident must be in an unresolved
   * state to subscribe to it.
   */
  public createSubscriber(data: {}): Promise<Subscriber> {
    const endpoint = Endpoint.Incidents.all();
    return this.requestService.get(endpoint, data);
  }

  /**
   * When an incident is created, a subscriber can be associated
   * to that incident to receive notifications on updates until the
   * incident is resolved. The incident must be in an unresolved
   * state to subscribe to it.
   */
  public removeSubscribers(): Promise<boolean> {
    const endpoint = Endpoint.Incidents.all();
    return this.requestService.delete(endpoint);
  }
}
