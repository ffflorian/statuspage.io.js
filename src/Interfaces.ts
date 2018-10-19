import {IncidentsAPI, ScheduledMaintenancesAPI, SubscribersAPI} from './api/';

export interface API {
  getComponents: () => Promise<Component[]>;
  getStatus: () => Promise<Status>;
  getSummary: () => Promise<Summary>;
  incidents: IncidentsAPI;
  scheduledMaintenances: ScheduledMaintenancesAPI;
  subscribers: SubscribersAPI;
}

export interface ClientOptions {
  apiUrl: string;
}

export type HttpMethod = 'delete' | 'get' | 'post' | 'put';

export enum HttpStatus {
  FORBIDDEN = 403,
  NO_CONTENT = 204,
  NOT_FOUND = 404,
  TOO_MANY_REQUESTS = 429,
}

export interface Page {
  page: {
    id: string;
    name: string;
    url: string;
  };
}

export interface Incidents extends Page {
  incidents: Incident[];
}

export interface Components extends Page {
  components: Component[];
}

export type Summary = Status & ScheduledMaintenance & Components & Incidents;

export interface ScheduledMaintenances extends Page {
  scheduled_maintenances: ScheduledMaintenance[];
}

export interface ScheduledMaintenance {

}

export interface Subscriber extends Page {
  can_select_components: boolean;
  mode: 'webhook' | 'email_sms';
  webhook: string;
}

export interface SMSSubscriberData {
  phone_number: string;
  /** defaults to `us` if not supplied */
  phone_country?: string;
}

export interface EmailSubscriberData {
  email: string;
}

export interface WebhookSubscriberData extends EmailSubscriberData {
  endpoint: string;
}

export type SubscriberData = SMSSubscriberData | EmailSubscriberData | WebhookSubscriberData;

export interface IncidentSubscriberData {
  incident_id: string;
}

export interface Incident {
  created_at: string;
  id: string;
  impact_override: string | null;
  impact: string;
  incident_updates: IncidentUpdate[];
  metadata: {};
  monitoring_at: string | null;
  name: string;
  page_id: string;
  postmortem_body_last_updated_at: string | null;
  postmortem_body: string | null;
  postmortem_ignored: boolean;
  postmortem_notified_subscribers: boolean;
  postmortem_notified_twitter: boolean;
  postmortem_published_at: string | null;
  resolved_at: string | null;
  scheduled_auto_completed: boolean;
  scheduled_auto_in_progress: boolean;
  scheduled_for: string | null;
  scheduled_remind_prior: boolean;
  scheduled_reminded_at: string | null;
  scheduled_until: string | null;
  shortlink: string;
  status: string;
  updated_at: string;
}

export interface SubscriberOptions {
  isSubscribed: boolean;
}

export interface Component {
  components?: string[];
  created_at: string;
  description: string | null;
  group_id: string | null;
  id: string;
  name: string;
  page_id: string;
  position: number;
  showcase: boolean;
  status: string;
  updated_at: string;
}

export interface AffectedComponent {
  code: string;
  name: string;
  new_status: string;
  old_status: string;
}

export interface IncidentUpdate {
  affected_components: AffectedComponent[];
  body: string;
  custom_tweet: string | null;
  deliver_notifications: boolean;
  display_at: string;
  id: string;
  incident_id: string;
  status: string;
  tweet_id: number;
  twitter_updated_at: string;
  updated_at: string;
  wants_twitter_update: boolean;
}

export interface Status extends Page {
  status: {
    indicator: string;
    description: string;
  };
}

export interface RequestOptions {
  subscriber?: SubscriberData | SubscriberData & IncidentSubscriberData | {id: string};
}
