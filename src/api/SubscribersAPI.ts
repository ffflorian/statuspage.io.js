import {Endpoint} from '../Endpoints';
import {Request, Result} from '../Interfaces';
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
  public getPageSubscribers(): Promise<Result.Subscriber[]> {
    const endpoint = Endpoint.subscribers();
    return this.requestService.get(endpoint);
  }

  /**
   * When an incident is created, a subscriber can be associated
   * to that incident to receive notifications on updates until the
   * incident is resolved. The incident must be in an unresolved
   * state to subscribe to it.
   * @param options Subscriber options.
   */
  public createIncidentSubscription(emailSubscriber: Request.EmailSubscriberData & Request.IncidentSubscriberData): Promise<Result.Subscriber>;
  public createIncidentSubscription(smsSubscriber: Request.SMSSubscriberData & Request.IncidentSubscriberData): Promise<Result.Subscriber>;
  public createIncidentSubscription(webhookSubscriber: Request.WebhookSubscriberData & Request.IncidentSubscriberData): Promise<Result.Subscriber>;
  public createIncidentSubscription(data: Request.CombinedSubscriberData & Request.IncidentSubscriberData): Promise<Result.Subscriber> {
    const endpoint = Endpoint.Incidents.all();
    return this.requestService.get(endpoint, {subscriber: data});
  }

  /**
   * A page subscriber is by default subscribed to all incidents associated with a page.
   * @param options Subscriber options.
   */
  public createPageSubscription(emailSubscriber: Request.EmailSubscriberData): Promise<Result.Subscriber>;
  public createPageSubscription(smsSubscriber: Request.SMSSubscriberData): Promise<Result.Subscriber>;
  public createPageSubscription(webhookSubscriber: Request.WebhookSubscriberData): Promise<Result.Subscriber>;
  public createPageSubscription(data: Request.CombinedSubscriberData): Promise<Result.Subscriber> {
    const endpoint = Endpoint.Incidents.all();
    return this.requestService.get(endpoint, {subscriber: data});
  }

  /**
   * When an incident is created, a subscriber can be associated
   * to that incident to receive notifications on updates until the
   * incident is resolved. The incident must be in an unresolved
   * state to subscribe to it.
   */
  public removeSubscription(subscriberId: string): Promise<boolean> {
    const endpoint = Endpoint.Incidents.all();
    return this.requestService.delete(endpoint, {subscriber: {id: subscriberId}});
  }
}
