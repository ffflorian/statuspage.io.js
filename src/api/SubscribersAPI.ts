import {Endpoint} from '../Endpoints';
import {Subscriber, EmailSubscriberData, SMSSubscriberData, WebhookSubscriberData, IncidentSubscriberData} from '../Interfaces';
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
   * @param options Subscriber options.
   */
  public createIncidentSubscription(emailSubscriber: EmailSubscriberData & IncidentSubscriberData): Promise<Subscriber>;
  public createIncidentSubscription(smsSubscriber: SMSSubscriberData & IncidentSubscriberData): Promise<Subscriber>;
  public createIncidentSubscription(webhookSubscriber: WebhookSubscriberData & IncidentSubscriberData): Promise<Subscriber>;
  public createIncidentSubscription(data: (SMSSubscriberData | EmailSubscriberData | WebhookSubscriberData) & IncidentSubscriberData): Promise<Subscriber> {
    const endpoint = Endpoint.Incidents.all();
    return this.requestService.get(endpoint, {subscriber: data});
  }

  /**
   * A page subscriber is by default subscribed to all incidents associated with a page.
   * @param options Subscriber options.
   */
  public createPageSubscription(emailSubscriber: EmailSubscriberData): Promise<Subscriber>;
  public createPageSubscription(smsSubscriber: SMSSubscriberData): Promise<Subscriber>;
  public createPageSubscription(webhookSubscriber: WebhookSubscriberData): Promise<Subscriber>;
  public createPageSubscription(data: SMSSubscriberData | EmailSubscriberData | WebhookSubscriberData): Promise<Subscriber> {
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
