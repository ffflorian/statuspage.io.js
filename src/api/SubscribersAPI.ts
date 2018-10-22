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
   * @param options Subscriber options.
   */
  public createComponentSubscription(emailSubscriber: Request.EmailSubscriberData & Request.ComponentSubscriberData): Promise<Result.EmailSubscriber>;
  public createComponentSubscription(smsSubscriber: Request.PhoneSubscriberData & Request.ComponentSubscriberData): Promise<Result.PhoneSubscriber>;
  public createComponentSubscription(webhookSubscriber: Request.WebhookSubscriberData & Request.ComponentSubscriberData): Promise<Result.WebhookSubscriber>;
  public createComponentSubscription(data: Request.CombinedSubscriberData & Request.ComponentSubscriberData): Promise<Result.CombinedSubscriber> {
    const endpoint = Endpoint.Incidents.all();
    return this.requestService.get(endpoint, {subscriber: data});
  }

  /**
   * When an incident is created, a subscriber can be associated
   * to that incident to receive notifications on updates until the
   * incident is resolved. The incident must be in an unresolved
   * state to subscribe to it.
   * @param options Subscriber options.
   */
  public createIncidentSubscription(emailSubscriber: Request.EmailSubscriberData & Request.IncidentSubscriberData): Promise<Result.EmailSubscriber>;
  public createIncidentSubscription(smsSubscriber: Request.PhoneSubscriberData & Request.IncidentSubscriberData): Promise<Result.PhoneSubscriber>;
  public createIncidentSubscription(webhookSubscriber: Request.WebhookSubscriberData & Request.IncidentSubscriberData): Promise<Result.WebhookSubscriber>;
  public createIncidentSubscription(data: Request.CombinedSubscriberData & Request.IncidentSubscriberData): Promise<Result.CombinedSubscriber> {
    const endpoint = Endpoint.Incidents.all();
    return this.requestService.get(endpoint, {subscriber: data});
  }

  /**
   * A page subscriber is by default subscribed to all incidents associated with a page.
   * @param options Subscriber options.
   */
  public createPageSubscription(emailSubscriber: Request.EmailSubscriberData): Promise<Result.EmailSubscriber>;
  public createPageSubscription(smsSubscriber: Request.PhoneSubscriberData): Promise<Result.PhoneSubscriber>;
  public createPageSubscription(webhookSubscriber: Request.WebhookSubscriberData): Promise<Result.WebhookSubscriber>;
  public createPageSubscription(data: Request.CombinedSubscriberData): Promise<Result.CombinedSubscriber> {
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
